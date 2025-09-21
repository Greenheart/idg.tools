import { mount, type ComponentProps } from 'svelte'
import Widget from './IDGFramework.svelte'

export default function IDGFramework(target: HTMLElement, props: ComponentProps<typeof Widget>) {
    mount(Widget, { target, props })
}
