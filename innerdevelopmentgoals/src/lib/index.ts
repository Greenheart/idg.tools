import { mount } from 'svelte'
import Component from './IDGFramework.svelte'

export default function IDGFramework(target: HTMLElement) {
    mount(Component, { target })
}
