import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const LIKES_FETCH = 'likes/LIKES_FETCH'
export const LIKES_FETCH_SUCCESS = 'likes/LIKES_FETCH_SUCCESS'
export const LIKES_FETCH_ERROR = 'likes/LIKES_FETCH_ERROR'
export const LIKES_FETCH_FAILURE = 'likes/LIKES_FETCH_FAILURE'

export const LIKE_CREATE = 'likes/LIKE_CREATE'
export const LIKE_CREATE_SUCCESS = 'likes/LIKE_CREATE_SUCCESS'
export const LIKE_CREATE_ERROR = 'likes/LIKE_CREATE_ERROR'
export const LIKE_CREATE_FAILURE = 'likes/LIKE_CREATE_FAILURE'

const initalState = {
  features: [],
  isLikesLoading: false,
  likesError: ''
}

export const getLikes = createAction(LIKES_FETCH)
export const createLike = createAction(LIKE_CREATE)

export default handleActions(
  {
    // get like
    [LIKES_FETCH]: produce((state, action) => {
      state.isLikesLoading = true
      state.likesError = ''
    }),
    [LIKES_FETCH_SUCCESS]: produce((state, { payload }) => {
      state.isLikesLoading = false
      state.features = payload
    }),
    [combineActions(LIKES_FETCH_ERROR, LIKES_FETCH_FAILURE)]: produce((state, { payload }) => {
      state.isLikesLoading = false
      state.likesError = payload
    }),
    // create like
    [LIKE_CREATE]: produce((state, action) => {
      state.isLikesLoading = true
      state.likesError = ''
    }),
    [LIKE_CREATE_SUCCESS]: produce((state, action) => {
      state.isLikesLoading = false
    }),
    [combineActions(LIKE_CREATE_ERROR, LIKE_CREATE_FAILURE)]: produce((state, { payload }) => {
      state.isLikesLoading = false
      state.likesError = payload
    })
  },
  initalState
)
