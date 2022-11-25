import { writable } from 'svelte/store'

import type { Dimension, ItemId } from '$shared/types'
import { DIMENSION_IDS } from '$shared/constants'

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
export const visibleItems = createPersistedStore<number>('visibleItems', 10)

export const isDimensionOpen = writable<Record<Dimension['id'], boolean>>(
    DIMENSION_IDS.reduce((isDimensionOpen: Record<Dimension['id'], boolean>, dimensionId) => {
        isDimensionOpen[dimensionId] = false
        return isDimensionOpen
    }, {}),
)
