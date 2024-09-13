import React, { Fragment, useEffect } from 'react'
import { AuthProvider, useAuth } from 'oidc-react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'
import Routes from 'routes'
import { isBirthday as isBirthdayHelper } from 'sagas/internal/userSaga'
import { checkRight } from 'utils/helpers'
import { userManagerOidc } from 'utils/oidc'
import AppLoader from './AppLoader'
import WebSellerModals from 'webseller/integration/modals/WebSellerModals'

function App (props) {
  const { user, fetchTokenSuccess, updateUserData } = props

  const { userData } = useAuth()
  const accessToken = userData?.access_token

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken)
      const isBirthday = isBirthdayHelper(decodedToken)

      fetchTokenSuccess({ isTokenOk: true })
      updateUserData({ ...decodedToken, isBirthday })
    }
  }, [accessToken])

  if (user === null) {
    return <AppLoader />
  }

  const isASSeller = checkRight(user, 'AS:Seller')
  const isWebApp = checkRight(user, 'CC:WebApp')

  const isForbidden = !isWebApp && !isASSeller
  if (isForbidden) {
    return <div>Для получения доступа к системе обратись к тренеру или представителю Tele2</div>
  }

  return (
    <Fragment>
      <WebSellerModals />
      <Routes isASSeller={isASSeller} />
    </Fragment>
  )
}

export default function AuthByOidc (props) {
  return (
    <AuthProvider userManager={userManagerOidc}>
      <App {...props} />
    </AuthProvider>
  )
}

AuthByOidc.propTypes = {
  user: PropTypes.object,
  fetchTokenSuccess: PropTypes.func,
  updateUserData: PropTypes.func
}
