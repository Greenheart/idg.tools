import { LOCALES } from '$shared/constants'
import type { Dimension, Skill, Locale, WidgetContent } from '$shared/types'

export class IDGFrameworkState {
    /** The currently selected locale */
    #locale: Locale
    /** The dimensions of the selected locale */
    dimensions: Dimension[]
    /** The skills of the selected locale */
    skills: Skill[]
    supportedLocales: Record<Locale, string>

    constructor(initalLocale: Locale, content: Record<Locale, WidgetContent>) {
        this.#locale = $state<Locale>(initalLocale)
        this.supportedLocales = getSupportedLocales(content)
        this.dimensions = $derived(content[this.#locale].dimensions)
        this.skills = $derived(content[this.#locale].skills)
    }

    get locale() {
        return this.#locale
    }

    set locale(val: Locale) {
        // IDEA: Maybe use this as an opportunity to sync state while preserving common settings?
        // If we don't need this and can solve it with plain derived values, then remove this and expose a public `locale` field instead
        this.#locale = val
    }
}

function getSupportedLocales(content: Record<Locale, WidgetContent>) {
    const supportedLocales = {} as Record<Locale, string>

    for (const locale of Object.keys(content) as Locale[]) {
        supportedLocales[locale] = LOCALES[locale]
    }

    return supportedLocales
}
