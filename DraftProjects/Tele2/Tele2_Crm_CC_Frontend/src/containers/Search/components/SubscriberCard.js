/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'

export default function SubscriberCard ({ item, handleOpenWindow }) {
  const { SubscriberName, ClientName, SubscriberStatus, Msisdn, BillingBranch, ClientStatus } = item

  const setDotColor = status => {
    // чекнуть все доступные статусы(for subsriber && client)
    switch (status) {
      case 'Активен':
        return '#52C41A'
      case 'Закрыт':
        return '#F5222D'
      case 'Блокирован':
        return '#F5222D'
      case 3:
        return 'black'
      case 'Приостановлен':
        return '#FFDE03'
      case 0:
        return '#bbb'
      default:
        return 'white'
    }
  }

  return (
    <Card>
      <NameStatusWrapper>
        <NameWrapper
          onClick={() => handleOpenWindow(item)}
        >
          {SubscriberName || ClientName}
        </NameWrapper>
        <DotWrapper>
          <Tooltip title={SubscriberStatus || ClientStatus}>
            <Dot color={setDotColor(SubscriberStatus || ClientStatus)} />
          </Tooltip>
        </DotWrapper>
      </NameStatusWrapper>

      <RegionMsisdnWrapper>
        <Label>{Msisdn}</Label>
        <Region>{BillingBranch}</Region>
      </RegionMsisdnWrapper>
    </Card>
  )
}

SubscriberCard.propTypes = {
  SubscriberName: PropTypes.string,
  ClientName: PropTypes.string,
  Msisdn: PropTypes.string,
  BillingBranch: PropTypes.string,
  ClientStatus: PropTypes.string,
  item: PropTypes.object,
  handleOpenWindow: PropTypes.func
}

const Card = styled.div`
  font-family: T2_Rooftop_Regular;
  color: #000;
`
const NameWrapper = styled.div`
  color: black;
  font-weight: bold;
  font-size: 14px;
  : hover {
    cursor: pointer;
  }
`
const Label = styled.div`
  color: #8e97a0;
`

const RegionMsisdnWrapper = styled.div`
  padding: 0 15px 5px 15px;
`
const Region = styled.div`
  color: black;
  font-size: 14px;
`

const DotWrapper = styled.div`
  height: 25px;
  width: 20px;
  &:hover {
    cursor: pointer;
  }
`
const Dot = styled.span`
  margin-left: 10px;
  height: 8px;
  width: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`
const NameStatusWrapper = styled.div`
  display: flex;
  padding: 10px 0px 0px 15px;
`
