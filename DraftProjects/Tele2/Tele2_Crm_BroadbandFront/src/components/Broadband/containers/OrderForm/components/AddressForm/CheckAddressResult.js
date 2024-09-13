import React, { useMemo } from 'react'
import styled from 'styled-components'
import { CheckCircleFilled, InfoCircleFilled, CloseCircleFilled } from '@ant-design/icons'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

export const CheckAddressResult = () => {
  const { orderState, checkAddressState } = useBroadbandContext()
  const { AvailableSpeedValue, AvailableTechnology, IsOnlime } = orderState
  const { data, message, isError } = checkAddressState

  const checkResult = useMemo(() => {
    const speedTechnologyText = `${AvailableSpeedValue} мбит/с по технологиям: ${AvailableTechnology}`
    const status = isError ? 0 : +data?.StatusId

    let resultData = null
    switch (status) {
      case 0:
        const errorText = 'Техническая возможность подключения отсутствует' + (message ? `: ${message}` : '')
        resultData = { text: errorText, iconStyle: CloseCircleFilled, color: '#FF0000' }
        break
      case 1:
        resultData = { text: speedTechnologyText, iconStyle: CheckCircleFilled, color: '#52C41A' }
        break
      case 2:
        resultData = { text: data?.StatusName, iconStyle: InfoCircleFilled, color: '#FAAD14' }
        break
      default:
        const isOrderCreating = AvailableSpeedValue && AvailableTechnology
        resultData = isOrderCreating ? { text: speedTechnologyText, iconStyle: CheckCircleFilled, color: '#52C41A' } : null
    }

    return resultData && (
      <IconWrapper>
        <StyledIcon as={resultData.iconStyle} color={resultData.color} />
        <Text>{resultData.text}</Text>
      </IconWrapper>
    )
  }, [checkAddressState, AvailableSpeedValue, AvailableTechnology])

  const onlimeResult = useMemo(() => {
    return IsOnlime && (
      <IconWrapper>
        <StyledIcon as={CheckCircleFilled} color={'#52C41A'} />
        <Text>Онлайм</Text>
      </IconWrapper>
    )
  }, [IsOnlime])

  return (
    <ResultWrapper>
      {checkResult}
      {onlimeResult}
    </ResultWrapper>
  )
}

export default CheckAddressResult

const ResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconWrapper = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
`
const Text = styled.div`
  padding-left: 8px;
`
const StyledIcon = styled.div`
  font-size: 22px;
  color: ${({ color }) => color};
`
