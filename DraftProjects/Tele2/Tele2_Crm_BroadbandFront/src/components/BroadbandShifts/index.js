import React from 'react'

import { BroadbandContextProvider } from 'context/index'
import BroadbandShifts from './BroadbandShifts'

const BroadbandShiftsWithContext = props => (
  <BroadbandContextProvider>
    <BroadbandShifts {...props} />
  </BroadbandContextProvider>
)

export default BroadbandShiftsWithContext
