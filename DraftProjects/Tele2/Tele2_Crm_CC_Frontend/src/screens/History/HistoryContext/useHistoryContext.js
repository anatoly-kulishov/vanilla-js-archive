import moment from 'moment'
import { useContext, useEffect } from 'react'
import { HistoryType, initialHistoryState } from './constants'

import { HistoryContext } from './index'

const useHistoryContext = historyType => {
  const [diagnosticsState, setHistoryState] = useContext(HistoryContext)
  /**
   * An object of history states
   */
  const flags = diagnosticsState.flags
  /**
   * An object with all history filters
   */
  const filters = diagnosticsState.filters

  useEffect(() => {
    if (historyType === HistoryType.Promo) {
      updateHistoryFilterValue({
        datePeriodStart: moment().subtract(6, 'months'),
        datePeriodFinish: moment()
      })
    } else {
      updateHistoryFilterValue({
        datePeriodStart: initialHistoryState.filters.datePeriodStart,
        datePeriodFinish: initialHistoryState.filters.datePeriodFinish
      })
    }
  }, [])

  /**
   * Toggles history filters visibility.
   * Pass true/false to manual set filter visibility state.
   * Pass no args to toggle opposite filter visibility state.
   */
  const toggleHistoryFilterVisibility = isFilterVisible => {
    setHistoryState(currentState => {
      const { isHistoryFilterVisible } = currentState.flags
      currentState.flags.isHistoryFilterVisible = isFilterVisible || !isHistoryFilterVisible
    })
  }

  /**
   * Update filter values.
   * If no args passed, sets an opposite state.
   * @param {Object} newFilterValues - An object containing updated filter values.
   */
  const updateHistoryFilterValue = newFilterValues => {
    setHistoryState(currentState => {
      const { filters } = currentState
      for (const key in newFilterValues) {
        if (filters.hasOwnProperty(key)) {
          currentState.filters[key] = newFilterValues[key]
        }
      }
    })
  }

  return {
    flags,
    filters,
    methods: {
      toggleHistoryFilterVisibility,
      updateHistoryFilterValue
    }
  }
}

export default useHistoryContext
