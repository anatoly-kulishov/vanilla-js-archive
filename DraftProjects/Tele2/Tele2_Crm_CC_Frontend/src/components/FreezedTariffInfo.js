import React from 'react'
import { Tooltip } from 'antd'
import styled from 'styled-components'
import { SnowFlakeIcon } from 'assets/index'
import moment from 'moment'
import { string } from 'prop-types'

const propTypes = { frozenUntil: string }

const FrozenTariffInfo = props => {
  const { frozenUntil } = props

  const tariffBlockedInfo = frozenUntil
    ? `Заморозка тарифа до ${moment(frozenUntil).format('DD.MM.YYYY')}`
    : 'Нет данных о заморозке'

  return (
    <Tooltip title={tariffBlockedInfo} placement='bottom'>
      <StyledSnowFlakeIcon />
    </Tooltip>
  )
}

FrozenTariffInfo.propTypes = propTypes

export default FrozenTariffInfo

const StyledSnowFlakeIcon = styled(SnowFlakeIcon)`
  width: 20px;
  height: 20px;
  fill: #44caff;
`
