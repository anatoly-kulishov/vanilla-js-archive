import React, { Fragment } from 'react'
import HasMsisdns from './components/HasMsisdns'
import EmptyMsisdns from './components/EmptyMsisdns'

export default function CheckPepStep ({ msisdns }) {
  return <Fragment>{msisdns?.length && msisdns.length > 0 ? <HasMsisdns /> : <EmptyMsisdns />}</Fragment>
}
