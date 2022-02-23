import 'dotenv/config'
import { fetch } from 'native-fetch'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { serialize } from 'remark-slate'

const production = process.env.NODE_ENV === 'production'

// Only include published tools when building for production
const whereToolsArePublished = `(where: {
      status: {
        equals: "published"
      }
    })`

const query = `
  query {
    categories {
      id
      name
      description
      tools {
        id
      }
      skills {
        id
      }
      color
    }
  
    skills {
      id
      name
      description
      tools {
        id
      }
      category {
        id
      }
    }
  
    tools${production ? whereToolsArePublished : ''} {
      id
      name
      description {
        document
      }
      challenge {
        document
      }
      resources {
        document
      }
      categories {
        id
      }
      skills {
        id
      }
      slug
    }
  }
`

const simplifyListItemContent = (node) => {
    if (node?.type === 'list-item' && node.children?.length) {
        // Since `remark-slate` doesn't support `list-item-content`, we replace it with `paragraph`
        console.count('Replacing `list-item-content` with `paragraph`')
        node.children[0].type = 'paragraph'
    } else if (node.children?.length) {
        node.children = node.children.map(simplifyListItemContent)
    }
    return node
}

const makeLinksCompatible = (node) => {
    if (node.type === 'link') {
        // Since `remark-slate` expects a `link` prop instead of `href`, we change to support that
        console.count('Replacing `href` with `link`')
        node.link = node.href
        delete node.href
    } else if (node.children?.length) {
        node.children = node.children.map(makeLinksCompatible)
    }

    return node
}

const keepId = ({ id }) => id

const makeKeystoneDocumentCompatibleWithRemarkSlate = (document) =>
    document.map(simplifyListItemContent).map(makeLinksCompatible)

const convertSlateToMarkdown = (document) => {
    return makeKeystoneDocumentCompatibleWithRemarkSlate(document)
        .map((v) =>
            serialize(v, {
                nodeTypes: {
                    paragraph: 'paragraph',
                    block_quote: 'blockquote',
                    link: 'link',
                    ul_list: 'unordered-list',
                    ol_list: 'ordered-list',
                    listItem: 'list-item',
                    emphasis_mark: 'bold',
                    strong_mark: 'strong',
                },
                ignoreParagraphNewline: true,
            }),
        )
        .join('')
}

const body = await fetch(process.env.API_URL, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
}).then((res) => res.json())

const content = body.data

content.categories = content.categories.map((category) => {
    category.tools = category.tools.map(keepId)
    category.skills = category.skills.map(keepId)
    return category
})

content.skills = content.skills.map((skill) => {
    skill.category = keepId(skill.category)
    skill.tools = skill.tools.map(keepId)
    return skill
})

content.tools = content.tools.map((tool) => {
    tool.categories = tool.categories.map(keepId)
    tool.skills = tool.skills.map(keepId)

    // NOTE: Use this toggle to debug the content transformation pipeline
    const ORIGINAL = 1
    const LIST_TRANSFORM = 2
    const LINK_TRANSFORM = 3
    const PRODUCTION = 4

    const CASE = PRODUCTION

    if (CASE === ORIGINAL) {
        tool.description__O = tool.description.document
        tool.challenge__O = tool.challenge.document
        tool.resource__O = tool.resources.document
    } else if (CASE === LIST_TRANSFORM) {
        tool.description__X = tool.description.document.map(
            simplifyListItemContent,
        )
        tool.challenge__X = tool.challenge.document.map(simplifyListItemContent)
        tool.resource__X = tool.resources.document.map(simplifyListItemContent)
    } else if (CASE === LINK_TRANSFORM) {
        tool.description__D = convertSlateToMarkdown(tool.description.document)
        tool.challenge__D = convertSlateToMarkdown(tool.challenge.document)
        tool.resource__D = convertSlateToMarkdown(tool.resources.document)
    } else {
        tool.description = convertSlateToMarkdown(tool.description.document)
        tool.challenge = convertSlateToMarkdown(tool.challenge.document)
        tool.resources = convertSlateToMarkdown(tool.resources.document)
    }

    return tool
})

// Encourage users to use HTTPS URIs if possible.
// IDEA: Maybe add as custom validation in Keystone Admin UI instead,
// to allow users to catch this error
const warnAboutUnsafeURIs = (_key, value) => {
    if (typeof value === 'string' && value.includes('http://')) {
        console.warn('🚨 Non-https URI detected:', value)
    }
    return value
}

await writeFile(
    resolve('static/content.json'),
    JSON.stringify(content, warnAboutUnsafeURIs, 2),
    { encoding: 'utf-8' },
)
