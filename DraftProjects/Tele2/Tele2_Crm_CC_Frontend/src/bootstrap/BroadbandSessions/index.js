import React, { Suspense } from 'react'
import { connect } from 'react-redux'

import history from 'utils/createdHistory'

const mapStateToProps = state => ({
  user: state.internal.userState.user
})

const RawBroadbandSessions = React.lazy(() => import('crmBroadbandRemote/BroadbandSessions'))
const BroadbandSessions = connect(mapStateToProps)(RawBroadbandSessions)

const BroadbandSessionsBootstrapper = () => {
  return (
    <Suspense fallback='Загрузка модуля ШПД'>
      <BroadbandSessions history={history} />
    </Suspense>
  )
}

export default BroadbandSessionsBootstrapper
