class GlobalState {
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
