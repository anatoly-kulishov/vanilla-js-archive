/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Route } from 'react-router-dom'
import { func } from 'prop-types'

export default function AppRoute ({ component: Component, layout: Layout, ...rest }) {
  AppRoute.propTypes = {
    component: func.isRequired,
    layout: func.isRequired
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
