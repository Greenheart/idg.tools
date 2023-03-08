import type { Dimension, Locale, Skill } from './types'

export const GITHUB_LINK = 'https://github.com/Greenheart/idg.tools'
export const GITHUB_ISSUES_LINK = `${GITHUB_LINK}/issues`
export const HOW_TO_CONTRIBUTE_LINK = 'https://idg.community/contribute'
export const ELEMENT_LINK = 'https://matrix.to/#/#idg:community.innerdevelopmentgoals.org'
export const ELEMENT_TOOLS_LINK =
    'https://matrix.to/#/#idg-tools:community.innerdevelopmentgoals.org'
export const ELEMENT_COMMUNITY_LINK =
    'https://matrix.to/#/#website:community.innerdevelopmentgoals.org'
export const ELEMENT_STORIES_LINK =
    'https://matrix.to/#/#stories:community.innerdevelopmentgoals.org'
export const ELEMENT_LOCALIZATION_LINK =
    'https://matrix.to/#/#localization:community.innerdevelopmentgoals.org'
// TODO: Localise the internal IDG.tools and IDG.community links so they can send people to the right language
// For example, it would be nice to be able to link people directly to the framework in their current locale.
export const FRAMEWORK_LINK = 'https://idg.tools/framework'
export const COMMUNITY_LINK = 'https://www.innerdevelopmentgoals.org/community'
export const COMMUNITY_HUBS_LINK = 'https://www.innerdevelopmentgoals.org/community#Hubs'
export const IDG_PDF_TOOLKIT = '/assets/221215_IDG_Toolkit_v1.pdf'
export const IDG_REPORT_PDF = 'https://www.innerdevelopmentgoals.org/s/211201_IDG_Report_Full.pdf'
export const IDG_CMS_LINK = 'https://cms.idg.community'

/**
 * IDEA: Maybe the supported locales could be managed via the CMS?
 * Add it in the CMS, which saves a JSON file with constants
 *
 * NOTE: For now, we can create instructions on how to add a new language
 */
export const LOCALES = {
    en: 'English',
    es: 'Español',
    'pt-BR': 'Português (Brazil)',
    pt: 'Português',
    fr: 'Français',
    de: 'Deutsch',
    nl: 'Nederlands',
    it: 'Italiano',
    jp: '日本 (Japanese)',
    dk: 'Dansk',
    sv: 'Svenska',
}

export const LOCALE_IDENTIFIERS = Object.keys(LOCALES) as Locale[]
export const DEFAULT_LOCALE_IDENTIFIER = 'en'

export const COLORS: Record<Dimension['id'] | Skill['id'], string> = {
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
