import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import { checkRights } from 'utils/helpers'
import ErrorBoundary from 'components/ErrorBoundary'
import { layouts } from '../constants/layouts'
import { getRoutes } from '../constants/routes'
import CardLayout from '../containers/CardLayout'

const routesPath = (path, isTwinspot) => (isTwinspot ? layouts.twinspot + path : path)
function CardRouter ({ user, isTwinspot, cardMode }) {
  const { isASSeller } = user
  const routes = getRoutes(isASSeller)

  return (
    <ErrorBoundary>
      <CardLayout isTwinspot={isTwinspot}>
        {routes
          .filter(
            route =>
              route.layouts.includes(layouts.card) &&
              route.cardModes.includes(cardMode) &&
              checkRights(user, route.permissions)
          )
          ?.map((route, index) => (
            <Route key={index} path={routesPath(layouts.card + route.path, isTwinspot)} component={route.component} />
          ))}
      </CardLayout>
    </ErrorBoundary>
  )
}

CardRouter.propTypes = {
  user: PropTypes.object,
  isTwinspot: PropTypes.bool,
  cardMode: PropTypes.number
}

const mapStateToProps = state => ({
  ...state.internal.userState,
  cardMode: state.internal.cardMode.cardMode
})

export default connect(mapStateToProps, null)(CardRouter)
