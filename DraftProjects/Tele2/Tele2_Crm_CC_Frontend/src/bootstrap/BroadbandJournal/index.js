import React, { Suspense } from 'react'
import { connect } from 'react-redux'

const BroadbandJournal = React.lazy(() => import('crmBroadbandRemote/BroadbandJournal'))

const mapStateToProps = state => ({
  user: state.internal.userState.user
})

const mapDispatchToProps = {}

const BroadbandJournalRemote = connect(mapStateToProps, mapDispatchToProps)(BroadbandJournal)

const BroadbandJournalBootstrapper = () => {
  return (
    <Suspense fallback='Загрузка модуля ШПД'>
      <BroadbandJournalRemote />
    </Suspense>
  )
}

export default BroadbandJournalBootstrapper
