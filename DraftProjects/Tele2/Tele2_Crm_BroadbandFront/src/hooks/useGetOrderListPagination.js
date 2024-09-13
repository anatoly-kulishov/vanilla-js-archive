import { useState } from 'react'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

const useGetOrderListPagination = () => {
  const { getOrderList } = useBroadbandContext()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })

  const handleChangePage = page => setPagination(prev => ({ ...prev, current: page }))

  const handleNextClick = async (__, additionalParams) => {
    const params = {
      ...(additionalParams ?? {}),
      takeRecordCount: pagination.pageSize,
      skipRecordCount: pagination.current * pagination.pageSize
    }

    const isSuccess = await getOrderList(params)
    if (isSuccess) {
      handleChangePage(pagination.current + 1)
    }
  }

  const handlePrevClick = async (__, additionalParams) => {
    const params = {
      ...(additionalParams ?? {}),
      takeRecordCount: pagination.pageSize,
      skipRecordCount: (pagination.current - 2) * pagination.pageSize
    }

    const isSuccess = await getOrderList(params)
    if (isSuccess) {
      handleChangePage(pagination.current - 1)
    }
  }

  const handleChangePageSize = async (args, additionalParams) => {
    const [pageSize] = args

    const params = { ...(additionalParams ?? {}), takeRecordCount: pageSize, skipRecordCount: 0 }

    const isSuccess = await getOrderList(params)
    if (isSuccess) {
      setPagination(prev => ({ ...prev, current: 1, pageSize }))
    }
  }

  return { handleChangePageSize, handleNextClick, handlePrevClick, pagination, handleChangePage }
}

export default useGetOrderListPagination
