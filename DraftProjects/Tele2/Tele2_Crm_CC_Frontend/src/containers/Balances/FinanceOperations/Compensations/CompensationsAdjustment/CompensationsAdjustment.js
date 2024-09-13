import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { notification } from 'antd'
import moment from 'moment'

import Subscribers from './components/Subscribers'
import Payments from './components/Payments'
import Correction from './components/Correction/Correction'

const propTypes = {
  handling: PropTypes.object,
  personalAccount: PropTypes.object,
  adjustPayment: PropTypes.func,
  adjustmentPayment: PropTypes.object,

  invalidSubscriberInfo: PropTypes.object,
  validSubscriberInfo: PropTypes.object,
  invalidSubscriberBalance: PropTypes.array,
  validSubscriberBalance: PropTypes.array,

  fetchPaymentsList: PropTypes.func,
  clearPaymentsList: PropTypes.func,
  clearSubscribersCompensationsAdjustmentData: PropTypes.func,
  clearAdjustmentPayment: PropTypes.func
}

const CompensationsAdjustment = props => {
  const {
    handling,
    personalAccount,
    adjustPayment,
    adjustmentPayment,

    invalidSubscriberInfo,
    validSubscriberInfo,
    invalidSubscriberBalance,
    validSubscriberBalance,

    fetchPaymentsList,
    clearPaymentsList,
    clearSubscribersCompensationsAdjustmentData,
    clearAdjustmentPayment
  } = props

  const [invalidMsisdn, setInvalidMsisdn] = useState('')
  const [validMsisdn, setValidMsisdn] = useState('')
  const [currentPayment, setCurrentPayment] = useState(null)

  const selectPayment = useCallback(currentPayment => {
    if (currentPayment?.record?.IsBillingPeriod) {
      notification.warning({
        message: 'Корректировка платежа',
        description: 'Платеж учтен в текущем билинговом периоде, корректировка невозможна'
      })
    }
    setCurrentPayment(currentPayment)
  })

  const resetPayments = useCallback(() => {
    clearPaymentsList()
    setCurrentPayment(null)
  })

  const clearSubscribersData = useCallback(() => {
    setInvalidMsisdn('')

    clearSubscribersCompensationsAdjustmentData()
    clearAdjustmentPayment()
    resetPayments()
  })

  const handleFetchPayments = useCallback(() => {
    const { BillingBranchId, SubscriberId } = invalidSubscriberInfo

    const datePeriodStart = moment().subtract(1, 'month')
    const datePeriodFinish = moment()

    fetchPaymentsList({
      Msisdn: invalidMsisdn,
      RowCount: 10,
      branchId: BillingBranchId,
      subscriberId: SubscriberId,
      contractName: 1,
      dateFrom: datePeriodStart.format('YYYY-MM-DDTHH:mm:ss'),
      dateTo: datePeriodFinish.format('YYYY-MM-DDTHH:mm:ss')
    })
  })

  const handleAdjustPreview = useCallback(() => {
    const { CreateDate, Sum } = currentPayment?.record

    adjustPayment({
      MsisdnA: invalidMsisdn,
      MsisdnB: validMsisdn,
      Date: moment(CreateDate).format('YYYY-MM-DDTHH:mm:ss'),
      Sum,
      InfoModeOn: true,
      CompensationModeOff: true
    })
  })

  const handleAdjustPayment = useCallback(CompensationModeOff => {
    const {
      Msisdn,
      ClientId,
      SubscriberId,
      BillingBranchId: SubscriberBranchId,
      SubscriberFullInfo: {
        SubscriberClientInfo: { BillingBranchId: ClientBranchId },
        SubscriberInfo: { SubscriberTypeId, SubscriberStatusId }
      }
    } = personalAccount
    const { CreateDate, Sum } = currentPayment?.record

    adjustPayment({
      MsisdnA: invalidMsisdn,
      MsisdnB: validMsisdn,
      Date: moment(CreateDate).format('YYYY-MM-DDTHH:mm:ss'),
      Sum,
      InfoModeOn: false,
      CompensationModeOff,

      HandlingId: handling.Id,
      HandlingMsisdn: Msisdn,
      ClientId,
      ClientBranchId,
      SubscriberId,
      SubscriberBranchId,
      SubscriberTypeId,
      SubscriberStatusId
    })
  })

  useEffect(() => {
    const { Msisdn } = personalAccount
    setValidMsisdn(Msisdn)
  }, [])

  const isPaymentsAvailable = useMemo(() => {
    return validSubscriberInfo && invalidSubscriberInfo && validSubscriberBalance && invalidSubscriberBalance
  }, [validSubscriberInfo, invalidSubscriberInfo, validSubscriberBalance, invalidSubscriberBalance])

  return (
    <Fragment>
      <Subscribers
        invalidMsisdn={invalidMsisdn}
        validMsisdn={validMsisdn}
        setInvalidMsisdn={setInvalidMsisdn}
        setValidMsisdn={setValidMsisdn}
        clearSubscribersData={clearSubscribersData}
        handleFetchPayments={handleFetchPayments}
        resetPayments={resetPayments}
      />
      {isPaymentsAvailable && (
        <Payments
          msisdn={invalidMsisdn}
          currentPayment={currentPayment}
          selectPayment={selectPayment}
          handleAdjustPreview={handleAdjustPreview}
        />
      )}
      {adjustmentPayment && (
        <Correction adjustmentPayment={adjustmentPayment} handleAdjustPayment={handleAdjustPayment} />
      )}
    </Fragment>
  )
}

CompensationsAdjustment.propTypes = propTypes

export default CompensationsAdjustment
