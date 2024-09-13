import React from 'react'

import { BroadbandContextProvider } from 'context/index'
import BroadbandJournal from './BroadbandJournal'

const BroadbandJournalWithContext = props => (
  <BroadbandContextProvider>
    <BroadbandJournal {...props} />
  </BroadbandContextProvider>
)

export default BroadbandJournalWithContext
