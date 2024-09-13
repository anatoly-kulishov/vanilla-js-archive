import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import Icon, { LoadingOutlined } from '@ant-design/icons'

const OperationButton = props => {
  const { title, onClick, disabled, loading = false, icon, iconBackground, isHidden = false } = props

  if (isHidden) return null

  return (
    <Spin spinning={loading} indicator={<LoadingIcon spin />}>
      <WebSellerButton disabled={disabled} onClick={onClick}>
        <ButtonIcon iconBackground={iconBackground}>
          <StyledIcon component={icon} />
        </ButtonIcon>
        <ButtonTitle>{title}</ButtonTitle>
      </WebSellerButton>
    </Spin>
  )
}

export default OperationButton

const WebSellerButton = styled.button`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  word-break: break-all;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  border-radius: 16px;
  padding: 8px;

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    background: #eeeeee;
  }

  &:disabled:hover {
    background: none;
    cursor: inherit;
  }
`
const ButtonIcon = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-content: center;
  height: 42px;
  width: 42px;
  border-radius: 16px;
  color: black;
  background: ${({ iconBackground }) => iconBackground ?? 'gray'};
`
const ButtonTitle = styled.div``
const StyledIcon = styled(Icon)`
  font-size: 24px;

    & svg {
      fill: transparent;
    }
`
const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24;
`
