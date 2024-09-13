import { useState, useEffect } from 'react'

const defaultVisibilityProps = {
  hidden: 'hidden',
  visibilityChange: 'visibilitychange'
}

const IEVisibilityProps = {
  hidden: 'msHidden',
  visibilityChange: 'msvisibilitychange'
}

const SafariVisibilityProps = {
  hidden: 'webkitHidden',
  visibilityChange: 'webkitvisibilitychange'
}

const getBrowserVisibilityProps = () => {
  if (typeof document.hidden !== 'undefined') {
    return defaultVisibilityProps
  } else if (typeof document.msHidden !== 'undefined') {
    return IEVisibilityProps
  } else if (typeof document.webkitHidden !== 'undefined') {
    return SafariVisibilityProps
  }
}

const { hidden, visibilityChange } = getBrowserVisibilityProps()

export default function usePageVisibility () {
  const [visibilityStatus, setVisibilityStatus] = useState(document[hidden])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setVisibilityStatus(document[hidden])
    }
    document.addEventListener(visibilityChange, handleVisibilityChange)

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange)
    }
  }, [])

  return visibilityStatus
}
