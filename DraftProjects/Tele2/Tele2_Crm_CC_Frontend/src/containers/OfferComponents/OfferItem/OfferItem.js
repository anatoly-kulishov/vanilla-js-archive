/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { notification } from 'antd'
import Bad from '../assets/bad.svg'
import Good from '../assets/good.svg'
import { string, number, func, object, bool } from 'prop-types'
import { throttle } from 'lodash'
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons'
import { RESPONSE_TYPE_ID } from 'constants/offers'

const markerType = {
  4: {
    color: 'white',
    background: '#40bfee',
    border: 'none'
  },
  3: {
    color: '#595959',
    background: '#F5F5F5',
    border: '#D9D9D9'
  },
  'default': {
    color: '#595959',
    background: '#F5F5F5',
    border: '#D9D9D9'
  }
}

const colorIcon = {
  shop: '#40BFEE',
  good: '#52C41A',
  bad: '#F22735'
}

class OfferItem extends Component {
  static propTypes = {
    Msisdn: string,
    handlingId: number,
    addOffers: func,
    offer: object,
    ismini: bool,
    isLoadingAddOffer: bool,
    personalAccountState: object,
    deleteOffer: func,
    isMnpOutReact: bool,
    isMnpSupport: bool,
    isAbOfferPilot: bool,
    isDelayedHandling: bool
  }

  constructor (props) {
    super(props)
    // create a ref to store the textInput DOM element
    this.desc = React.createRef()
  }

  state = {
    openDescription: false
  }

  handleAddOffer = throttle((offer, Response) => {
    const {
      Msisdn,
      handlingId,
      addOffers,
      isLoadingAddOffer,
      personalAccountState
    } = this.props
    const { personalAccount: { AdvertisingAgreement } } = personalAccountState

    if (!isLoadingAddOffer) {
      this.setState({
        openDescription: false
      })

      const {
        Name,
        Description,
        SmsText,
        SMS,
        TreatmentId,
        BranchId,
        SubsId,
        RateId,
        ServiceIds,
        IsConstructor,
        ParsedOfferId,
        IsAutoconnect,
        DeferredOfferId,
        OfferId
      } = offer

      let SendSms
      if (!AdvertisingAgreement && Response !== 2) {
        SendSms = SMS
      } else {
        SendSms = false
      }

      addOffers({
        Msisdn: Msisdn,
        OfferName: Name,
        Description: Description,
        SmsText: SmsText,
        ResponseTypeId: Response,
        DeferredOfferId,
        Sms: SendSms,
        TreatmentId: TreatmentId,
        SmsNumb: Msisdn,
        BranchId: BranchId,
        SubsId: SubsId,
        Date: moment().toISOString(),
        OfferId,
        RateId: RateId,
        ServId: ServiceIds,
        HandlingId: handlingId,
        IsConstructor: IsConstructor,
        ParsedOfferId: ParsedOfferId,
        IsAutoconnect
      })
    }
  }, 500, { trailing: false })

  handleDescription = () => {
    const { openDescription } = this.state
    this.setState({
      openDescription: !openDescription
    })
  }

  clickDescription = () => {
    const node = this.desc.current
    const selection = window.getSelection()
    if (selection.type !== 'Range') {
      selection.selectAllChildren(node)
      document.execCommand('copy')
      selection.removeAllRanges()
      notification.info({
        message: 'Предложение',
        description: 'Скопировано описание предложения'
      })
    }
  }

