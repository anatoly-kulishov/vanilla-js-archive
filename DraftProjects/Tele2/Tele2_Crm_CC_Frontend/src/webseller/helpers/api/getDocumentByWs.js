import fromEnv from 'config/fromEnv'
import { getAuthToken } from 'utils/helpers/authToken'

import MonitoringWebSocket from './MonitoringWebSocket'

const WS_DOCUMENT_SERVICE = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_WS')}/documentservice`

export const getDocumentByWs = ({ requestId, title, sockets }) => {
  if (!requestId) {
    return Promise.reject(new Error())
  }

  return new Promise((resolve, reject) => {
    const token = getAuthToken().split(' ')[1]
    const socket = new WebSocket(`${WS_DOCUMENT_SERVICE}/api/v1/Documents/${requestId}`, ['client', token])

    const stopConnection = () => {
      monitoring.stop()
      socket.close()
      reject(new Error())
    }

    const monitoring = new MonitoringWebSocket({
      socket,
      handleMonitoringError: stopConnection
    })

    if (sockets) {
      sockets.push(socket)
    }

    socket.onopen = () => {
      monitoring.start()
    }

    socket.addEventListener('message', (event) => {
      const responseBody = JSON.parse(event.data)

      const document = {
        title,
        ...responseBody
      }
      resolve(document)
    })

    socket.onerror = stopConnection

    socket.onclose = stopConnection
  })
}
