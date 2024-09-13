import { eventChannel, END } from 'redux-saga'

export function sse (url) {
  return new Promise((resolve, reject) => {
    const sseConnection = new EventSource(url)
    sseConnection.onopen = () => resolve(sseConnection)
    sseConnection.onerror = (error) => reject(new Error(error))
  })
}

export function sseChannel (connection) {
  return eventChannel(emitter => {
    connection.onmessage = event => emitter(event.data)
    connection.onclose = () => emitter(END)

    const unsubscribe = () => {
      connection.onmessage = null
    }

    return unsubscribe
  })
}
