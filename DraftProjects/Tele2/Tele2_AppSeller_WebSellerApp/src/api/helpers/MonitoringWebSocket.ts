const WAITING_TIME = Number(process.env.REACT_APP_WAITING_TIME_MONITORING_WS) || 15_000; // TODO задать значение в env
const FREQUENCY_TIMING = Number(process.env.REACT_APP_FREQUENCY_TIMING_MONITORING_WS) || 60_000; // TODO задать значение в env

const PING_MESSAGE = JSON.stringify({
  operation: 'ping',
  message: ''
});

enum MonitoringStatus {
  INIT = 'INIT',
  STARTED = 'STARTED',
  STOPPED = 'STOPPED'
}

type Constructor = {
  socket: WebSocket;
  handleMonitoringError: VoidFunction;
};

export default class MonitoringWebSocket {
  #status = MonitoringStatus.INIT;
  #socket: WebSocket = null;
  #timerId: NodeJS.Timeout = null;

  #handleMonitoringError: VoidFunction = null;

  constructor({ socket, handleMonitoringError }: Constructor) {
    this.#socket = socket;
    this.#handleMonitoringError = handleMonitoringError;
    this.#socket.addEventListener('message', this.#handleMessage);
  }

  start() {
    this.#startMonitoring();
    this.#status = MonitoringStatus.STARTED;
  }

  stop() {
    this.#clearMonitoringTimer();
    this.#socket.removeEventListener('message', this.#handleMessage);
    this.#status = MonitoringStatus.STOPPED;
  }

  #startMonitoring() {
    this.#socket.send(PING_MESSAGE);
    this.#setMonitoringTimer();
  }

  #setMonitoringTimer() {
    this.#clearMonitoringTimer();

    this.#timerId = setTimeout(() => {
      this.#clearMonitoringTimer();
      this.#handleMonitoringError();
    }, WAITING_TIME);
  }

  #handleMessage = (event) => {
    if (this.#isStartedMonitoring()) {
      const { operation, message } = JSON.parse(event.data) || {};

      const isPongMessage = operation === 'ping' && message === 'pong';
      if (isPongMessage) {
        this.#clearMonitoringTimer();

        setTimeout(() => {
          this.#startMonitoring();
        }, FREQUENCY_TIMING);

        event.stopImmediatePropagation();
      }
    }
  };

  #clearMonitoringTimer() {
    clearTimeout(this.#timerId);

    this.#timerId = null;
  }

  #isStartedMonitoring() {
    return this.#status === MonitoringStatus.STARTED;
  }
}
