import { END, eventChannel } from 'redux-saga'

export const countdown = secs => {
  return eventChannel(emitter => {
    const interval = setInterval(() => {
      secs -= 1
      if (secs >= 0) {
        emitter(secs)
      } else {
        emitter(END)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })
}
