/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Popover, Modal } from 'antd'
import { StopOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Bad from '../assets/bad.svg'
import Good from '../assets/good.svg'
import Check from '../assets/check.svg'
import { object, func, number, array, bool } from 'prop-types'
import { checkRight } from 'utils/helpers'
import { throttle } from 'lodash'
import { RESPONSE_TYPE_ID } from 'constants/offers'

export default class OfferGridDown extends Component {
  static propTypes = {
    offers: object,
    deleteOffer: func,
    changeOffer: func,
    handlingId: number,
    personalAccountState: object,
    handleAutoConnectOffer: func,
    user: object,
    interactions: array,
    isDelayedHandling: bool
  }

  handleDeleteOffer = throttle((payload) => {
    const {
      offers: {
        isLoadingDeleteOffer,
        isLoadingHandleAutoConnectOffer
      },
      deleteOffer
    } = this.props

    if (!isLoadingDeleteOffer && !isLoadingHandleAutoConnectOffer) {
      deleteOffer(payload)
    }
  }, 500, { trailing: false })

  handleAutoConnect = record => {
    const {
      handlingId,
      personalAccountState,
      offers: {
        isLoadingDeleteOffer,
        isLoadingHandleAutoConnectOffer
      },
      user,
      interactions
    } = this.props

    const isAddOfferWithInteractionPermission = checkRight(user, 'CC:AddOfferWithInteractionPermission')
    const isAddOfferPermission = checkRight(user, 'CC:AddOfferPermission')
    const isTariffManagement = checkRight(user, 'CC:TariffManagement')
    const isReasonsCategories = Object.keys(interactions).length !== 0

    const isAutoConnectAllowed = !isLoadingDeleteOffer &&
                                !isLoadingHandleAutoConnectOffer &&
                                (isAddOfferPermission || (isAddOfferWithInteractionPermission && isReasonsCategories)) &&
                                isTariffManagement

    if (isAutoConnectAllowed) {
      const {
        personalAccount: {
          SubscriberFullInfo,
          ClientId,
          BillingBranchId,
          Msisdn,
          SubscriberId
        }
      } = personalAccountState
      const {
        SubscriberTypeId,
        SubscriberStatusId
      } = SubscriberFullInfo?.SubscriberInfo ?? {}

      const {
        Name,
        RateIdSpecified,
        ServIdList,
        IsConstructor,
        RateId,
        Id
      } = record

      const params = {
        HandlingId: handlingId,
        Msisdn,
        ClientId,
        ClientBranchId: BillingBranchId,
        SubscriberId,
        SubscriberBranchId: BillingBranchId,
        SubscriberTypeId,
        SubscriberStatusId: SubscriberStatusId,
        RateId,
        RateName: Name,
        RateIdSpecified,
        ServIdList,
        IsConstructor,
        OfferId: Id
      }
      this.showModal(params)
    }
  }

  showModal = params => {
    const { handleAutoConnectOffer } = this.props
    const { confirm } = Modal
    confirm({
      title: 'Автоподключение услуги',
      content: 'Вы уверены что хотите подключить услугу, предложение нельзя будет удалить.',
      onOk () {
        handleAutoConnectOffer(params)
      }
    })
  }

  columns = [
    {
      title: 'Предложения',
      dataIndex: 'Name',
      width: '34%',
      align: 'left',
      render: (text, record) =>
        <Popover placement='right' content={<ContentPopover>{record.Description}</ContentPopover>}>{text}</Popover>
    },
    {
      title: 'Отклик',
      dataIndex: 'ResponseTypeId',
      width: '27%',
      align: 'center',
      render: (value, record) => (
        <div>
          {value === RESPONSE_TYPE_ID.ASIDE
            ? <Icon as={ShoppingCartOutlined} isActive isBlock={this.props.isDelayedHandling} />
            : <>
              <GoodWrapper
                isBlock={record.Autoconnected || this.props.isDelayedHandling}
                isActive={value === RESPONSE_TYPE_ID.SUCCESS}
                onClick={() => !record.Autoconnected && !this.props.isDelayedHandling &&
                  this.props.changeOffer({ OfferId: record.Id, ResponseTypeId: 1, Sms: !!((record.SmsText !== '') && !this.props.personalAccountState.personalAccount.AdvertisingAgreement) })}
              />
              <BadWrapper
                isBlock={record.Autoconnected || this.props.isDelayedHandling}
                isActive={value === RESPONSE_TYPE_ID.ERROR}
                onClick={() => !record.Autoconnected && !this.props.isDelayedHandling &&
                  this.props.changeOffer({ OfferId: record.Id, ResponseTypeId: 2, Sms: false })}
              />
            </>
          }
        </div>
      )
    },
    {
      title: 'SMS',
      dataIndex: 'SMS',
      width: '13%',
      align: 'center',
      render: (value, record) => (
        <CheckWrapper
          isBlock={this.props.isDelayedHandling}
          isActive={value}
          isVisible={record.ResponseTypeId !== RESPONSE_TYPE_ID.ERROR && record.SmsText !== ''}
          onClick={() => !this.props.isDelayedHandling && this.props.changeOffer({ OfferId: record.Id, Sms: !value })}
        />
      )
    },
    {
      title: 'Автоподкл.',
      dataIndex: 'IsAutoconnect',
      width: '20%',
      align: 'center',
      render: (value, record) => (
        <CheckWrapper
          isBlock={this.props.isDelayedHandling}
          isActive={record.Autoconnected}
          isVisible={value && record.ResponseTypeId === RESPONSE_TYPE_ID.SUCCESS}
          onClick={() => !this.props.isDelayedHandling && !record.Autoconnected && this.handleAutoConnect(record)}
        />
      )
    },
    {
      align: 'center',
      render: (_, record) => (
        <StopIcon
          isBlock={record.Autoconnected || this.props.isDelayedHandling}
          onClick={() => !this.props.isDelayedHandling && !record.Autoconnected && this.handleDeleteOffer({ OfferId: record.Id })}
        />
      )
    }
  ]

  rowClassName = (record) => record.Autoconnected ? 'block' : ''

  render () {
    const { offers } = this.props
    const registeredOffers = offers?.registeredOffers?.OffersList ?? []

    return (
      <Wrapper>
        <Styletable
          dataSource={registeredOffers}
          columns={this.columns}
          pagination={false}
          size='middle'
          scroll={{ y: 250 }} // eslint-disable-line
          rowClassName={this.rowClassName}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  height: 32%;
`

const Styletable = styled(Table)`
  .ant-table-row.block.ant-table-row-level-0 {
    background: #FFF1F0;
    &:hover td {
      background: #fce7e6;
    }
  }
`
const Icon = styled.div`
  cursor: ${props => props.isBlock ? 'not-allowed' : 'pointer'};
  margin-right: 10px;
  font-size: 24px;
  opacity: ${props => props.isBlock ? 0.5 : 1};

  path {
    fill: ${props => props.isActive ? '#40BFEE' : '#7F8285'};
  }
  
  &:hover path {
    transition: all 0.3s ease-out;
    fill: ${({ isBlock }) => isBlock ? '#7F8285' : '#40BFEE'};
  }
`
const GoodWrapper = styled(Good)`
  cursor: ${props => props.isBlock ? 'not-allowed' : 'pointer'};
  margin-right: 10px;
  opacity: ${props => props.isBlock ? 0.5 : 1};

  path {
    fill: ${props => props.isActive ? '#52C41A' : '#7F8285'};
  }

  &:hover path {
    transition: all 0.3s ease-out;
    fill: ${({ isBlock }) => isBlock ? '#7F8285' : '#52C41A'};
  }
`

const BadWrapper = styled(Bad)`
  cursor: ${props => props.isBlock ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.isBlock ? 0.5 : 1};

  path {
    fill: ${props => props.isActive ? '#F22735' : '#7F8285'};
  }

  &:hover path {
    transition: all 0.3s ease-out;
    fill: ${props => props.isBlock ? '#7F8285' : '#F22735'};
  }
`

const CheckWrapper = styled(Check)`
  cursor: ${props => props.isBlock ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.isBlock ? 0.5 : 1};
  display: ${props => props.isVisible ? 'inline' : 'none'};

  path {
    fill: ${props => props.isActive ? '#52C41A' : '#7F8285'};
  }
`

const ContentPopover = styled.div`
  max-width: 500px;
  text-align: justify;
`

const StopIcon = styled(StopOutlined)`
  cursor: ${props => props.isBlock ? 'not-allowed' : 'pointer'} !important;
  opacity: ${props => props.isBlock ? 0.5 : 1};
  & svg {
    width: 21px;
    height: 21px;
  }
`
