const WAITING_TIME = Number(process.env.REACT_APP_WAITING_TIME_MONITORING_WS) || 15_000
const FREQUENCY_TIMING = Number(process.env.REACT_APP_FREQUENCY_TIMING_MONITORING_WS) || 60_000

const PING_MESSAGE = JSON.stringify({
  operation: 'ping',
  message: ''
})

const MonitoringStatus = {
  INIT: 'INIT',
  STARTED: 'STARTED',
  STOPPED: 'STOPPED'
}

export default class MonitoringWebSocket {
    #status = MonitoringStatus.INIT
    #socket = null
    #timerId = null

    #handleMonitoringError = null

    constructor ({ socket, handleMonitoringError }) {
      this.#socket = socket
      this.#handleMonitoringError = handleMonitoringError
      this.#socket.addEventListener('message', this.#handleMessage)
    }

    start () {
      this.#startMonitoring()
      this.#status = MonitoringStatus.STARTED
    }

    stop () {
      this.#clearMonitoringTimer()
      this.#socket.removeEventListener('message', this.#handleMessage)
      this.#status = MonitoringStatus.STOPPED
    }

    #startMonitoring () {
      this.#socket.send(PING_MESSAGE)
      this.#setMonitoringTimer()
    }

    #setMonitoringTimer () {
      this.#clearMonitoringTimer()

      this.#timerId = setTimeout(() => {
        this.#clearMonitoringTimer()
        this.#handleMonitoringError()
      }, WAITING_TIME)
    }

    #handleMessage = (event) => {
      if (this.#isStartedMonitoring()) {
        const { operation, message } = JSON.parse(event.data) || {}

        const isPongMessage = operation === 'ping' && message === 'pong'
        if (isPongMessage) {
          this.#clearMonitoringTimer()

          setTimeout(() => {
            this.#startMonitoring()
          }, FREQUENCY_TIMING)

          event.stopImmediatePropagation()
        }
      }
    }

    #clearMonitoringTimer () {
      clearTimeout(this.#timerId)

      this.#timerId = null
    }

    #isStartedMonitoring () {
      return this.#status === MonitoringStatus.STARTED
    }
}
