import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router'

import { checkRight } from 'utils/helpers'

function DefaultLayout ({ children }) {
  DefaultLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
  }

  return children
}

function ProtectedLayout ({ children, hasBalancesRights }) {
  ProtectedLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    hasBalancesRights: PropTypes.bool
  }

  const { search, pathname } = useLocation()

  if (hasBalancesRights) {
    return children
  }

  return <Redirect to={`${pathname.replace('operations', 'balance')}${search}`} />
}

const mapStateToProps = state => {
  const { user } = state.internal.userState
  const { isASSeller } = user
  const hasBalancesRights = isASSeller ? true : checkRight(user, 'CC:PaydComp')

  return {
    hasBalancesRights
  }
}

export default {
  DefaultLayout: connect(mapStateToProps, null)(DefaultLayout),
  ProtectedLayout: connect(mapStateToProps, null)(ProtectedLayout)
}
