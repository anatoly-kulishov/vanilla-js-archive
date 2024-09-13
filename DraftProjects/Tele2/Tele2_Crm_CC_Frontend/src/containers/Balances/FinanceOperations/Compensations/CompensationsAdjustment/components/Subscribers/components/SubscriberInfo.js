import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Popover } from 'antd'

import LoadingSpinner from 'components/LoadingSpinner'

const setDotColor = status => {
  switch (status) {
    case 1:
      return '#52C41A'
    case 2:
      return '#F5222D'
    case 3:
      return 'black'
    case 4:
      return '#FFDE03'
    case 0:
      return '#bbb'
    default:
      return 'white'
  }
}

const SubscriberInfo = props => {
  const { info, isInfoLoading, isInfoError } = props
  const isInfo = !!info

  if (isInfoLoading) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    )
  }

  if (isInfoError) {
    return (
      <Wrapper>
        <Content>
          <ErrorText>Ошибка получения информации об абоненте</ErrorText>
        </Content>
      </Wrapper>
    )
  }

  if (isInfo) {
    const {
      SubscriberFullInfo: {
        SubscriberInfo: {
          SubscriberFullName: Name,
          RateName,
          SubscriberStatus,
          SubscriberStatusId,
          StatusChangeReason
        },
        SubscriberClientInfo: { ClientTypeName, JurClientTypeName, Region }
      },
      ClientCategory
    } = info

    const clientType = useMemo(() => {
      return ClientTypeName + ' ' + JurClientTypeName + ' ' + ClientCategory
    }, [ClientTypeName, JurClientTypeName, ClientCategory])

    const infoFields = useMemo(() => {
      return [
        { field: 'Тарифный план', value: RateName },
        { field: 'Регион', value: Region }
      ]
    }, [RateName, Region])

    const dotColor = useMemo(() => setDotColor(SubscriberStatusId), [SubscriberStatusId])

    return (
      <Wrapper>
        <Content>
          <FullNameWrapper>
            <FullName>{Name}</FullName>
            <Popover title={SubscriberStatus} content={StatusChangeReason}>
              <DotWrapper>
                <Dot color={dotColor} />
              </DotWrapper>
            </Popover>
          </FullNameWrapper>
          <ClientType>{clientType}</ClientType>
          {infoFields.map((item, index) => {
            return (
              <FieldWrapper key={index}>
                <FieldLabel>{item.field}</FieldLabel>
                <FieldValue>{item.value}</FieldValue>
              </FieldWrapper>
            )
          })}
        </Content>
      </Wrapper>
    )
  }
  return <Fragment />
}

SubscriberInfo.propTypes = {
  info: PropTypes.object,
  isInfoLoading: PropTypes.bool,
  isInfoError: PropTypes.bool
}

export default SubscriberInfo

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 0 30px;
`

const Content = styled.div`
  width: 100%;
`

const FullNameWrapper = styled.div`
  position: relative;
`

const DotWrapper = styled.div`
  position: absolute;
  top: -4px;
  left: -25px;
  height: 25px;
  width: 20px;

  &:hover {
    cursor: pointer;
  }
`
const Dot = styled.span`
  margin: 8px 0 0 10px;
  height: 8px;
  width: 8px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
`

const FullName = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  margin-bottom: 5px;
`

const ClientType = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 1px;
  color: #8e97a0;
  margin-bottom: 12px;
`

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
`

const FieldLabel = styled.div`
  width: 130px;
  color: #000;
  font-weight: bold;
`

const FieldValue = styled.div`
  width: 120px;
  text-align: right;
  color: #000;
`

const ErrorText = styled.div`
  color: #f5222d;
`
