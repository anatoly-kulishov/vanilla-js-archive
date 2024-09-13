import React from 'react'

import Broadband from './Broadband'
import { BroadbandContextProvider } from 'context/index'

const BroadbandWithContext = rest => (
  <BroadbandContextProvider>
    <Broadband {...rest} />
  </BroadbandContextProvider>
)

export default BroadbandWithContext
