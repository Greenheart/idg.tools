import { mount } from 'svelte'
import Component from './IDGFramework.svelte'

// IDEA: Allow passing in the initial locale via props
export default function IDGFramework(target: HTMLElement) {
    mount(Component, { target })
}
