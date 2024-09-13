import { getAuthToken } from 'utils/helpers/authToken'

const createWebSocketWithAuth = (url) => {
  const token = getAuthToken().split(' ')[1]
  return new WebSocket(url, ['client', token])
}

export default createWebSocketWithAuth
