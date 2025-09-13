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

    // IDEA: Keep these to preserve state even when changing the locale
    selectedDimensionId = $state<Dimension['id']>()
    selectedSkillId = $state<Skill['id']>()

    selectedDimension: Dimension
    selectedSkill: Skill

    constructor(initalLocale: Locale, content: Record<Locale, WidgetContent>) {
        this.#locale = $state<Locale>(initalLocale)
        this.supportedLocales = getSupportedLocales(content)
        this.dimensions = $derived(content[this.#locale].dimensions)
        this.skills = $derived(content[this.#locale].skills)

        // dimensionSlugs are used for colors and values
        // they are shorter strings, but IDs would be more flexible, and we can always get the slugs if we want to

        this.selectedDimension = $derived(
            this.selectedDimensionId
                ? (this.dimensions.find(({ id }) => id === this.selectedDimensionId) ??
                      this.dimensions[0])
                : this.dimensions[0],
        )

        this.selectedSkill = $derived(
            this.selectedSkillId
                ? (this.skills.find(({ id }) => id === this.selectedSkillId) ?? this.skills[0])
                : this.skills[0],
        )
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
