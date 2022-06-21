// scripts/build-content.ts
import slugify from "slugify";
import FastGlob from "fast-glob";
import { performance } from "perf_hooks";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "fs/promises";

// ../shared/constants.ts
var LANGUAGES = {
  en: "English",
  sv: "Svenska"
};
var LANGUAGE_TAGS = Object.keys(LANGUAGES);
var DEFAULT_LANGUAGE_TAG = "en";

// ../shared/content-utils.ts
var getTag = (id, { tags }) => tags.find((t) => t.id === id);

// scripts/build-content.ts
var __dirname = dirname(fileURLToPath(import.meta.url));
var slugifyName = (string, language = DEFAULT_LANGUAGE_TAG) => slugify(string, {
  replacement: "-",
  remove: void 0,
  lower: true,
  strict: true,
  locale: language,
  trim: true
});
var createBackwardsCompatibleLink = (name, uniqueSlug, language = DEFAULT_LANGUAGE_TAG) => `${slugifyName(name, language)}-${uniqueSlug}`;
var readJSON = (path) => readFile(path, { encoding: "utf-8" }).then(JSON.parse);
var writeJSON = (path, data, indentation = 0) => writeFile(path, JSON.stringify(data, null, indentation), {
  encoding: "utf-8"
});
console.log(`\u26A1 Building IDG.tools content...`);
var startTime = performance.now();
var getContentPaths = (contentTypes) => Promise.all(contentTypes.map((type) => FastGlob(resolve(__dirname, `../../../content/src/${type}/*.json`))));
var prepareSkills = (translatedSkills, translatedCategories) => {
  return translatedSkills.map((translatedSkill) => {
    const updated = {};
    for (const [language, skill] of Object.entries(translatedSkill)) {
      const translatedCategory = translatedCategories.find((tc) => tc.en.id === skill.category);
      skill.color = translatedCategory.en.color;
      updated[language] = skill;
    }
    return updated;
  });
};
var prepareTools = (translatedTools, translatedTags) => {
  return translatedTools.map((translatedTool) => {
    const updated = {};
    const uniqueSlugs = /* @__PURE__ */ new Set();
    for (const [language, tool] of Object.entries(translatedTool)) {
      if (!tool.slug) {
        throw new Error(`[content] Missing slug for tool "${tool.name}" and language "${language}"`);
      }
      uniqueSlugs.add(tool.slug);
      if (uniqueSlugs.size > 1) {
        throw new Error(`[content] Slugs should be the same for all translations for tool "${tool.name}" and language "${language}": Slugs found was ${JSON.stringify([...uniqueSlugs])}`);
      }
      const firstDuplicateTag = tool.tags.find((t, i) => tool.tags.lastIndexOf(t) !== i);
      if (firstDuplicateTag) {
        throw new Error(`[content] Tool "${tool.name}" has duplicate tags: ${firstDuplicateTag}`);
      }
      const tags = translatedTags.map((tag) => {
        const translatedTag = tag[language];
        if (translatedTag !== void 0)
          return translatedTag;
        throw new Error(`[content] Tag is missing translation for language "${language}": ${JSON.stringify(tag)}`);
      });
      const tagsSortedAlphabetically = tool.tags.map((t) => getTag(t, { tags })).sort((a, b) => a.name.localeCompare(b.name)).map((t) => t.id);
      tool.tags = tagsSortedAlphabetically;
      const sortedRelevancyScores = tool.relevancy.filter((t) => t.score > 0).sort((a, b) => b.score - a.score);
      if (sortedRelevancyScores.length < tool.relevancy.length) {
        console.warn(`[content] Removed ${tool.relevancy.length - sortedRelevancyScores.length} relevancy scores with 0 relevancy from tool "${tool.name}" for language "${language}"`);
      }
      tool.relevancy = sortedRelevancyScores;
      const newLink = createBackwardsCompatibleLink(tool.name, tool.slug);
      if (newLink !== tool.link) {
        console.warn(`[content] Link has changed for tool "${tool.name}" from old: "${tool.link}" to new: "${newLink}"`);
        tool.link = newLink;
      }
      updated[language] = tool;
    }
    return updated;
  });
};
var loadContent = async (contentTypes) => {
  const paths = await getContentPaths(contentTypes);
  console.log(paths);
  const [tools, skills, categories, tags] = await Promise.all(paths.map((paths2) => Promise.all(paths2.map(readJSON))));
  return { tools, skills, categories, tags };
};
function getByLang(content, lang) {
  return content.map((item) => item[lang]).filter(Boolean);
}
var splitContentByLang = (content, selectedLanguages = LANGUAGE_TAGS) => selectedLanguages.reduce((result, lang) => {
  result[lang] = {
    tools: getByLang(content.tools, lang),
    skills: getByLang(content.skills, lang),
    categories: getByLang(content.categories, lang),
    tags: getByLang(content.tags, lang)
  };
  return result;
}, {});
var prepareContent = (content) => {
  return {
    ...content,
    skills: prepareSkills(content.skills, content.categories),
    tools: prepareTools(content.tools, content.tags)
  };
};
var rawContent = await loadContent(["tools", "skills", "categories", "tags"]);
var builtContent = splitContentByLang(prepareContent(rawContent), ["en"]);
console.log(`Building IDG.tools content...`);
await writeJSON(resolve(__dirname, "../../static/content.json"), builtContent, 0);
var buildTime = ((performance.now() - startTime) / 1e3).toLocaleString("en-US", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3
});
console.log(`\u2705 Finished in ${buildTime} s
`);
export {
  createBackwardsCompatibleLink,
  readJSON,
  slugifyName,
  writeJSON
};
