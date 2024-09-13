import { useState } from 'react'

function useForceUpdate () {
  const [, setVal] = useState(0)
  return () => { setVal(val => val + 1) }
}

export default useForceUpdate
