import { error } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'
import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'

import _translations from '../../../../../static/survey-info.json'
import { getLocale } from '$shared/content-utils'

export const prerender = true

const supportedLocales = Object.values(_translations).reduce(
    (result, { locale, localeName }) => ({
        ...result,
        [locale]: localeName,
    }),
    {},
)

type SurveyBackgroundInfoLocales = keyof typeof _translations

const getContent = (locale?: string) => {
    const _locale = getLocale(locale) as unknown as SurveyBackgroundInfoLocales

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
