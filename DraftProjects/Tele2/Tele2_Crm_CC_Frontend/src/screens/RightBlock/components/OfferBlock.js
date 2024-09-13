/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import OfferItem from 'containers/OfferComponents/OfferItem'
import LoadingSpinner from 'components/LoadingSpinner'

export default class OfferBlock extends Component {
  static propTypes = {
    offers: PropTypes.object,
    toggleOffers: PropTypes.func,
    Msisdn: PropTypes.string,
    handlingId: PropTypes.number
  }

  style = { marginBottom: '10px' }

  render () {
    const { offers, toggleOffers, Msisdn, handlingId } = this.props
    const availableOffersState = offers.availableOffers || { Offers: [], OfferCount: 0 }

    const { isLoadingOffers, isLoadingRegisteredOffers } = offers
    const { Offers: availableOffers, OfferCount, OffersCountSetting } = availableOffersState
    const registeredOffersCount = get(offers, 'registeredOffers.OffersCount', 0)

    return (
      <Fragment>
        {offers && handlingId && (
          <Offers>
            {OfferCount === 0 && registeredOffersCount === 0 && (
              <Spin
                spinning={isLoadingOffers || isLoadingRegisteredOffers}
                indicator={<LoadingSpinner spin />}
              >
                <ZeroOffers>Нет предложений</ZeroOffers>
              </Spin>
            )}
            {(OfferCount !== 0 || registeredOffersCount !== 0) && (
              <div>
                <div style={this.style}>
                  <OffersTitle onClick={() => toggleOffers()}>Предложения</OffersTitle>
                  <OffersLength>{OfferCount}</OffersLength>
                </div>
                <OffersTable>
                  {availableOffers.map((offer, index) => {
                    if (index < OffersCountSetting) {
                      return <OfferItem key={index} offer={offer} ismini Msisdn={Msisdn} handlingId={handlingId} />
                    }
                    return null
                  })}
                </OffersTable>
              </div>
            )}
          </Offers>
        )}
      </Fragment>
    )
  }
}

const Offers = styled.div`
  background-color: #fff;
  margin-top: 5px;
  padding-top: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const ZeroOffers = styled.div`
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
  color: #000;
  padding: 0 5px 10px 20px;
`

const OffersTitle = styled.span`
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
  color: #000;
  margin: 0 5px 5px 20px;
  border-bottom: 1px dashed #7f8285;
  cursor: pointer;
`

const OffersTable = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`

const OffersLength = styled.span`
  color: #696f76;
  font-size: 16px;
`
