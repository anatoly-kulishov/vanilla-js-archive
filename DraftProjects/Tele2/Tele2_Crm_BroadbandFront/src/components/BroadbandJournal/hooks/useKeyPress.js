import { useState, useEffect } from 'react'

export function useKeyPress (targetKey, callback) {
  const [keyPressed, setKeyPressed] = useState(false)

  function downHandler ({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
      callback()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}
