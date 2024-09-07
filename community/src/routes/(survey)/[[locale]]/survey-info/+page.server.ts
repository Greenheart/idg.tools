import { error, redirect } from '@sveltejs/kit'

import type { PageServerLoad, EntryGenerator } from './$types'
import { DEFAULT_LOCALE_IDENTIFIER, LOCALES } from '$shared/constants'
import { getLocale } from '$shared/content-utils'
import type { Locale } from '$shared/types'

import _translations from '../../../../../static/survey-info.json'
import { getRawLocale, getRedirectURL } from '$shared/utils'

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

const getContent = (locale: SurveyBackgroundInfoLocales) => {
    if (_translations[locale]) {
        return _translations[locale].translations
    }

    return _translations[DEFAULT_LOCALE_IDENTIFIER].translations
}

export const load = (async ({ params, url }) => {
    const rawLocale = getRawLocale(url.pathname) as SurveyBackgroundInfoLocales
    const redirectURL = getRedirectURL(url.pathname, rawLocale)

    if (url.pathname !== redirectURL) {
        redirect(301, redirectURL);
    }

    const locale = getLocale(params.locale) as unknown as SurveyBackgroundInfoLocales
    const surveyInfo = getContent(locale)

    if (surveyInfo && supportedLocales) {
        return { surveyInfo, supportedLocales }
    }

    error(500);
}) satisfies PageServerLoad
