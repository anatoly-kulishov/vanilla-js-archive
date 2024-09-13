import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const CREATE_COVERAGE_AND_OFFICES_NOTE = 'note/CREATE_COVERAGE_AND_OFFICES_NOTE'
export const CREATE_COVERAGE_AND_OFFICES_NOTE_SUCCESS = 'note/CREATE_COVERAGE_AND_OFFICES_NOTE_SUCCESS'
export const CREATE_COVERAGE_AND_OFFICES_NOTE_ERROR = 'note/CREATE_COVERAGE_AND_OFFICES_NOTE_ERROR'
export const CREATE_COVERAGE_AND_OFFICES_NOTE_FAILURE = 'note/CREATE_COVERAGE_AND_OFFICES_NOTE_FAILURE'

const initialState = {
  isCreateCoveragesAndOfficesNoteLoading: false,

  createCoveragesAndOfficesNoteError: ''
}

export const createCoveragesAndOfficesNote = createAction(CREATE_COVERAGE_AND_OFFICES_NOTE)

export default handleActions(
  {
    [CREATE_COVERAGE_AND_OFFICES_NOTE]: produce((state) => {
      state.isCreateCoveragesAndOfficesNoteLoading = true
    }),

    [CREATE_COVERAGE_AND_OFFICES_NOTE_SUCCESS]: produce((state) => {
      state.isCreateCoveragesAndOfficesNoteLoading = false
    }),

    // eslint-disable-next-line standard/computed-property-even-spacing
    [combineActions(
      CREATE_COVERAGE_AND_OFFICES_NOTE_ERROR,
      CREATE_COVERAGE_AND_OFFICES_NOTE_FAILURE
    )]: produce((state, { payload }) => {
      state.createCoveragesAndOfficesError = payload
      state.isCreateCoveragesAndOfficesNoteLoading = false
    })
  },
  initialState
)
