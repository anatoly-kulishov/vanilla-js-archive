import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import { checkRights } from 'utils/helpers'
import ErrorBoundary from 'components/ErrorBoundary'
import { layouts } from '../constants/layouts'
import { getRoutes } from '../constants/routes'
import EmptyLayout from '../containers/EmprtyLayout'

function EmptyRouter ({ user }) {
  const { isASSeller } = user
  const routes = getRoutes(isASSeller)

  return (
    <ErrorBoundary>
      <EmptyLayout>
        {routes
          .filter(route => route.layouts.includes(layouts.empty) && checkRights(user, route.permissions))
          .map((route, index) => (
            <Route key={index} path={layouts.empty + route.path} component={route.component} />
          ))}
      </EmptyLayout>
    </ErrorBoundary>
  )
}

EmptyRouter.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  ...state.internal.userState
})

export default connect(mapStateToProps, null)(EmptyRouter)
