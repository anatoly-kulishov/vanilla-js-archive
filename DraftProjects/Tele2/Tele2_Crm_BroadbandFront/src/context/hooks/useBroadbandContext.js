import { useContext } from 'react'

import { BroadbandContext } from 'context/index'

export function useBroadbandContext () {
  const broadbandState = useContext(BroadbandContext)
  return broadbandState
}
