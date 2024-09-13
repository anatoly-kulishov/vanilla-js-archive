import { all, call, cancel, cancelled, delay, fork, put, take } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

export function ws (url) {
  return new Promise((resolve, reject) => {
    const webSocket = new WebSocket(url)
    webSocket.onopen = () => resolve(webSocket)
    webSocket.onerror = error => reject(new Error(error))
  })
}

export function wsChannel (socket) {
  return eventChannel(emitter => {
    socket.onmessage = event => emitter(event.data)
    socket.onclose = () => emitter(END)
    const unsubscribe = () => {
      socket.onmessage = null
    }

    return unsubscribe
  })
}

export function * connectWsSaga (payload) {
  const { wsMethod, sagas, actions, params } = payload

  const { connectTypeError, connectType, connectTypeSuccess, disconnectType, disconnectTypeSuccess } = actions

  let socket
  let channel

  try {
    socket = yield call(wsMethod, params)
    channel = yield call(wsChannel, socket)

    yield put({ type: connectTypeSuccess })

    const sagaPayload = { channel, actions, socket }
    const forkedSagas = sagas.map(saga => fork(saga, { payload: sagaPayload }))

    yield all(forkedSagas)

    while (yield take(disconnectType)) {
      yield cancel()
    }
  } catch (error) {
    yield put({ type: connectTypeError })
    yield delay(5000)
    yield put({ type: connectType, payload: params })
  } finally {
    if (yield cancelled()) {
      socket?.close()
      channel?.close()
      yield put({ type: disconnectTypeSuccess })
    }
  }
}

export function * wsSendingSaga ({ payload }) {
  const { socket, actions } = payload
  const { sendDataType } = actions

  while (true) {
    const { payload: sendDataPayload } = yield take(sendDataType)
    yield socket.send(sendDataPayload)
  }
}

export function * wsListeningSaga ({ payload }) {
  const { channel, actions } = payload
  const { receiveDataType } = actions

  while (true) {
    const data = yield take(channel)
    let parsedData = []
    try {
      parsedData = JSON.parse(data)
    } catch (error) {
      parsedData = []
    }
    yield put({ type: receiveDataType, payload: parsedData })
  }
}
