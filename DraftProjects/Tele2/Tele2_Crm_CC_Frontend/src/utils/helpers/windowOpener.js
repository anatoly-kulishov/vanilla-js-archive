import { EXT_REDIRECT } from 'constants/logTypes'
import { logEnabled, log } from 'utils/helpers/logger'

export default function open (url, target, features, replace) {
  logEnabled() && log({ type: EXT_REDIRECT, log: url })
  return window.open(url, target, features, replace)
}
