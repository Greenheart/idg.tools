import { writable } from 'svelte/store'

import type { Dimension, Tag } from '$shared/types'

export const selectedTags = writable<Tag['id'][]>([])
export const selectedDimensions = writable<Dimension['id'][]>([])
export const isMenuOpen = writable<boolean>(false)
export const scrollbarWidth = writable<number>(0)
