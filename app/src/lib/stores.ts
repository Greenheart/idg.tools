import { writable } from 'svelte/store'

import type { ItemId } from '$lib/types'

function createPersistedStore<T>(key: string, startValue: T) {
    const { subscribe, set } = writable(startValue)

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const json = localStorage.getItem(key)
            if (typeof json === 'string') {
                set(JSON.parse(json))
            }

            subscribe((current) => {
                localStorage.setItem(key, JSON.stringify(current))
            })
        },
    }
}

export const selectedSkills = createPersistedStore<ItemId[]>('selected', [])
