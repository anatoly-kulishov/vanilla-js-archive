import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Switch, Popconfirm } from 'antd'

const NameSwitch = (props) => {
  const { onConfirm, isChecked, disabled } = props
  return (
    <ServiceWrapper>
      <Popconfirm
        placement='topLeft'
        title={(isChecked) ? `Отключить услугу "На доверии"?` : `Подключить услугу "На доверии"?`}
        onConfirm={onConfirm}
        okText='Да'
        cancelText='Нет'
        trigger='click'
      >
        <Switch
          disabled={disabled}
          loading={false}
          className='switch'
          checked={isChecked}
        />
      </Popconfirm>
    </ServiceWrapper>
  )
}

export default NameSwitch

NameSwitch.propTypes = {
  onConfirm: PropTypes.func,
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool
}

const ServiceWrapper = styled.div`
  display: flex;
`
