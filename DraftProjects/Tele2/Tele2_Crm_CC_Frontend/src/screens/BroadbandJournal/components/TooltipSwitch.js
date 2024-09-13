import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip, Form, Switch } from 'antd'

const { Item } = Form

const TooltipSwitch = ({ isSwitchDisabled }) => {
  const switchContent = useMemo(() => {
    return isSwitchDisabled ? (
      <Tooltip open title='Доступно при выборе регионов из одного часового пояса'>
        <Switch disabled={isSwitchDisabled} size='small' />
      </Tooltip>
    ) : (
      <Switch disabled={isSwitchDisabled} size='small' />
    )
  }, [isSwitchDisabled])

  return (
    <SwitchWrapper>
      Часовой пояс оператора
      <Item name='IsRegionTimezone'>
        {switchContent}
      </Item>
      абонента
    </SwitchWrapper>
  )
}

TooltipSwitch.propTypes = {
  isSwitchDisabled: PropTypes.bool
}

export default TooltipSwitch

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
