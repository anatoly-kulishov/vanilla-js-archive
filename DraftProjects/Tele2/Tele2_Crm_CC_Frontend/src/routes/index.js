import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Redirect, useLocation, useHistory, Switch, Route } from 'react-router'
import { logIfEnabled } from 'utils/helpers/logger'
import { yandexMetrikaHistory } from 'utils/helpers/yandexMetrikaHistoryLog'
import { REDIRECT } from 'constants/logTypes'

import { layouts } from './constants/layouts'

import EmptyRouter from './routers/EmptyRouter'
import WebSellerRouter from './routers/WebSellerRouter'
import SigninOidc from './containers/SigninOidc'
import ErrorBoundary from 'components/ErrorBoundary'

const CardRouter = loadable(() => import(/* webpackChunkName: "CardRouter" */ './routers/CardRouter'))
const TwinspotRouter = loadable(() => import(/* webpackChunkName: "TwinspotRouter" */ './routers/TwinspotRouter'))

export default function Routes ({ isASSeller = false }) {
  const { search, hash } = useLocation()
  const history = useHistory()

  useEffect(() => {
    history.listen(({ pathname }) => {
      logIfEnabled({ type: REDIRECT, log: pathname })
      yandexMetrikaHistory(pathname)
    })
  }, [])

  const toBalance = useMemo(
    () => ({
      pathname: '/card/main/balance',
      search: search + hash
    }),
    [search, hash]
  )

  return (
    <ErrorBoundary>
      <Route>
        <Switch>
          <Route path='/signin-oidc'>
            <SigninOidc />
          </Route>
          <Route path={layouts.empty}>
            <EmptyRouter />
          </Route>
          <Route path={layouts.card}>
            <CardRouter />
          </Route>
          <Route path={layouts.twinspot}>
            <TwinspotRouter />
          </Route>
          <Route path={layouts.webSeller}>
            <WebSellerRouter />
          </Route>
          {!search.length && <Redirect from='*' to={isASSeller ? '/web-seller/dashboard' : '/empty/manual-search'} />}
          {/** TEMP */}
          <Redirect from='/main*' to={toBalance} />
        </Switch>
      </Route>
    </ErrorBoundary>
  )
}

Routes.propTypes = {
  isASSeller: PropTypes.bool
}