  render () {
    const {
      offer,
      ismini,
      isLoadingAddOffer,
      deleteOffer,
      isMnpOutReact,
      isMnpSupport,
      isAbOfferPilot,
      isDelayedHandling
    } = this.props

    const {
      Name,
      Description,
      rating,
      OfferMarkers,
      CrmOfferId,
      IsDeferred
    } = offer

    const markers = OfferMarkers || []

    const { openDescription } = this.state

    const descriptionFormatter = () => {
      return Description.replace('<![CDATA["', '').replace('"]]>', '')
    }

    return (
      <Offer ismini={ismini} rating={rating}>
        <Wrapper>
          <TitleWrapper>
            <Title ismini={ismini} onClick={this.handleDescription}>{Name}</Title>
            {!ismini && markers?.map((item, idx) => (
              <Marker
                type={markerType[item.MarkerId] || markerType['default']}
                key={idx}
                disabled={isDelayedHandling}
              >
                <Caption>
                  {item.MarkerCaption}
                  {!isDelayedHandling && item.MarkerId === 3 && <CloseIcon onClick={() => deleteOffer({ OfferId: CrmOfferId })} />}
                </Caption>
              </Marker>)
            )}
          </TitleWrapper>
          <Rating>
            {!IsDeferred && (isMnpOutReact || isMnpSupport || isAbOfferPilot) &&
              <IconRating as={ShoppingCartOutlined} colorIcon={colorIcon.shop} disabled={isDelayedHandling} onClick={() => !isDelayedHandling && this.handleAddOffer(offer, RESPONSE_TYPE_ID.ASIDE)} />
            }
            <IconRating as={Good} colorIcon={colorIcon.good} disabled={isLoadingAddOffer || isDelayedHandling} onClick={() => !isDelayedHandling && this.handleAddOffer(offer, RESPONSE_TYPE_ID.SUCCESS)} />
            <IconRating as={Bad} colorIcon={colorIcon.bad} disabled={isLoadingAddOffer || isDelayedHandling} onClick={() => !isDelayedHandling && this.handleAddOffer(offer, RESPONSE_TYPE_ID.ERROR)} />
          </Rating>
        </Wrapper>
        <DescriptionBlock onClick={() => this.clickDescription()}>
          {
            openDescription &&
            <div
              style={{ textAlign: 'justify', cursor: 'pointer' }}
              ref={this.desc}
              dangerouslySetInnerHTML={{ __html: descriptionFormatter() }}
            />
          }
        </DescriptionBlock>
      </Offer>
    )
  }
}

export default OfferItem

const Offer = styled.div`
  padding: ${props => props.ismini ? '10px 20px 10px' : '10px 20px 20px'};
  margin-bottom: ${props => props.ismini ? '0' : '0px'};
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-size: 15px;
  color: #000;
  cursor: pointer;
  width: 100%;
  white-space: ${props => props.ismini ? 'nowrap' : 'unset'};
  overflow: ${props => props.ismini ? 'hidden' : 'auto'};
  text-overflow: ${props => props.ismini ? 'ellipsis' : 'unset'};
`

const DescriptionBlock = styled.div`
  font-size: 13px;
  height: auto;
  width: 100%;
`

const Rating = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconRating = styled.div`
  opacity: ${props => props.disabled ? 0.5 : 1};
  font-size: 24px;
  margin-left: 5px;

  path {
    fill: #7F8285;
  }
  
  &:hover path {
    transition: all 0.3s ease-out;
    fill: ${props => props.disabled ? '#7F8285' : `${props.colorIcon}`};
  }

  :hover {
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  }
`

const TitleWrapper = styled.div`
  display: flex;
  overflow: hidden;
`
const Marker = styled.div`
  height: 20px;
  line-height: 17px;
  padding: 0px 7px 3px;
  margin: auto 4px;
  font-size: 12px;
  background: ${props => props.type.background};
  border: ${props => `1px solid ${props.type.border}`};
  border-radius: 10px;
  color: ${props => props.type.color};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`
const Caption = styled.div`
  display: flex;
  align-items: center;
`
const CloseIcon = styled(CloseOutlined)`
  margin-left: 5px;
  font-size: 10px;
  cursor: pointer;

  path {
    color: rgba(0,0,0,0.45);
  }

  &:hover path {
    transition: all 0.3s ease-out;
    color: rgba(0, 0, 0, 0.85);
  }
`
