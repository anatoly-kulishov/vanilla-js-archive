import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Routes from 'routes'
import { checkRight } from 'utils/helpers'
import AppLoader from './components/AppLoader'
import AuthByOidc from './components/AuthByOidc'
import { isWebSellerApp } from 'webseller/helpers'

export default function AppService ({
  isOidcAuth,
  user,
  fetchTokenSuccess,
  updateUserData,
  fetchConfigurations,
  fetchToken,
  getLikes,
  getActiveSalesOffice
}) {
  // Авторизация для CRM
  useEffect(() => {
    if (!isOidcAuth) {
      fetchToken()
    }
  }, [])

  // Вызов основных методов после авторизации
  useEffect(() => {
    if (user !== null) {
      fetchConfigurations()
      getLikes()

      if (isWebSellerApp()) {
        getActiveSalesOffice()
      }
    }
  }, [user])

  if (isOidcAuth) {
    return <AuthByOidc user={user} fetchTokenSuccess={fetchTokenSuccess} updateUserData={updateUserData} />
  }

  if (user === null) {
    return <AppLoader />
  }

  const isASSeller = checkRight(user, 'AS:Seller')
  const isWebApp = checkRight(user, 'CC:WebApp')

  const isForbidden = !isWebApp && !isASSeller
  if (isForbidden) {
    return <div>forbidden</div>
  }

  return <Routes isASSeller={isASSeller} />
}

AppService.propTypes = {
  isOidcAuth: PropTypes.bool,
  user: PropTypes.object,
  fetchConfigurations: PropTypes.func,
  fetchToken: PropTypes.func,
  getLikes: PropTypes.func,
  fetchTokenSuccess: PropTypes.func,
  updateUserData: PropTypes.func
}
