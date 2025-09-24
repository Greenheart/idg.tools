import { mount } from 'svelte'
import Widget from './IDGFramework.svelte'
import { locales as supportedLocales } from './content'
import type { Locale, IDGFrameworkProps } from './types'

/**
 * Show the IDGFramework widget
 *
 * @param target HTML element where you want to display the
 * @param props These options allow you to customise default behaviours.
 */
function IDGFramework(target: HTMLElement, props: IDGFrameworkProps) {
    mount(Widget, { target, props })
}

/** List of available locale codes */
IDGFramework.locales = Object.keys(supportedLocales) as unknown as Locale[]

export default IDGFramework
