import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { ConfigProvider } from 'antd'
import 'moment/locale/ru'
import ruRU from 'antd/lib/locale-provider/ru_RU'

import store from 'utils/createdStore'
import createdHistory from 'utils/createdHistory'
import AppService from 'routes/containers/AppService'
import YandexMetrika from 'components/yandexMetrika'

// const RemoteButton = React.lazy(() => import('app2/Button'))

const App = () => (
  <ConfigProvider locale={ruRU}>
    {/* <h1>Basic Host-Remote</h1>
    <React.Suspense fallback='Loading Button'>
      <RemoteButton />
    </React.Suspense> */}
    <Provider store={store}>
      <Router history={createdHistory}>
        <AppService />
        <YandexMetrika />
      </Router>
    </Provider>
  </ConfigProvider>
)

export default App
