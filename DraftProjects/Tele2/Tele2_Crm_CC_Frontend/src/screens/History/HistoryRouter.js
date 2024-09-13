/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

import ConnectedLayouts from './components/navigation/HistoryLayouts'
import CreditLimit from './containers/CreditLimit'
import Interactions from './containers/Interactions'
import Tickets from './containers/Tickets'
import OperatorSms from './containers/OperatorSms'
import Offers from './containers/Offers'
import OffersCbm from './containers/OffersCbm'
import Services from './containers/Services'
import Questionary from './containers/QuestionaryHistory'
import WgHistory from './containers/WgHistory'
import Tariff from './containers/Tariff'
import MnpHistory from './containers/MnpHistory'
import Promo from './containers/Promo'
// import MnpHistoryStatement from 'screens/CommonInformation/components/HistoryStatement' TODO

const { AnonLayout, DefaultLayout } = ConnectedLayouts

function AppRoute ({ component: Component, layout: Layout, ...rest }) {
  AppRoute.propTypes = {
    component: PropTypes.func.isRequired,
    layout: PropTypes.func.isRequired
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

export default function Router () {
  const match = useRouteMatch()

  return (
    <Switch>
      <AppRoute path={`${match.url}/appeals`} layout={AnonLayout} component={Interactions} />
      <AppRoute path={`${match.url}/applications`} layout={AnonLayout} component={Tickets} />
      <AppRoute path={`${match.url}/operator`} layout={AnonLayout} component={OperatorSms} />
      <AppRoute path={`${match.url}/offers`} layout={DefaultLayout} component={Offers} />
      <AppRoute path={`${match.url}/offers-cbm`} layout={DefaultLayout} component={OffersCbm} />
      <AppRoute path={`${match.url}/services`} layout={DefaultLayout} component={Services} />
      <AppRoute path={`${match.url}/questionary`} layout={AnonLayout} component={Questionary} />
      <AppRoute path={`${match.url}/credit-limit`} layout={DefaultLayout} component={CreditLimit} />
      <AppRoute path={`${match.url}/wargaming`} layout={DefaultLayout} component={WgHistory} />
      <AppRoute path={`${match.url}/tariff`} layout={DefaultLayout} component={Tariff} />
      <AppRoute path={`${match.url}/mnp`} layout={DefaultLayout} component={MnpHistory} />
      <AppRoute path={`${match.url}/promo`} layout={DefaultLayout} component={Promo} />
    </Switch>
  )
}
