import { combineReducers } from 'redux'

import handlingState from './handlingReducer'
import queryParamsState from './parameters'
import userState from './userReducer'
import processingParametersState from './requestParametersProcessingReducer'
import notificationsState from './notifications'
import rightModal from './rightModalReducer'
import file from './fileReducer'
import suz from './suzTokenReducer'
import allocatedInfo from './allocatedInfoReducer'
import voiceRecognition from './voiceRecognitionReducer'
import cardMode from './cardModesReducer'

export default combineReducers({
  userState,
  queryParamsState,
  handlingState,
  notificationsState,
  processingParametersState,
  rightModal,
  file,
  suz,
  allocatedInfo,
  voiceRecognition,
  cardMode
})
