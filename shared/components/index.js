export { default as Breadcrumbs } from './Breadcrumbs.svelte'
export { default as Button } from './Button.svelte'
export { default as ButtonGroup } from './ButtonGroup.svelte'
export { default as Divider } from './Divider.svelte'
export { default as FuzzySearch } from './FuzzySearch.svelte'
export { default as Heading } from './Heading.svelte'
export { default as Link } from './Link.svelte'
export { default as LinkButton } from './LinkButton.svelte'
export { default as LocaleSwitcher } from './LocaleSwitcher.svelte'
export { default as Markdown } from './Markdown.svelte'
export { default as MenuButton } from './MenuButton.svelte'
export { default as Picture } from './Picture.svelte'

// IDEA: In order to make the Svelte language server work as expected for TS and intellisense,
// we could make the shared components into a SvelteKit component library that can be used by all workspace projects.
// Then we can have a svelte config here which makes the Svelte language tools work as expected
