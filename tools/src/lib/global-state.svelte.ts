import type { ItemId } from '$shared/types'
import { PersistedState } from 'runed'

class GlobalState {
    selectedSkills = new PersistedState<ItemId[]>('selectedSkills', [])
    selectedTags = new PersistedState<ItemId[]>('selectedTags', [])
    isMenuOpen = $state(false)
    filtersExpanded = $state(false)
    visibleItems = $state(20)
    scrollbarWidth = $state(0)
    /**
     * This is used to disable scrolling when updating filters.
     */
    listenForScroll = $state(true)
}

export const globalState = new GlobalState()
