import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

const SigninOidc = ({ user }) => {
  const redirectPath = user.isASSeller ? '/web-seller/dashboard' : '/empty/manual-search'

  return <Redirect to={redirectPath} />
}

const mapStateToProps = state => ({
  ...state.internal.userState
})

export default connect(mapStateToProps)(SigninOidc)
