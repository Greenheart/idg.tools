import { mount, type ComponentProps } from 'svelte'
import Widget from './IDGFramework.svelte'
import { locales as supportedLocales } from './content'
import type { Locale } from './types'

export function IDGFramework(target: HTMLElement, props: ComponentProps<typeof Widget>) {
    mount(Widget, { target, props })
}

export const locales = Object.keys(supportedLocales) as unknown as Locale[]
