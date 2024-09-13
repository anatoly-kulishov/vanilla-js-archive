/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from 'antd'
import clientTypeEnum from 'screens/Finance/constants/clientTypeEnum'
import { UserOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons'
const { SUBSCRIBER, CLIENT, MAIN_CLIENT } = clientTypeEnum

const ClientFilter = ({ clientType, onChange, isB2c }) => {
  ClientFilter.propTypes = {
    isB2c: PropTypes.bool,
    clientType: PropTypes.number,
    onChange: PropTypes.func
  }
  return (
    <Wrapper>
      <Tooltip placement='top' title='Абонент'>
        <IconWrapper isActive={clientType === SUBSCRIBER} onClick={() => onChange(SUBSCRIBER)}>
          <UserOutlined />
        </IconWrapper>
      </Tooltip>
      <Tooltip placement='top' title='Клиент'>
        <IconWrapper isActive={clientType === CLIENT} onClick={() => onChange(CLIENT)}>
          <TeamOutlined />
        </IconWrapper>
      </Tooltip>
      <Tooltip placement='top' title='Главный клиент'>
        <IconWrapper isActive={clientType === MAIN_CLIENT} onClick={() => onChange(MAIN_CLIENT)} disabled={isB2c}>
          <HomeOutlined />
        </IconWrapper>
      </Tooltip>
    </Wrapper>
  )
}

export default ClientFilter

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: 16px;
`

const IconWrapper = styled.div`
  padding: 3px 12px;
  border: 1px solid #d9d9d9;
  border-right: none;
  background: ${props => (props.isActive ? '#d9d9d9' : 'white')};
  color: ${props => (props.isActive ? 'white' : 'black')};

  pointer-events: ${props => (props.disabled ? 'none' : 'initial')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  :first-of-type {
    border-radius: 4px 0 0 4px;
  }
  :last-of-type {
    border-radius: 0 4px 4px 0;
    border-right: 1px solid #d9d9d9;
  }
`
