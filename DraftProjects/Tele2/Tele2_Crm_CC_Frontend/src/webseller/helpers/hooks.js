import { useCallback, useState } from 'react'
import { debounce } from 'lodash'

export const useToggleState = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggleValue = () => {
    setValue(prev => !prev)
  }

  return { value, setValue, toggleValue }
}

export const useDebouncedSearch = ({
  minLengthQuery = 3,
  msDebounce = 250,
  search,
  deps = []
}) =>
  useCallback(
    debounce((query) => {
      if (query && query.length > minLengthQuery) {
        search(query)
      }
    }, msDebounce),
    deps
  )
