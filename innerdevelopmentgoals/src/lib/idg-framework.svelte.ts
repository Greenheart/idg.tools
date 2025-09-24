import { DEFAULT_LOCALE_IDENTIFIER, LOCALES } from './constants'
import type { Dimension, Skill, Locale, WidgetContent } from './types'

const browser = typeof window !== 'undefined'

type Options = {
    /** The initial locale to show. */
    defaultLocale?: Locale
    /** The localised content. */
    locales: Record<Locale, WidgetContent>
    /**
     * Indicates whether or not to store the user's selected locale to localStorage, and show that as the default locale
     * Only enabled on the client side.
     */
    persistLocale: boolean
}

export class IDGFrameworkState {
    /** The selected locale */
    #locale: Locale
    /** Content for all loaded locales */
    #locales: Record<Locale, WidgetContent>
    /** The dimensions of the selected locale */
    dimensions: Dimension[]
    /** The skills of the selected locale */
    skills: Skill[]
    readonly supportedLocales: Record<Locale, string>
    #persistLocale: boolean

    selectedDimensionId: Dimension['id']
    selectedDimension: Dimension

    constructor(options: Options) {
        const { locales, persistLocale } = options
        const embedded = window !== window.top

        // Only persist locale when the user wants to. Disabled when running in an iframe.
        this.#persistLocale = browser && !embedded && persistLocale
        // Ensure the provided defaultLocale is valid - and use a fallback value otherwise
        const defaultLocale =
            options.defaultLocale &&
            Object.prototype.hasOwnProperty.call(locales, options.defaultLocale)
                ? options.defaultLocale
                : DEFAULT_LOCALE_IDENTIFIER

        this.#locales = locales
        this.#locale = $state<Locale>(
            this.#persistLocale
                ? ((localStorage['idg-locale'] as Locale) ?? defaultLocale)
                : defaultLocale,
        )
        this.supportedLocales = getSupportedLocales(locales)
        this.dimensions = $derived(locales[this.#locale].dimensions)
        this.skills = $derived(locales[this.#locale].skills)

        // By using state for the selected dimension, this can be preserved even as the locale changes
        this.selectedDimensionId = $state(this.dimensions[0].id)
        this.selectedDimension = $derived(
            this.dimensions.find(({ id }) => id === this.selectedDimensionId) ?? this.dimensions[0],
        )
    }

    get locale() {
        return this.#locale
    }

    set locale(newLocale: Locale) {
        const { dimensions } = this.#locales[newLocale]

        // Before updating the locale, we need to check if the selected dimension exist in the new locale
        // This allows us to keep the same dimension selected if it exists in the new locale.
        const newDimension =
            dimensions.find(({ id }) => id === this.selectedDimensionId) ?? dimensions[0]

        this.#locale = newLocale
        this.selectedDimensionId = newDimension.id

        if (this.#persistLocale) {
            localStorage['idg-locale'] = newLocale
        }
    }
}

function getSupportedLocales(locales: Record<Locale, WidgetContent>) {
    const supportedLocales = {} as Record<Locale, string>

    for (const locale of Object.keys(locales) as Locale[]) {
        supportedLocales[locale] = LOCALES[locale]
    }

    return supportedLocales
}
