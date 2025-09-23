import { mount } from 'svelte'
import Widget from './IDGFramework.svelte'
import { locales as supportedLocales } from './content'
import type { Locale, IDGFrameworkProps } from './types'

// TODO: Decide which import format to use
// 1) either show function
// 2) or simply a default exported function, which also includes the property locales
// 3) default exported function, combined with a separate export for the locales

/**
 * Show the IDGFramework widget
 *
 * @param target HTML element where you want to display the
 * @param props These options allow you to customise default behaviours.
 */
export function show(target: HTMLElement, props: IDGFrameworkProps) {
    mount(Widget, { target, props })
}

export const locales = Object.keys(supportedLocales) as unknown as Locale[]
