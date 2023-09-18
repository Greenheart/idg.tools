import { error } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'
import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'

import _translations from '../../../../../static/survey-info.json'

export const prerender = true

const supportedLocales = Object.values(_translations).reduce(
    (result, { locale, localeName }) => ({
        ...result,
        [locale]: localeName,
    }),
    {},
)

type Locale = keyof typeof _translations

const getLocale = (locale = DEFAULT_LOCALE_IDENTIFIER) =>
    (Object.keys(supportedLocales).includes(locale) ? locale : DEFAULT_LOCALE_IDENTIFIER) as Locale

const getContent = (locale?: string) => {
    const _locale = getLocale(locale)

    if (_translations[_locale]) {
        return _translations[_locale].translations
    }

    return _translations[DEFAULT_LOCALE_IDENTIFIER].translations
}

export const load = (async ({ params }) => {
    const surveyInfo = getContent(params.locale)

    if (surveyInfo && supportedLocales) {
        return { surveyInfo, supportedLocales }
    }

    throw error(500)
}) satisfies PageServerLoad
