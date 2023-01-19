import type { Dimension, Language, Skill } from './types'

export const LANGUAGES = {
    en: 'English',
    sv: 'Svenska',
}

export const LANGUAGE_TAGS = Object.keys(LANGUAGES) as Language[]
export const DEFAULT_LANGUAGE_TAG = 'en'

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

export const DIMENSION_IDS = [
    'ckzi3855r0086e2n0smi0mew5',
    'ckzi38ilp0149e2n0idgw5zqv',
    'ckzi38wix0218e2n09ncgnmxx',
    'ckzi3951t0293e2n0n3bykbg5',
    'ckzi39fwv0374e2n0d2eynda4',
]

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
export const FRAMEWORK_LINK = 'https://www.innerdevelopmentgoals.org/framework'
export const COMMUNITY_LINK = 'https://www.innerdevelopmentgoals.org/community'
// Maybe change to include the #Hubs anchor, or replace this entirely
export const COMMUNITY_HUBS_LINK = 'https://www.innerdevelopmentgoals.org/community#Hubs'
export const IDG_PDF_TOOLKIT = '/assets/221215_IDG_Toolkit_v1.pdf'
export const WEBLATE_LINK = 'https://weblate.org'
