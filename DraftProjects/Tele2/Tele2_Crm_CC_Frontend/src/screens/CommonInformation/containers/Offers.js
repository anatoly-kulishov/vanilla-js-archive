import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Collapse, Tag } from 'antd'
import { object, number, bool } from 'prop-types'
import styled from 'styled-components'

import OfferGridDown from 'containers/OfferComponents/OfferGridDown'

import OfferItem from 'containers/OfferComponents/OfferItem'

const style = { borderRight: '1px solid #E4E4E9' }

const mapStateToProps = state => {
  return {
    offersState: state.offers,
    msisdn: state.personalInfo.personalAccountState.personalAccount.Msisdn,
    handlingId: state.internal.handlingState.Id
  }
}

function Offers ({ offersState, msisdn, handlingId, isDelayedHandling }) {
  Offers.propTypes = {
    offersState: object,
    msisdn: number,
    handlingId: number,
    isDelayedHandling: bool
  }
  const offers = offersState?.availableOffers?.Offers ?? []
  const halfLen = offers.length / 2 + (offers.length % 2)
  const firstHalfOffers = offers.slice(0, halfLen)
  const secondHalfOffers = offers.slice(halfLen)
  const offerResponseTypes = offersState?.registeredOffers?.OfferResponseTypes ?? []

  function listOffers (offers) {
    return (
      <Fragment>
        {offers.map((offer, index) => {
          return (
            <OfferItem
              key={index}
              offer={offer}
              Msisdn={msisdn}
              handlingId={handlingId}
              isDelayedHandling={isDelayedHandling}
            />
          )
        })}
      </Fragment>
    )
  }

  if (!offers.length) {
    return (<NoOffersDisclaimer>Предложения отсутствуют</NoOffersDisclaimer>)
  }
  return (
    <Fragment>
      <Wrapper>
        <Col span={12} style={style}>
          {listOffers(firstHalfOffers)}
        </Col>
        <Col span={12}>
          {listOffers(secondHalfOffers)}
        </Col>
      </Wrapper>
      <Collapse ghost>
        <Panel header={PanelWithTags(offerResponseTypes)}>
          <OfferGridDown isDelayedHandling={isDelayedHandling} />
        </Panel>
      </Collapse>
    </Fragment>
  )
}

const colorTypeResponseTags = {
  1: 'success',
  2: 'error'
}

function PanelWithTags (offerResponseTypes) {
  return <>
    <Title>Зарегистрированные предложения</Title>
    {offerResponseTypes.map((item, idx) => {
      return <Tag
        key={idx}
        color={colorTypeResponseTags[item.ResponseTypeId] || 'default'}
      >
        {`${item.ResponseTypeName}: ${item.TotalCount}`}
      </Tag>
    })}
  </>
}

export default connect(mapStateToProps)(Offers)

const Wrapper = styled(Row)`
  max-height: 300px;
  overflow-y: auto;
  border-bottom: 1px solid #E4E4E9;
`
const NoOffersDisclaimer = styled.div`
  padding: 16px 21px;
`
const Panel = styled(Collapse.Panel)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`
const Title = styled.span`
  margin-right: 10px;
`
