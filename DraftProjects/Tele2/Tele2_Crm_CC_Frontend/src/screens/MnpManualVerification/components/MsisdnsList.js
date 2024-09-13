import { CloseOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { arrayOf, func, string } from 'prop-types'

const MsisdnsList = props => {
  const { msisdns, onClose, onClickMsisdn } = props

  return (
    <StyledCard
      bordered={false}
      title={
        <HeaderWrapper>
          <HeaderTitle>Переносимые номера</HeaderTitle>
          <CloseIcon onClick={onClose} />
        </HeaderWrapper>
      }
    >
      <Wrapper>
        {msisdns.map((msisdn, index) => (
          <MsisdnItem key={index} onClick={() => onClickMsisdn(msisdn)}>
            {msisdn}
          </MsisdnItem>
        ))}
      </Wrapper>
    </StyledCard>
  )
}

export default MsisdnsList

MsisdnsList.propTypes = {
  msisdns: arrayOf(string),
  onClose: func,
  onClickMsisdn: func
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 13px;
`

const HeaderTitle = styled.h3`
  margin-bottom: 0;
  margin-right: 10px;

  color: black;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
`

const MsisdnItem = styled.div`
  :not(:last-child) {
    margin-bottom: 13px;
  }

  color: #0066ff;
  cursor: pointer;
`

const Wrapper = styled.div`
  max-height: 193px;
  overflow-y: auto;
  padding: 16px 16px 14px;
`

const StyledCard = styled(Card)`
  height: 50%;
`

const CloseIcon = styled(CloseOutlined)`
  font-size: 28px;
`
