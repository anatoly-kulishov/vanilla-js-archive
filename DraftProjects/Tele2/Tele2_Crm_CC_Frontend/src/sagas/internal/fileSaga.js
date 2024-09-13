import { call, put } from 'redux-saga/effects'

import {
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_FAILURE,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_FAILURE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
  DELETE_FILE_FAILURE,
  FETCH_SESSION_FILES_SUCCESS,
  FETCH_SESSION_FILES_ERROR,
  FETCH_SESSION_FILES_FAILURE
} from 'reducers/internal/fileReducer'

import internal from 'utils/api'

export function * uploadFile ({ payload }) {
  const { uploadFile } = internal

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(uploadFile, payload)

    IsSuccess
      ? yield put({ type: UPLOAD_FILE_SUCCESS, payload: Data })
      : yield put({ type: UPLOAD_FILE_ERROR, payload: MessageText })
  } catch ({ message }) {
    yield put({ type: UPLOAD_FILE_FAILURE, message })
  }
}

export function * downloadFile ({ payload }) {
  const { downloadFile } = internal

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(downloadFile, payload)

    IsSuccess
      ? yield put({ type: DOWNLOAD_FILE_SUCCESS, payload: Data })
      : yield put({ type: DOWNLOAD_FILE_ERROR, payload: MessageText })
  } catch ({ message }) {
    yield put({ type: DOWNLOAD_FILE_FAILURE, message })
  }
}

export function * deleteFile ({ payload }) {
  const { deleteFile, fetchSessionFiles } = internal
  const { FileIdList, sessionId, getFileContent } = payload
  try {
    const deleteData = yield call(deleteFile, { FileIdList })
    const { data: { Data } } = yield call(fetchSessionFiles, { sessionId, getFileContent })
    if (deleteData) {
      yield put({ type: DELETE_FILE_SUCCESS, payload: Data })
    } else {
      yield put({ type: DELETE_FILE_ERROR, payload: deleteData.MessageText })
    }
  } catch ({ message }) {
    yield put({ type: DELETE_FILE_FAILURE, message })
  }
}

export function * fetchSessionFilesSaga ({ payload }) {
  const { fetchSessionFiles } = internal

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchSessionFiles, payload)
    if (IsSuccess) {
      yield put({ type: FETCH_SESSION_FILES_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_SESSION_FILES_ERROR, payload: MessageText })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_SESSION_FILES_FAILURE, message })
  }
}
