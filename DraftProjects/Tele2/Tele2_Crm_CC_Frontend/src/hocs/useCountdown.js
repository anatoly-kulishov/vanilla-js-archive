import { useState, useEffect } from 'react'

export const useCountdown = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (!timeLeft) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  return timeLeft
}
