import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const RECOGNIZE_VOICE = 'voice/RECOGNIZE_VOICE'
export const RECOGNIZE_VOICE_SUCCESS = 'voice/RECOGNIZE_VOICE_SUCCESS'
export const RECOGNIZE_VOICE_ERROR = 'voice/RECOGNIZE_VOICE_ERROR'
export const RECOGNIZE_VOICE_FAILURE = 'voice/RECOGNIZE_VOICE_FAILURE'

const initalState = {
  isVoiceReconizing: false,
  text: ''
}

export const recognizeVoice = createAction(RECOGNIZE_VOICE)

export default handleActions(
  {
    [RECOGNIZE_VOICE]: produce((state) => {
      state.isVoiceReconizing = true
    }),

    [RECOGNIZE_VOICE_SUCCESS]: produce((state, { payload }) => {
      state.isVoiceReconizing = false
      state.text = payload
    }),

    [combineActions(RECOGNIZE_VOICE_ERROR, RECOGNIZE_VOICE_FAILURE)]: produce((state, { payload }) => {
      state.isVoiceReconizing = false
    })
  },
  initalState
)
