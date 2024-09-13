import { createAction, handleActions } from 'redux-actions'

export const FETCH_IRREGULAR_WORDS = 'smartSearching/FETCH_IRREGULAR_WORDS'
export const FETCH_IRREGULAR_WORDS_SUCCESS = 'smartSearching/FETCH_IRREGULAR_WORDS_SUCCESS'
export const FETCH_IRREGULAR_WORDS_ERROR = 'smartSearching/FETCH_IRREGULAR_WORDS_ERROR'
export const FETCH_IRREGULAR_WORDS_FAILURE = 'smartSearching/FETCH_IRREGULAR_WORDS_FAILURE'

const initialState = {
  isIrregularsLoading: false,
  isIrregularsFetchingError: false,
  irregularsFetchingErrorMessage: ''
}

export const fetchIrregularWords = createAction(FETCH_IRREGULAR_WORDS)

export default handleActions(
  {
    [FETCH_IRREGULAR_WORDS]: () => ({
      isIrregularsLoading: true,
      isIrregularsFetchingError: false,
      irregularsFetchingErrorMessage: ''
    }),
    [FETCH_IRREGULAR_WORDS_SUCCESS]: (state) => ({
      ...state,
      isIrregularsLoading: false,
      isIrregularsFetchingError: false
    }),
    [FETCH_IRREGULAR_WORDS_ERROR]: (state, { payload }) => ({
      ...state,
      isIrregularsLoading: false,
      isIrregularsFetchingError: true,
      irregularsFetchingErrorMessage: payload.MessageText
    }),
    [FETCH_IRREGULAR_WORDS_FAILURE]: (state, message) => ({
      ...state,
      isIrregularsLoading: false,
      isIrregularsFetchingError: true,
      irregularsFetchingErrorMessage: message
    })
  },
  initialState
)
