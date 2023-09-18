import { error } from '@sveltejs/kit'

import type { PageServerLoad, EntryGenerator } from './$types'
import { DEFAULT_LOCALE_IDENTIFIER, LOCALES } from '$shared/constants'
import { getLocale } from '$shared/content-utils'
import type { Locale } from '$shared/types'

import _translations from '../../../../../static/survey-info.json'

export const entries = (() =>
    Object.keys(_translations).map((locale) => ({ locale }))) satisfies EntryGenerator

export const prerender = true

const supportedLocales = Object.keys(_translations).reduce(
    (result, locale) => ({
        ...result,
        [locale]: LOCALES[locale as Locale],
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
