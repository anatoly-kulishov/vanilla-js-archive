import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { isFunction } from 'lodash'

import { OperationStatus } from 'webseller/helpers'
import { IconSuccess, IconSmthWentWrong, IconLaterUpdate } from 'webseller/icons'
import { Title, Button } from 'webseller/components'
import { SCROLL_CSS } from 'webseller/helpers/styles'
import Loader from './Loader'

export default function OperationResult ({
  status,
  isLoading,
  loadingText = 'Выполнение операции',
  title,
  message,
  additional,
  okText = 'Готово',
  executeOperation,
  onOk,
  hasGoBack = false,
  goBack
}) {
  useLayoutEffect(() => {
    isFunction(executeOperation) && executeOperation()
  }, [])

  if (isLoading || status === OperationStatus.NONE) {
    return <Loader title={loadingText} />
  }

  const renderIcon = () => {
    switch (status) {
      case OperationStatus.SUCCESSFUL: {
        return <IconSuccess />
      }

      case OperationStatus.PARTIALLY_SUCCESSFUL: {
        return <IconLaterUpdate />
      }

      case OperationStatus.FAILURE:
      default: {
        return <IconSmthWentWrong />
      }
    }
  }

  return (
    <Container>
      <Main>
        <IconWrapper>{renderIcon()}</IconWrapper>
        <InfoContainer>
          <InfoHeader bold fontSize={18}>
            {title}
          </InfoHeader>
          <Title fontSize={16}>{message}</Title>
        </InfoContainer>
        {additional}
      </Main>
      <Footer hasGoBack={hasGoBack}>
        {hasGoBack && <Button onClick={goBack}>Назад</Button>}
        <Button type='primary' onClick={onOk}>
          {okText}
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  ${SCROLL_CSS}
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const IconWrapper = styled.span`
  font-size: 120px;
`

const InfoHeader = styled(Title)`
  margin-bottom: 16px;
`

const InfoContainer = styled.div`
  text-align: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: ${props => props.hasGoBack ? 'space-between' : 'flex-end'};
  align-items: center;
`
