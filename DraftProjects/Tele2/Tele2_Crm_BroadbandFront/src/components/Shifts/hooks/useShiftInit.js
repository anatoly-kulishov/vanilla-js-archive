import { useEffect } from 'react'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { isNil } from 'lodash-es'
import usePageVisibility from 'hooks/usePageVisibility'

const useShiftInit = () => {
  const { getOperatorShifts, operatorShifts, getSessionTaskTypes } = useBroadbandContext()

  const { data: operatorShiftsData } = operatorShifts.get
  const hasShifts = !isNil(operatorShiftsData) && operatorShiftsData?.length > 0

  const isPageHidden = usePageVisibility()

  useEffect(() => {
    getSessionTaskTypes()
  }, [])

  useEffect(() => {
    if (!isPageHidden) {
      getOperatorShifts({ isActive: true })
    }
  }, [isPageHidden])

  return { hasShifts }
}

export default useShiftInit
