import React from 'react'

import { BroadbandContextProvider } from 'context/index'
import BroadbandSessions from './BroadbandSessions'

const BroadbandSessionsWithContext = rest => (
  <BroadbandContextProvider>
    <BroadbandSessions {...rest} />
  </BroadbandContextProvider>
)

export default BroadbandSessionsWithContext
