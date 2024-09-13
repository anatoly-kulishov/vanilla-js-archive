import { delay } from 'webseller/helpers/api'

export default function getFinalPollingData ({
  interval,
  threshold,
  fetchData,
  checkOnSuccess,
  checkOnError
}) {
  return new Promise(async (resolve, reject) => {
    let isExpiredTime = false
    let finalResult = null
    let error = null

    const stopPollingTimer = setTimeout(() => {
      isExpiredTime = true
    }, threshold)

    /* eslint no-unmodified-loop-condition: 0 */
    while (!isExpiredTime) {
      try {
        const response = await fetchData()

        if (checkOnError(response)) {
          error = response
          clearTimeout(stopPollingTimer)
          break
        }

        if (checkOnSuccess(response)) {
          finalResult = response
          clearTimeout(stopPollingTimer)
          break
        }

        await delay(interval)
      } catch {
        clearTimeout(stopPollingTimer)
        break
      }
    }

    if (!finalResult) {
      reject(error)
      return
    }

    resolve(finalResult)
  })
}
