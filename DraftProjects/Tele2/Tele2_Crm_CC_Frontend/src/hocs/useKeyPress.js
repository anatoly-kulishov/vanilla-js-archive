import { useState, useEffect } from 'react'

export default function useKeyPress (targetKey, shouldDetect) {
  const [keyPressed, setKeyPressed] = useState(false)

  function downHandler ({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    if (shouldDetect) {
      window.addEventListener('keydown', downHandler)
      window.addEventListener('keyup', upHandler)
      return () => {
        window.removeEventListener('keydown', downHandler)
        window.removeEventListener('keyup', upHandler)
      }
    }
  }, [shouldDetect])

  return keyPressed
}
