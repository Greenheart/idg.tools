import { writable } from 'svelte/store'

import type { ItemId } from '$shared/types'

function createPersistedStore<T>(key: string, startValue: T) {
    const { subscribe, set } = writable(startValue)

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const json = localStorage.getItem(key)
            if (typeof json === 'string') {
                let data: T
                try {
                    data = JSON.parse(json)
                } catch (error) {
                    data = startValue
                }
                set(data)
            }

            subscribe((current) => {
                localStorage.setItem(key, JSON.stringify(current))
            })
        },
    }
}

export const selectedSkills = createPersistedStore<ItemId[]>('selectedSkills', [])
export const selectedTags = createPersistedStore<ItemId[]>('selectedTags', [])
export const isMenuOpen = writable<boolean>(false)
export const filtersExpanded = writable<boolean>(false)
export const visibleItems = writable<number>(20)
export const scrollbarWidth = writable<number>(0)
/**
 * This store is used to disable scrolling when updating filters.
 */
export const listenForScroll = writable<boolean>(true)
