import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import { checkRights } from 'utils/helpers'
import ErrorBoundary from 'components/ErrorBoundary'
import { layouts } from '../constants/layouts'
import { getRoutes } from '../constants/routes'
import TwinspotLayout from '../containers/TwinspotLayout/'

import CardRouter from './CardRouter'

function TwinspotRouter ({ user }) {
  const { isASSeller } = user
  const routes = getRoutes(isASSeller)

  return (
    <ErrorBoundary>
      <TwinspotLayout>
        <Switch>
          {routes
            .filter(route => route.layouts.includes(layouts.twinspot) && checkRights(user, route.permissions))
            ?.map((route, index) => (
              <Route key={index} path={layouts.twinspot + route.path} component={route.component} />
            ))}
          <CardRouter isTwinspot />
        </Switch>
      </TwinspotLayout>
    </ErrorBoundary>
  )
}

TwinspotRouter.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  ...state.internal.userState
})

export default connect(mapStateToProps, null)(TwinspotRouter)
