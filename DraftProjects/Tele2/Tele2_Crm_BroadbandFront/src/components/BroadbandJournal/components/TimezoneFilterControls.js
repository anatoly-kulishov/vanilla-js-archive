import { Switch } from 'antd'
import React from 'react'
import styled from 'styled-components'

const TimezoneFilterControls = ({ showRegionTimezone, setShowRegionTimezone }) => {
  return (
    <TimezoneControls>
      <span>Часовой пояс:</span>
      <SwitchWrapper>
        Москвы
        <Switch size='small' checked={showRegionTimezone} onChange={setShowRegionTimezone} />
        Региона заявки
      </SwitchWrapper>
    </TimezoneControls>
  )
}

export default TimezoneFilterControls

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const TimezoneControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
