import React, { Suspense } from 'react'
import { connect } from 'react-redux'

import history from 'utils/createdHistory'

const mapStateToProps = state => ({
  user: state.internal.userState.user
})

const RawBroadbandShifts = React.lazy(() => import('crmBroadbandRemote/BroadbandShifts'))
const BroadbandShifts = connect(mapStateToProps)(RawBroadbandShifts)

const BroadbandShiftsBootstrapper = () => {
  return (
    <Suspense fallback='Загрузка модуля ШПД'>
      <BroadbandShifts history={history} />
    </Suspense>
  )
}

export default BroadbandShiftsBootstrapper
