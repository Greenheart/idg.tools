import type { Language } from './types'

export const LANGUAGES = {
    en: 'English',
    sv: 'Svenska',
}

export const LANGUAGE_TAGS = Object.keys(LANGUAGES) as Language[]
export const DEFAULT_LANGUAGE_TAG = 'en'

// IDEA: Maybe this could be generated based on `content.json`, to allow the CMS to generate it.
// IDEA: Same with the tailwind config, which perhaps could generate the color config based on dimension names, and color props from the CMS
// IDEA: Maybe generate a `colors.json` which defines this structure? This could then be imported both to the utils and to the tailwind config, thus allowing the CMS to dictate how IDG colors look in the app
// NOTE: It would be worth moving the colors out of the CMS since they need to live closer to the design anyway, it doesn't make sense to store it in the CMS
export const SKILLS_BY_DIMENSION = {
    ckzi3855r0086e2n0smi0mew5: {
        name: 'being',
        skills: [
            'ckzi3a4z90431e2n04kx2pbq2',
            'ckzi3am4y0486e2n04obcy6hi',
            'ckzi3ayvo0547e2n03lvu0goo',
            'ckzi3b8sz0614e2n0ijnnazce',
            'ckzi3blfz0687e2n0huf88a8y',
        ],
    },
    ckzi38ilp0149e2n0idgw5zqv: {
        name: 'thinking',
        skills: [
            'ckzi3cikk0766e2n0j9my4e46',
            'ckzi3cvpf0851e2n00bcmzsgz',
            'ckzi3d9gp0942e2n0lvc6k1nh',
            'ckzi3dk3h1039e2n0qxij7ooh',
            'ckzi3dtdk1142e2n0m9v02uf5',
        ],
    },
    ckzi38wix0218e2n09ncgnmxx: {
        name: 'relating',
        skills: [
            'ckzi3e4as1251e2n0fz614xn4',
            'ckzi3ef9s1366e2n082dhihsm',
            'ckzi3eor91487e2n0qdoa639u',
            'ckzi3ezut1614e2n07fab18pt',
        ],
    },
    ckzi3951t0293e2n0n3bykbg5: {
        name: 'collaborating',
        skills: [
            'ckzi3f9cj1747e2n0taoxah1j',
            'ckzi3fnea2022e2n0r588if1r',
            'ckzi3g17e2167e2n055jpiaaz',
            'ckzi3gb7f2318e2n04kesx118',
            'ckzi3gknp2475e2n0dm59ikcn',
        ],
    },
    ckzi39fwv0374e2n0d2eynda4: {
        name: 'acting',
        skills: [
            'ckzi3gu6u2638e2n0fmr9gv86',
            'ckzi3h80v2807e2n0l44d20qr',
            'ckzi3hi072982e2n0r4cdkqjy',
            'ckzi3hqs63163e2n03h36pb73',
        ],
    },
}
