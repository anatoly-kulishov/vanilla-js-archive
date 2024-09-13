/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { useImmer as useState } from 'use-immer'

import { initialHistoryState, historyContextDisplayName } from './constants'

const HistoryContext = createContext([{}, () => {}])

HistoryContext.displayName = historyContextDisplayName

const HistoryContextProvider = ({ children }) => {
  HistoryContextProvider.propTypes = {
    children: PropTypes.node
  }

  const [historyState, setHistoryState] = useState(initialHistoryState)
  return (
    <HistoryContext.Provider value={[historyState, setHistoryState]}>
      {children}
    </HistoryContext.Provider>)
}

export { HistoryContext, HistoryContextProvider }
