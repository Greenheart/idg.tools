import { PersistedState } from 'runed'
import { type ItemId } from '../../../shared/types'

class GlobalPersistedState {
    selectedSkills = new PersistedState<ItemId[]>('selectedSkills', [])
    selectedTags = new PersistedState<ItemId[]>('selectedTags', [])
}

export const persistedState = new GlobalPersistedState()
