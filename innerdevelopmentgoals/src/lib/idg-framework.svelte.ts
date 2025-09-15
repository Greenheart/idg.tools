import { LOCALES } from '$shared/constants'
import type { Dimension, Skill, Locale, WidgetContent } from '$shared/types'

export class IDGFrameworkState {
    /** The selected locale */
    #locale: Locale
    /** Content for all loaded locales */
    #content: Record<Locale, WidgetContent>
    /** The dimensions of the selected locale */
    dimensions: Dimension[]
    /** The skills of the selected locale */
    skills: Skill[]
    readonly supportedLocales: Record<Locale, string>

    #selectedDimensionId: Dimension['id']
    selectedDimension: Dimension

    constructor(initalLocale: Locale, content: Record<Locale, WidgetContent>) {
        this.#content = content
        this.#locale = $state<Locale>(initalLocale)
        this.supportedLocales = getSupportedLocales(content)
        this.dimensions = $derived(content[this.#locale].dimensions)
        this.skills = $derived(content[this.#locale].skills)

        // By using state for the selected dimension, this can be preserved even as the locale changes
        this.#selectedDimensionId = $state(this.dimensions[0].id)

        this.selectedDimension = $derived(
            this.dimensions.find(({ id }) => id === this.#selectedDimensionId) ??
                this.dimensions[0],
        )
    }

    // NOTE: This might be possible to replace with regular state without any special logic
    get selectedDimensionId() {
        return this.#selectedDimensionId
    }

    set selectedDimensionId(newDimensionId: Dimension['id']) {
        this.#selectedDimensionId = newDimensionId
    }

    get locale() {
        return this.#locale
    }

    set locale(newLocale: Locale) {
        const { dimensions } = this.#content[newLocale]

        // Before updating the locale, we need to check if the selected dimension exist in the new locale
        // This allows us to keep the same dimension selected if it exists in the new locale.
        const newDimension =
            dimensions.find(({ id }) => id === this.#selectedDimensionId) ?? dimensions[0]

        this.#locale = newLocale
        this.#selectedDimensionId = newDimension.id
    }
}

function getSupportedLocales(content: Record<Locale, WidgetContent>) {
    const supportedLocales = {} as Record<Locale, string>

    for (const locale of Object.keys(content) as Locale[]) {
        supportedLocales[locale] = LOCALES[locale]
    }

    return supportedLocales
}
