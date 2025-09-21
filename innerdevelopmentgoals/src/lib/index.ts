import { mount, type ComponentProps } from 'svelte'
import Widget from './IDGFramework.svelte'
import { locales as supportedLocales } from './content'
import type { Locale } from './types'

/**
 * Show the IDGFramework widget
 *
 * @param target HTML element where you want to display the
 * @param props These options allow you to customise default behaviours.
 */
export function show(target: HTMLElement, props: ComponentProps<typeof Widget>) {
    mount(Widget, { target, props })
}

export const locales = Object.keys(supportedLocales) as unknown as Locale[]
