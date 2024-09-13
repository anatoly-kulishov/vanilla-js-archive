import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer, { reducers } from 'reducers'
import rootSaga from 'sagas'
import featureConfig from 'webseller/featureConfig'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)))

const injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga)
const injectReducer = (key, reducer) => {
  const combinedReducers = combineReducers({
    ...reducers,
    [key]: reducer
  })
  store.replaceReducer(combinedReducers)
}

function createSagaInjector (runSaga, rootSaga) {
  const injectedSagas = new Map()
  const injectSaga = (key, saga) => {
    if (injectedSagas.has(key)) {
      return
    }
    const task = runSaga(saga)
    injectedSagas.set(key, task)
  }
  injectSaga('root', rootSaga)
  return injectSaga
}

const isUseWebsellerRemote = [featureConfig.isUseRemoteDocumentIdentity, featureConfig.isUseRemoteSalesOffice].some(
  Boolean
)

if (isUseWebsellerRemote) {
  import('websellerRemote/rootReducer').then(reducer => injectReducer('webseller', reducer.default))
  import('websellerRemote/rootSaga').then(saga => injectSaga('webseller', saga.default))
}

export default store
