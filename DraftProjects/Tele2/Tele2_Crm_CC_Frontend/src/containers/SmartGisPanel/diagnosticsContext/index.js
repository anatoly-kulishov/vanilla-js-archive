/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { createContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useImmer as useState } from 'use-immer'

import { initialDiagnosticsState } from './constants'
import { TorusGeocoderController } from 'components/SmartGisMap/constants'
import useForceUpdate from '../../../hooks/useForceUpdate'

const DiagnosticsContext = createContext([{}, () => {}])

const DiagnosticsProvider = ({ children }) => {
  DiagnosticsProvider.propTypes = {
    children: PropTypes.node
  }
  const SmartGisController = useRef(null)
  const forceUpdate = useForceUpdate()

  const initSmartGisController = useCallback(() => {
    if (SmartGisController.current === null) {
      SmartGisController.current = TorusGeocoderController.instance
      forceUpdate()
    }
    return SmartGisController.current
  }, [])

  const [diagnosticsState, setDiagnosticsState] = useState(initialDiagnosticsState)

  return (
    <DiagnosticsContext.Provider value={[diagnosticsState, setDiagnosticsState, SmartGisController.current, initSmartGisController]}>
      {children}
    </DiagnosticsContext.Provider>
  )
}

export { DiagnosticsContext, DiagnosticsProvider }
