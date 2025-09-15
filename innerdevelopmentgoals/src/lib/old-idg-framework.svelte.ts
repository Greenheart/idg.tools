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
    selectedSkillId: Skill['id']
    selectedDimension: Dimension
    selectedSkill: Skill

    constructor(initalLocale: Locale, content: Record<Locale, WidgetContent>) {
        this.#content = content
        this.#locale = $state<Locale>(initalLocale)
        this.supportedLocales = getSupportedLocales(content)
        this.dimensions = $derived(content[this.#locale].dimensions)
        this.skills = $derived(content[this.#locale].skills)

        // By using state for the selected dimension and skill, they can be preserved even as the locale is changed
        this.#selectedDimensionId = $state(this.dimensions[0].id)
        this.selectedSkillId = $state(this.skills[0].id)

        this.selectedDimension = $derived(
            this.dimensions.find(({ id }) => id === this.#selectedDimensionId) ??
                this.dimensions[0],
        )
        this.selectedSkill = $derived(
            this.skills.find(({ id }) => id === this.selectedSkillId) ?? this.skills[0],
        )
    }

    get selectedDimensionId() {
        return this.#selectedDimensionId
    }

    set selectedDimensionId(newDimensionId: Dimension['id']) {
        this.#selectedDimensionId = newDimensionId

        // When changing the selected dimension, make sure the selected skill is within the new dimension
        if (!this.selectedDimension.skills.includes(this.selectedSkillId)) {
            this.selectedSkillId = this.selectedDimension.skills[0]
        }
    }

    get locale() {
        return this.#locale
    }

    set locale(newLocale: Locale) {
        const { dimensions, skills } = this.#content[newLocale]

        // Before updating the locale, we need to check if the selected dimension and skill exist in the new locale
        // This allows us to keep the same dimension and skill selected, and falling back to other values if necessary
        // Try to find the same dimension in the new locale, or fall back to the first dimension
        const newDimension =
            dimensions.find(({ id }) => id === this.#selectedDimensionId) ?? dimensions[0]

        // Try to find the same skill in the new locale, or fall back to the first skill in the new dimension
        const newSkillId =
            skills.find(({ id }) => id === this.selectedSkillId)?.id ?? newDimension.skills[0]

        this.#locale = newLocale

        this.#selectedDimensionId = newDimension.id
        this.selectedSkillId = newSkillId
    }
}

function getSupportedLocales(content: Record<Locale, WidgetContent>) {
    const supportedLocales = {} as Record<Locale, string>

    for (const locale of Object.keys(content) as Locale[]) {
        supportedLocales[locale] = LOCALES[locale]
    }

    return supportedLocales
}
