import React, { Component } from 'react'
import styled from 'styled-components'
import { Drawer } from 'antd'
import OfferItem from '../OfferItem'
import OfferGridDown from '../OfferGridDown'
import { func, object, number, array } from 'prop-types'

import { logIfEnabled } from 'utils/helpers/logger'
import { getCardMode } from 'utils/helpers/getCardMode'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { OFFERS_MODAL } from 'constants/logModalNames'
import { cardModes } from 'constants/cardModes'

class Offers extends Component {
  static propTypes = {
    toggleOffers: func,
    offers: object,
    handlingId: number,
    fetchOffers: func,
    fetchRegisteredOffers: func,
    personalAccountState: object,
    interactions: array,
    fetchInteractions: func
  }
  state = {
    msisdn: ''
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { fetchOffers, fetchRegisteredOffers } = nextProps

    if (nextProps.personalAccountState.personalAccount) {
      const msisdn = nextProps.personalAccountState.personalAccount.Msisdn
      const clientCategory = nextProps.personalAccountState.personalAccount.ClientCategory
      const isAnonymous = getCardMode(clientCategory, msisdn) === cardModes.anonymous

      if ((msisdn !== prevState.msisdn && msisdn !== null && msisdn !== undefined) && !isAnonymous) {
        fetchOffers()
        fetchRegisteredOffers()
        return { msisdn: msisdn }
      }
    }

    return null
  }

  componentDidMount = () => {
    const { interactions, fetchInteractions } = this.props
    logIfEnabled({ type: MODAL_OPEN, log: OFFERS_MODAL })
    if (Array.isArray(interactions) && interactions.length === 0) {
      fetchInteractions()
    }
  }

  handleCloseModal = () => {
    this.props.toggleOffers()
    logIfEnabled({ type: MODAL_CLOSE, log: OFFERS_MODAL })
  }

  background = { backgroundColor: 'rgba(0, 0, 0, 0.10)' }

  render () {
    const {
      offers,
      handlingId
    } = this.props
    const availableOffersState = offers.availableOffers || { Offers: [], OfferCount: 0 }
    const {
      Offers,
      OfferCount,
      OffersCountSettingFull
    } = availableOffersState
    const { msisdn } = this.state

    return (
      <DrawerWrapper
        width={500}
        visible={offers.isToggled}
        mask
        maskStyle={this.background}
        footer={null}
        onClose={this.handleCloseModal}
      >
        <Title>Предложения</Title>
        <OffersLength>{OfferCount}</OffersLength>
        <OffersGrid>
          <OffersTable>
            {
              Offers.map((offer, index) => {
                if (!OffersCountSettingFull || index < OffersCountSettingFull) {
                  return (
                    <OfferItem
                      key={index}
                      offer={offer}
                      Msisdn={msisdn}
                      handlingId={handlingId}
                    />
                  )
                }
                return null
              })
            }
          </OffersTable>
        </OffersGrid>
        <OfferGridDown />
      </DrawerWrapper>
    )
  }
}

export default Offers

const DrawerWrapper = styled(Drawer)`
  & .ant-drawer-wrapper-body {
    padding: 130px 0 20px;
  }

  & .ant-drawer-body {
    height: 100%;
    padding: 0;
  }

  & .ant-drawer-close {
    top: 110px;
  }
`

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
  margin-left: 20px;
  margin-right: 5px;
`

const OffersTable = styled.div`
  display: flex;
  flex-direction: column;
`

const OffersGrid = styled.div`
  overflow: auto;
  height: 60%;
`

const OffersLength = styled.span`
  color: #696F76;
  font-size: 16px;
`
