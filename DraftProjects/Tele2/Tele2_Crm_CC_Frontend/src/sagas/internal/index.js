import { all, takeEvery } from 'redux-saga/effects'

import { TOKEN_FETCH, TOKEN_REFRESH } from 'reducers/internal/userReducer'
import { fetchTokenSaga, refreshTokenSaga } from './userSaga'

import { PARAMETERS_PROCESSING_FETCH } from 'reducers/internal/requestParametersProcessingReducer'
import { fetchParametersProcessingPaySaga } from './requestParametersProcessingSaga'

import { ALLOCATED_INFO_FETCH } from 'reducers/internal/allocatedInfoReducer'
import { fetchAllocatedInfoSaga } from './allocatedInfoSaga'

import {
  UPLOAD_FILE,
  DOWNLOAD_FILE,
  DELETE_FILE,
  FETCH_SESSION_FILES
} from 'reducers/internal/fileReducer'

import {
  uploadFile,
  downloadFile,
  deleteFile,
  fetchSessionFilesSaga
} from './fileSaga'

import { SUZ_TOKEN_FETCH } from 'reducers/internal/suzTokenReducer'
import { fetchSuzTokenSaga } from './suzTokenSaga'

import { CONFIGURATIONS_FETCH } from 'reducers/internal/configReducer'
import { fetchConfigurationsSaga } from './configSaga'

import { RECOGNIZE_VOICE } from 'reducers/internal/voiceRecognitionReducer'
import { recognizeVoiceSaga } from './voiceRecognitionSaga'

export default function * () {
  yield all([
    takeEvery(PARAMETERS_PROCESSING_FETCH, fetchParametersProcessingPaySaga),
    takeEvery(UPLOAD_FILE, uploadFile),
    takeEvery(DOWNLOAD_FILE, downloadFile),
    takeEvery(DELETE_FILE, deleteFile),
    takeEvery(FETCH_SESSION_FILES, fetchSessionFilesSaga),
    takeEvery(TOKEN_FETCH, fetchTokenSaga),
    takeEvery(TOKEN_REFRESH, refreshTokenSaga),
    takeEvery(SUZ_TOKEN_FETCH, fetchSuzTokenSaga),
    takeEvery(ALLOCATED_INFO_FETCH, fetchAllocatedInfoSaga),
    takeEvery(CONFIGURATIONS_FETCH, fetchConfigurationsSaga),
    takeEvery(RECOGNIZE_VOICE, recognizeVoiceSaga)
  ])
}
