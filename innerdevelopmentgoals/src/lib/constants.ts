import type { Dimension, DimensionSlug, Locale, Skill } from './types'

/**
 * Map ID:s of dimensions and skills to dimensionSlugs, which in turn are mapped to actual colors.
 * This object should include all skills and dimensions.
 */
export const COLORS: Record<Dimension['id'] | Skill['id'], DimensionSlug> = {
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

/**
 * All locales
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

export const DEFAULT_LOCALE_IDENTIFIER: Locale = 'en'
