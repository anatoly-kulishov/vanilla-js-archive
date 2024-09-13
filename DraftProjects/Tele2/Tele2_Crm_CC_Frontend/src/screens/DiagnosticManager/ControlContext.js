/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { HANDLE_CONTROL_UPDATE } from './constants/ControlContextActions'

const initialState = {
  isWarningVisible: false,
  controls: {}
}

const ControlStateContext = createContext()

function controlReducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case HANDLE_CONTROL_UPDATE:
        const { name, params } = payload
        draft.controls = { ...state.controls, ...{ [name]: { ...params } } }
        break
      default: break
    }
  })
}

function ControlProvider ({ children }) {
  ControlProvider.propTypes = {
    children: PropTypes.object
  }
  const [state, dispatch] = useReducer(controlReducer, initialState)
  return (
    <ControlStateContext.Provider value={{ state, dispatch }}>
      {children}
    </ControlStateContext.Provider>
  )
}

function useControlContext () {
  const context = useContext(ControlStateContext)
  if (context === undefined) {
    throw new Error('useControlState must be used within a ControlProvider')
  }
  return context
}

export { ControlProvider, useControlContext }
