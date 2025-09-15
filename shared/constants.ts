import type { Dimension, Locale, Skill } from './types'

export const GITHUB_LINK = 'https://github.com/Greenheart/idg.tools'
export const GITHUB_ISSUES_LINK = `${GITHUB_LINK}/issues`
// TODO: Localise the internal IDG.tools and IDG.community links so they can send people to the right language
// For example, it would be nice to be able to link people directly to the framework in their current locale.
export const FRAMEWORK_LINK = 'https://idg.tools/framework'
export const IDG_WEBSITE = 'https://innerdevelopmentgoals.org'
export const IDG_PDF_TOOLKIT = '/assets/221215_IDG_Toolkit_v1.pdf'
export const IDG_CMS_LINK = 'https://cms.idg.community'

export const HUBS_NETWORKS_LINK = 'https://innerdevelopmentgoals.org/get-involved/hubs-networks/'

export const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

/**
 * IDEA: Maybe the supported locales could be managed via the CMS?
 * Add it in the CMS, which saves a JSON file with constants
 *
 * Instructions for how to add a new locale for the IDG framework:
 *
 * 1. Find language codes and native names (endonyms) in this list: https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
 * 2. Add the language code to the `LOCALES` constant below.
 * 3. Configure and run the script [`copy-locales.ts`](../content/scripts/copy-locale.ts) to create the initial structure
 * 4. Stage the initial structure in Git to make it easier to review the diff between the default English content and the actual translations.
 * 5. Configure the CMS [`index.ts`](../cms/index.ts) to let you quickly translate between the desired locales
 * 6. Edit via translations via the CMS (or JSON files if you prefer)
 * 7. Update `FRAMEWORK_AVAILABLE_LOCALES` below to include the translations in the next content build.
 * 8. Run the content build and refresh http://localhost:5173/framework to see the new locale.
 * 9. Review the rendered IDG framework translations and compare them side by side with the source translations document.
 * 10. Stage one file at a time from the content, and review the diffs carefully before committing.
 */
export const LOCALES = {
    id: 'Bahasa Indonesia',
    ca: 'Català',
    dk: 'Dansk',
    de: 'Deutsch',
    en: 'English',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
    nl: 'Nederlands',
    'pt-BR': 'Português (Brazil)',
    pt: 'Português',
    fi: 'Suomi',
    sv: 'Svenska',
    tr: 'Türkçe',
    ru: 'Русский',
    uk: 'Українська',
    ur: 'اُردُو',
    ar: 'لعربية',
    wo: 'Wolof (Senegal)',
    hi: 'हिन्दी',
    bn: 'বাংলা',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    ko: '한국어',
    ja: '日本語',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
}

/**
 * Controls which locales are enabled for the IDG Framework.
 * Update this when new translations become available.
 * IDEA: This could be added to a `Settings` collection in the CMS to allow publishing new IDG framework translations via the CMS.
 */
export const FRAMEWORK_AVAILABLE_LOCALES = [
    'en',
    'es',
    'nl',
    'ca',
    'uk',
    'sv',
    'pt',
    'pt-BR',
    'it',
    'fi',
    'ja',
    'dk',
    'de',
    'fr',
    'zh-CN',
    'zh-TW',
    'tr',
    'wo',
] as const

/**
 * Includes the language codes for all RTL locales we support
 * Useful resource when adding more: https://github.com/shadiabuhilal/rtl-detect/blob/ca1f7e94b55bed42bcbb1d234ee0eba153d0a342/lib/rtl-detect.js#L139-L168
 */
export const RTL_LOCALES = new Set<keyof typeof LOCALES>(['ar', 'ur'])

export const LOCALE_IDENTIFIERS = Object.keys(LOCALES) as Locale[]
export const DEFAULT_LOCALE_IDENTIFIER: Locale = 'en'

/**
 * Map ID:s of dimensions and skills to dimensionSlugs, which in turn are mapped to actual colors.
 * This object should include all skills and dimensions.
 */
export const COLORS: Record<Dimension['id'] | Skill['id'], keyof typeof IDG_COLORS_RGB> = {
    da0: 'being',
    sa0: 'being',
    sa1: 'being',
    sa2: 'being',
    sa3: 'being',
    sa4: 'being',
    da1: 'thinking',
    sa5: 'thinking',
    sa6: 'thinking',
    sa7: 'thinking',
    sa8: 'thinking',
    sa9: 'thinking',
    da2: 'relating',
    sb0: 'relating',
    sb1: 'relating',
    sb2: 'relating',
    sb3: 'relating',
    da3: 'collaborating',
    sb4: 'collaborating',
    sb5: 'collaborating',
    sb6: 'collaborating',
    sb7: 'collaborating',
    sb8: 'collaborating',
    da4: 'acting',
    sb9: 'acting',
    sc0: 'acting',
    sc1: 'acting',
    sc2: 'acting',
}

export const IDG_COLORS_RGB = {
    being: '#d4b88c',
    thinking: '#e585a1',
    relating: '#e84139',
    collaborating: '#ff6821',
    acting: '#661a30',
}
