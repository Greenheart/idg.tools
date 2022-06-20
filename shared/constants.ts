import type { Language } from './types'

export const LANGUAGES = {
    en: 'English',
    sv: 'Svenska',
}

export const LANGUAGE_TAGS = Object.keys(LANGUAGES) as Language[]
export const DEFAULT_LANGUAGE_TAG = 'en'
