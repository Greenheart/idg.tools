import type { Dimension, Tag } from '$shared/types'

class GlobalState {
    selectedTags = $state<Tag['id'][]>([])
    selectedDimensions = $state<Dimension['id'][]>([])
    isMenuOpen = $state<boolean>(false)
    scrollbarWidth = $state<number>(0)
}

export const globalState = new GlobalState()
