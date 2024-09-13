import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'
import 'babel-polyfill'
import * as serviceWorker from './serviceWorker'

import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
serviceWorker.unregister()
