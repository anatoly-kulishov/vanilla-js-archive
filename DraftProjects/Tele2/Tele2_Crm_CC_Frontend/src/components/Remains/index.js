/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { DetailsData } from './DetailsData'
import { SubscriberServices } from './SubscriberServices'
import { QuantumData } from './QuantrumData'
import { connect } from 'react-redux'
import { MixxBalance } from './MixxBalance'

const Remains = props => {
  const {
    detailsData,
    isDetailsDataSuccess,
    detailsDataMessage,
    isDateilsDataLoading,

    subscriberServices,
    isSubscriberServicesSuccess,
    subscriberServicesMessage,
    isSubscriberServicesLoading,

    quantumData,
    isQuantumDataSuccess,
    quantumDataMessage,

    mixxBalance,
    isMixxBalanceSuccess,
    mixxBalanceMessage,
    isMixxBalanceLoading,

    personalAccount: {
      BaseFunctionalParams: { AppMode }
    }
  } = props

  const isMixxCustomer = AppMode === 'MixxCustomer'

  return (
    <Wrapper>
      {isDateilsDataLoading && detailsData ? (
        <Spin indicator={loadingIcon} />
      ) : (
        <DetailsData
          detailsData={detailsData}
          isDetailsDataSuccess={isDetailsDataSuccess}
          detailsDataMessage={detailsDataMessage}
        />
      )}
      {isSubscriberServicesLoading && !isDateilsDataLoading && subscriberServices ? (
        <Spin indicator={loadingIcon} />
      ) : (
        <SubscriberServices
          subscriberServices={subscriberServices}
          isSubscriberServicesSuccess={isSubscriberServicesSuccess}
          subscriberServicesMessage={subscriberServicesMessage}
        />
      )}
      <QuantumData
        quantumData={quantumData}
        isQuantumDataSuccess={isQuantumDataSuccess}
        quantumDataMessage={quantumDataMessage}
        subscriberServices={subscriberServices}
        isSubscriberServicesSuccess={isSubscriberServicesSuccess}
        detailsData={detailsData}
        isDetailsDataSuccess={isDetailsDataSuccess}
      />

      {isMixxCustomer && (
        <Spin indicator={loadingIcon} spinning={isMixxBalanceLoading}>
          <MixxBalance
            mixxBalance={mixxBalance}
            isMixxBalanceSuccess={isMixxBalanceSuccess}
            mixxBalanceMessage={mixxBalanceMessage}
          />
        </Spin>
      )}
    </Wrapper>
  )
}
// TODO refactor into container
const mapStateToProps = state => ({
  ...state.finance.remains,
  ...state.personalInfo.personalAccountState
})

export default connect(mapStateToProps, null)(Remains)

Remains.propTypes = {
  detailsData: PropTypes.object,
  isDetailsDataSuccess: PropTypes.bool,
  detailsDataMessage: PropTypes.string,
  isDateilsDataLoading: PropTypes.bool,
  subscriberServices: PropTypes.object,
  isSubscriberServicesSuccess: PropTypes.bool,
  subscriberServicesMessage: PropTypes.string,
  isSubscriberServicesLoading: PropTypes.bool,
  quantumData: PropTypes.object,
  isQuantumDataSuccess: PropTypes.bool,
  quantumDataMessage: PropTypes.string,
  mixxBalance: PropTypes.number,
  isMixxBalanceSuccess: PropTypes.bool,
  mixxBalanceMessage: PropTypes.string,
  isMixxBalanceLoading: PropTypes.bool,
  personalAccount: PropTypes.object
}

const Wrapper = styled.div`
  padding: 17px 22px 17px 13px;
`
const loadingIcon = <LoadingOutlined style={{ fontSize: 24, textAlign: 'center' }} spin />
