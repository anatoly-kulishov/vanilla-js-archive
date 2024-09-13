import moment from 'moment'
import createdStore from 'utils/createdStore'
import { RENDER } from 'constants/logTypes'
import api from 'utils/api/internal'

const { log: logCall } = api

export async function log ({ type, log }) {
  const {
    internal: { handlingState, userState }
  } = createdStore.getState()

  await logCall({
    logId: handlingState?.Id?.toString() || '',
    name: userState?.user?.email || '',
    date: moment().utc().format(),
    type,
    log
  })
}

export function logEnabled () {
  const ymConfigString = localStorage.getItem('YandexMetrikaConfig')
  const ymConfig = ymConfigString ? JSON.parse(ymConfigString) : {}

  const { IsLogsEnabled } = ymConfig

  return IsLogsEnabled
}

export function logIfEnabled ({ type, log: logData }) {
  logEnabled() && log({ type, log: logData })
}

export function withLogger (children) {
  logEnabled() && log({ type: RENDER, log: children.name })
  return children
}
