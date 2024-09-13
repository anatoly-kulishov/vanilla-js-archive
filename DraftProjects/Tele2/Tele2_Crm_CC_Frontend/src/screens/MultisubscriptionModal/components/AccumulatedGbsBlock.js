import { Card, Row } from 'antd'
import { bool, number, oneOf, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const AccumulatedGbsBlock = props => {
  AccumulatedGbsBlock.propTypes = { value: oneOf([string, number]), message: string, isSuccess: bool }
  const { value, message, isSuccess } = props

  if (!isSuccess) {
    return <div>{message}</div>
  }

  return (
    <StyledCard>
      <ContentWrapper>
        <Row justify='center'>
          <Title>Накоплено Гб</Title>
        </Row>
        <Row justify='center'>
          <Value>{`${value} Гб`}</Value>
        </Row>
        <Row justify='center'>
          <Note>доступны после переноса номера в Tele2</Note>
        </Row>
      </ContentWrapper>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  padding: 5px;

  border-width: 3px;
  border-radius: 10px;
`

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
`

const Value = styled.p`
  font-weight: bold;
  font-size: 27px;
`

const Note = styled.p`
  font-size: 11px;
`

const ContentWrapper = styled.div`
  * {
    margin: 0;
  }
`

export default AccumulatedGbsBlock
