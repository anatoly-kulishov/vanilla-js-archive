import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import { checkRights } from 'utils/helpers'
import ErrorBoundary from 'components/ErrorBoundary'
import { layouts } from '../constants/layouts'
import { getRoutes } from '../constants/routes'
import WebSellerLayout from '../containers/WebSellerLayout'

function WebSellerRouter ({ user }) {
  const { isASSeller } = user
  const routes = getRoutes(isASSeller)

  return (
    <ErrorBoundary>
      <WebSellerLayout>
        {routes
          .filter(route => route.layouts.includes(layouts.webSeller) && checkRights(user, route.permissions))
          .map((route, index) => (
            <Route key={index} path={layouts.webSeller + route.path} component={route.component} />
          ))}
      </WebSellerLayout>
    </ErrorBoundary>
  )
}

WebSellerRouter.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  ...state.internal.userState
})

export default connect(mapStateToProps, null)(WebSellerRouter)
