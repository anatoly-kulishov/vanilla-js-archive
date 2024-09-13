/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import PropTypes from 'prop-types'

const style = { marginRight: '20px' }

const SmsSendingSuccessRequestPage = (props) => {
  SmsSendingSuccessRequestPage.PropTypes = {
    numbers: PropTypes.object,
    isDateOfSend: PropTypes.bool,
    onRemoveSmsRequest: PropTypes.func,
    onCancelSms: PropTypes.func
  }
  const { numbers, isDateOfSend, onRemoveSmsRequest, onCancelSms } = props
  if (isDateOfSend) {
    return (
      <Wrapper>
        <EmojiWrapper>
          😺
        </EmojiWrapper>
        <TitleWrapper>
          <Title>SMS в очереди на оправку на номер {numbers.map(item => `${'+' + item}`)}</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Button style={style} onClick={() => onCancelSms()}>Отменить</Button>
          <Button onClick={() => onRemoveSmsRequest()}>Отправить еще раз SMS</Button>
        </ButtonWrapper>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <EmojiWrapper>
          😺
        </EmojiWrapper>
        <TitleWrapper>
          <Title>SMS отправлено на номер {numbers.map(item => `${'+' + item}`)}</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Button onClick={() => onRemoveSmsRequest()}>Отправить еще раз SMS</Button>
        </ButtonWrapper>
      </Wrapper>
    )
  }
}

export default SmsSendingSuccessRequestPage

const Wrapper = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 55px;
  background: #fff;
`

const EmojiWrapper = styled.p`
  margin-bottom: 15px;
  font-size: 34px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`

const Title = styled.div`
  font-size: 15px;
  max-width: 185px;
  color: #000;
  text-align: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
