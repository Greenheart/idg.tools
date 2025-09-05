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
    en: 'English',
    'zh-CN': '简体中文',
    // zh_TW: '繁體中文',
    hi: 'हिन्दी',
    es: 'Español',
    ca: 'Català',
    fr: 'Français',
    ar: 'لعربية',
    bn: 'বাংলা ',
    'pt-BR': 'Português (Brazil)',
    pt: 'Português',
    ru: 'Русский',
    ur: 'اُردُو',
    id: 'Bahasa Indonesia',
    de: 'Deutsch',
    ja: '日本語',
    te: 'తెలుగు',
    tr: 'Türkçe',
    ta: 'தமிழ்',
    ko: '한국어',
    it: 'Italiano',
    nl: 'Nederlands',
    sv: 'Svenska',
    uk: 'Українська',
    dk: 'Dansk',
    fi: 'Suomi',
}

/**
 * Controls which locales are enabled for the IDG Framework.
 * Update this when new translations become available.
 * IDEA: This could be added to a `Settings` collection in the CMS to allow publishing new IDG framework translations via the CMS.
 */
export const FRAMEWORK_AVAILABLE_LOCALES: Locale[] = [
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
]

export const LOCALE_DIRECTIONS: Record<Locale, 'rtl' | 'ltr'> = (
    Object.keys(LOCALES) as Locale[]
).reduce(
    (result, locale) => {
        // TODO: Add more rtl locales here
        const RTL_LOCALES = ['ar', 'ur']
        result[locale] = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
        return result
    },
    {} as Record<Locale, 'rtl' | 'ltr'>,
)

export const LOCALE_IDENTIFIERS = Object.keys(LOCALES) as Locale[]
export const DEFAULT_LOCALE_IDENTIFIER: Locale = 'en'

/**
 * Map ID:s of dimensions and skills to dimensionSlugs, which in turn are mapped to actual colors.
 * This object should include all skills and dimensions.
 */
export const COLORS: Record<Dimension['id'] | Skill['id'], keyof typeof IDG_COLORS_RGB> = {
    ckzi3855r0086e2n0smi0mew5: 'being',
    ckzi3a4z90431e2n04kx2pbq2: 'being',
    ckzi3am4y0486e2n04obcy6hi: 'being',
    ckzi3ayvo0547e2n03lvu0goo: 'being',
    ckzi3b8sz0614e2n0ijnnazce: 'being',
    ckzi3blfz0687e2n0huf88a8y: 'being',
    ckzi38ilp0149e2n0idgw5zqv: 'thinking',
    ckzi3cikk0766e2n0j9my4e46: 'thinking',
    ckzi3cvpf0851e2n00bcmzsgz: 'thinking',
    ckzi3d9gp0942e2n0lvc6k1nh: 'thinking',
    ckzi3dk3h1039e2n0qxij7ooh: 'thinking',
    ckzi3dtdk1142e2n0m9v02uf5: 'thinking',
    ckzi38wix0218e2n09ncgnmxx: 'relating',
    ckzi3e4as1251e2n0fz614xn4: 'relating',
    ckzi3ef9s1366e2n082dhihsm: 'relating',
    ckzi3eor91487e2n0qdoa639u: 'relating',
    ckzi3ezut1614e2n07fab18pt: 'relating',
    ckzi3951t0293e2n0n3bykbg5: 'collaborating',
    ckzi3f9cj1747e2n0taoxah1j: 'collaborating',
    ckzi3fnea2022e2n0r588if1r: 'collaborating',
    ckzi3g17e2167e2n055jpiaaz: 'collaborating',
    ckzi3gb7f2318e2n04kesx118: 'collaborating',
    ckzi3gknp2475e2n0dm59ikcn: 'collaborating',
    ckzi39fwv0374e2n0d2eynda4: 'acting',
    ckzi3gu6u2638e2n0fmr9gv86: 'acting',
    ckzi3h80v2807e2n0l44d20qr: 'acting',
    ckzi3hi072982e2n0r4cdkqjy: 'acting',
    ckzi3hqs63163e2n03h36pb73: 'acting',
}

export const IDG_COLORS_RGB = {
    being: '#d4b88c',
    thinking: '#e585a1',
    relating: '#e84139',
    collaborating: '#ff6821',
    acting: '#661a30',
}
