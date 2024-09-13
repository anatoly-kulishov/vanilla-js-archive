import { call } from 'redux-saga/effects'
import api from 'utils/api'
import { connectWsSaga, wsListeningSaga, wsSendingSaga } from 'utils/helpers/wsHelper'
import {
  RC_SEARCH_CONNECT_SUCCESS,
  RC_SEARCH_CONNECT_ERROR,
  RC_SEARCH_DATA_RECEIVED,
  RC_SEARCH_DATA_SEND,
  RC_SEARCH_CONNECT,
  RC_SEARCH_DISCONNECT,
  RC_SEARCH_DISCONNECT_SUCCESS
} from 'reducers/searching/reasonCategorySearchReducer'

const { reasonCategorySearch } = api

export function * RcSearchConnectSaga () {
  const sagas = [wsListeningSaga, wsSendingSaga]
  const actions = {
    connectType: RC_SEARCH_CONNECT,
    connectTypeError: RC_SEARCH_CONNECT_ERROR,
    connectTypeSuccess: RC_SEARCH_CONNECT_SUCCESS,
    disconnectType: RC_SEARCH_DISCONNECT,
    disconnectTypeSuccess: RC_SEARCH_DISCONNECT_SUCCESS,
    sendDataType: RC_SEARCH_DATA_SEND,
    receiveDataType: RC_SEARCH_DATA_RECEIVED
  }
  const connectPayload = { wsMethod: reasonCategorySearch, sagas, actions }

  yield call(connectWsSaga, connectPayload)
}
