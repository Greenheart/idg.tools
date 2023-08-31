import { writable } from 'svelte/store'

import type { ItemId } from '$shared/types'
import persistedStore from './persistedStore'

export const selectedSkills = persistedStore<ItemId[]>('selectedSkills', [])
export const selectedTags = persistedStore<ItemId[]>('selectedTags', [])
export const isMenuOpen = writable<boolean>(false)
export const filtersExpanded = writable<boolean>(false)
export const visibleItems = writable<number>(20)
export const scrollbarWidth = writable<number>(0)
/**
 * This store is used to disable scrolling when updating filters.
 */
export const listenForScroll = writable<boolean>(true)
