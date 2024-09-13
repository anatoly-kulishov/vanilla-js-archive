import { createAction } from 'redux-actions'

export const CONFIGURATIONS_FETCH = 'internal/CONFIGURATIONS_FETCH'

export const fetchConfigurations = createAction(CONFIGURATIONS_FETCH)
