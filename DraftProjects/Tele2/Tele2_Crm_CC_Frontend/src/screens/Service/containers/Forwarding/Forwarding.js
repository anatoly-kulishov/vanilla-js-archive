import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spin, Skeleton } from 'antd'

import LoadingSpinner from 'components/LoadingSpinner'
import ForwardingCard from './ForwardingCard'
import { checkRight } from 'utils/helpers'

class Forwarding extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    personalAccount: PropTypes.object,
    handlingId: PropTypes.string,
    hlr: PropTypes.object,
    isHlrLoading: PropTypes.bool,
    resetHlr: PropTypes.func,
    changeHlr: PropTypes.func,
    viewOnly: PropTypes.bool,
    forwardingRight: PropTypes.bool,
    fetchHlr: PropTypes.func
  }

  componentDidMount () {
    const {
      user,
      fetchHlr,
      hlr,
      personalAccount: { Msisdn: msisdn }
    } = this.props

    !hlr && !user.isASSeller && fetchHlr({ msisdn })
  }

  hlrTitles = ['Безусловная', 'По занятости', 'По неответу', 'По недоступности']
  hlrStatuses = [
    { label: 'Активна', value: 'Active' },
    { label: 'Неактивна', value: 'Inactive' },
    { label: 'ГПЯ', value: 'Voice' }
  ]
  hlrTime = ['5', '10', '15', '20', '25', '30']

  render () {
    const {
      user,
      hlr,
      isHlrLoading,
      changeHlr,
      personalAccount: {
        SubscriberFullInfo,
        ClientId: clientId,
        BillingBranchId: billingBranchId,
        Msisdn: msisdn,
        SubscriberId: subscriberId
      },
      handlingId
    } = this.props
    const { SubscriberTypeId: subscriberTypeId, SubscriberStatusId: subscriberStatusId } =
      SubscriberFullInfo?.SubscriberInfo ?? {}
    const { isASSeller: isWebSellerView } = user

    const isViewOnlyForwardingHlr = checkRight(user, 'Troubleshooting:ViewOnlyForwardingHlr')
    const isForwardingHlr = checkRight(user, 'Troubleshooting:ForwardingHlr')
    const isNoViewRights = isWebSellerView ? false : !isForwardingHlr && !isViewOnlyForwardingHlr

    const paramsForInteraction = {
      clientId,
      subscriberId,
      billingBranchId,
      subscriberTypeId,
      subscriberStatusId
    }

    const isCfuActive = hlr && (hlr[0].status === 'Active' || hlr[0].status === 'Voice')
    return (
      <StyledSpin spinning={isHlrLoading} indicator={<LoadingSpinner spin />}>
        {!isNoViewRights && (
          <CallForwardingPanelContent disabled={!isForwardingHlr}>
            {isHlrLoading ? (
              <StyledSkeleton />
            ) : (
              hlr &&
              hlr.map((item, index) => (
                <ForwardingCard
                  disabled={item.type !== 'CFU' && isCfuActive}
                  title={this.hlrTitles[index]}
                  statuses={this.hlrStatuses}
                  times={this.hlrTime}
                  handlingId={handlingId}
                  key={index}
                  changeHlr={changeHlr}
                  handlingMsisdn={msisdn}
                  isForwardingHlr={isForwardingHlr}
                  paramsForInteraction={paramsForInteraction}
                  isWebSellerView={isWebSellerView}
                  {...item}
                />
              ))
            )}
          </CallForwardingPanelContent>
        )}
      </StyledSpin>
    )
  }
}

export default Forwarding

const CallForwardingPanelContent = styled.div`
  border-top: 1px solid rgb(228, 228, 233);
  display: flex;
  justify-content: space-between;
  padding: 0px 6px;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  pointer-events: ${props => (props.disabled ? 'none' : 'unset')};
`

const StyledSkeleton = styled(Skeleton)`
  height: 200px;
`
const StyledSpin = styled(Spin)`
  font-size: 24px;
  margin-top: 20px;
`
