import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, useLocation, useRouteMatch } from 'react-router'
import { cardModes } from 'constants/cardModes'

function AnonLayout ({ children }) {
  AnonLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
  }

  return children
}

function DefaultLayout ({ children, cardMode }) {
  DefaultLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    cardMode: PropTypes.number
  }

  const { search } = useLocation()
  const { url } = useRouteMatch()

  const isAnon = cardModes.anonymous === cardMode
  return isAnon ? <Redirect to={`${url}/history/${search}`} /> : children
}

const mapStateToProps = state => {
  return {
    cardMode: state.internal.cardMode.cardMode
  }
}

export default {
  DefaultLayout: connect(
    mapStateToProps,
    null
  )(DefaultLayout),
  AnonLayout: connect(
    mapStateToProps,
    null
  )(AnonLayout)
}
