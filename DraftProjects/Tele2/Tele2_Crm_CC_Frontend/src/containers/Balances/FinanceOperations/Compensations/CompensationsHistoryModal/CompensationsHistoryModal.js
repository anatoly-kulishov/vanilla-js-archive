/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useMemo, useEffect, useState, useCallback } from 'react'
import PropTypes, { func } from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Modal, Tabs, Button } from 'antd'
import { isNull } from 'lodash'

import { logIfEnabled } from 'utils/helpers/logger'
import { checkRight } from 'utils/helpers'
import {
  ContractName,
  historyModalWidth,
  datePickerMonthLimit,
  datePickerYearLimit,
  compensationsMethods,
  compenstationsForms
} from 'constants/compensations'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { COMPENSATIONS_HISTORY_MODAL } from 'constants/logModalNames'
import promoAction from 'constants/promo/promoActions'
import autoInteractionPropType from 'constants/propTypes/autoInteractionPropType'
import { EnrollmentHistoryTable } from './EnrollmentHistoryTable'
import RangePicker from 'components/RangePicker'
import { MIN_TABLE_ROWS_LIMIT } from 'screens/Finance/constants/limiter'
import payTypeId from 'screens/Finance/constants/payTypeIdEnum'
import { dateWithUtc } from 'screens/Finance/helpers/format'

import { dayStartTime, dayEndTime } from 'constants/dateTime/day'

import notifyCodes from '../constants/notifyCodes'

import PromoHistoryTable from './PromoHistoryTable'
import PackageHistoryTable from './PackageHistoryTable'
import RatingMenu from 'containers/RatingMenu'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
const { compensationsHistoryModalId } = ratingFeatureIds

const { TabPane } = Tabs

const CompensationsHistoryModal = ({
  changeCompensationsHistoryModalVisibility,
  validatePaydServiceHistory,
  fetchPaymentsHistory,
  fetchPaymentCompensationHistory,
  personalAccount: { SubscriberId: subscriberId, BillingBranchId: branchId, Msisdn: msisdn, BaseFunctionalParams },
  isCompensationsHistoryModalVisible,
  paydServiceHistory,
  paymentsHistory,
  currentCompensationMethod,
  paydService,
  isPaymentsHistoryLoading,
  user,
  notifyPromo,
  activatePromo,
  autoInteractionData,
  promoHistory,
  cancelPromocodeCompensation
}) => {
  CompensationsHistoryModal.propTypes = {
    isCompensationsHistoryModalVisible: PropTypes.bool,
    changeCompensationsHistoryModalVisibility: PropTypes.func,
    validatePaydServiceHistory: PropTypes.func,
    fetchPaymentsHistory: PropTypes.func,
    fetchPaymentCompensationHistory: func,
    personalAccount: PropTypes.object,
    paydServiceHistory: PropTypes.arrayOf(),
    paymentsHistory: PropTypes.arrayOf(),
    promoHistory: PropTypes.arrayOf(),
    currentCompensationMethod: PropTypes.string,
    paydService: PropTypes.object,
    isPaymentsHistoryLoading: PropTypes.bool,
    user: PropTypes.object,
    notifyPromo: func,
    activatePromo: func,
    autoInteractionData: autoInteractionPropType,
    cancelPromocodeCompensation: func
  }

  const [datePeriodStart, setDatePeriodStart] = useState(moment.utc().startOf('month'))
  const [datePeriodFinish, setDatePeriodFinish] = useState(moment.utc().set(dayEndTime))
  const [activeTab, setActiveTab] = useState(null)
  const enrollmentsDataSource = isNull(paymentsHistory) ? [] : paymentsHistory

  useEffect(() => {
    if (isCompensationsHistoryModalVisible) {
      if (currentCompensationMethod === compensationsMethods.adjustment) {
        onChangeTab(compensationsMethods.promocode)
      } else {
        onChangeTab(currentCompensationMethod)
      }
      logIfEnabled({ type: MODAL_OPEN, log: COMPENSATIONS_HISTORY_MODAL })
    }
  }, [isCompensationsHistoryModalVisible])

  useEffect(() => {
    const isAllowRequest =
      !paydService.isLoading && isCompensationsHistoryModalVisible && activeTab === compensationsMethods.enrollment
    if (isAllowRequest) {
      fetchEnrollmentPaymentHistory()
    }
  }, [paydService.isLoading])

  useEffect(() => {
    if (activeTab === compensationsMethods.package) {
      validatePaydServiceHistory({ branchId, subscriberId, msisdn })
    }
    if (activeTab === compensationsMethods.enrollment) {
      fetchEnrollmentPaymentHistory()
    }
    if (activeTab === compensationsMethods.promocode) {
      fetchPaymentCompensationHistory({
        SubscriberId: subscriberId,
        SubscriberBranchId: branchId,
        FromDate: dateWithUtc(datePeriodStart),
        ToDate: dateWithUtc(datePeriodFinish),
        CompensationFormId: compenstationsForms.promocode,
        IsActualOnly: false
      })
    }
  }, [activeTab])

  const fetchEnrollmentPaymentHistory = () => {
    fetchPaymentsHistory({
      BranchId: branchId,
      SubscriberId: subscriberId,
      DateFrom: dateWithUtc(datePeriodStart),
      DateTo: dateWithUtc(datePeriodFinish),
      ContractName,
      PayTypeId: isT2Customer ? payTypeId.COMPENSATION : undefined,
      RowCount: MIN_TABLE_ROWS_LIMIT
    })
  }

  const handleCloseModal = () => {
    changeCompensationsHistoryModalVisibility()
    logIfEnabled({ type: MODAL_CLOSE, log: COMPENSATIONS_HISTORY_MODAL })
  }

  const searchHandle = () => {
    if (activeTab === compensationsMethods.promocode) {
      fetchPaymentCompensationHistory({
        SubscriberId: subscriberId,
        SubscriberBranchId: branchId,
        FromDate: dateWithUtc(datePeriodStart),
        ToDate: dateWithUtc(datePeriodFinish),
        CompensationFormId: compenstationsForms.promocode,
        IsActualOnly: false
      })
    } else if (activeTab === compensationsMethods.enrollment) {
      fetchEnrollmentPaymentHistory()
    }
  }

  const onChangeTab = tab => {
    if (tab === compensationsMethods.package || tab === compensationsMethods.enrollment) {
      setDatePeriodStart(moment.utc().set('date', 1).set(dayStartTime))
      setDatePeriodFinish(moment.utc().set(dayEndTime))
    }
    if (tab === compensationsMethods.promocode) {
      setDatePeriodStart(moment.utc().subtract(6, 'months'))
      setDatePeriodFinish(moment.utc().set(dayEndTime))
    }
    setActiveTab(tab)
  }

  const isDisabledDate = activeTab === compensationsMethods.package

  const dateLimit = activeTab === compensationsMethods.promocode ? datePickerYearLimit : datePickerMonthLimit

  const { AppMode } = BaseFunctionalParams ?? {}
  const isT2Customer = AppMode === 'T2Customer'

  const promoRights = useMemo(() => {
    return {
      isActivateRight: checkRight(user, 'CC:ActivatePromoCode'),
      isCancelRight: checkRight(user, 'CC:CancelPromoCode'),
      isAllCancelRight: checkRight(user, 'CC:CancelAllPromoCode'),
      isNotificationRight: checkRight(user, 'CC:NotificationPromoCode'),
      isPaydCompCancelAll: checkRight(user, 'CC:PaydCompCancelAll')
    }
  }, [user])

  const handlePromo = useCallback(
    (action, promo) => {
      const { PromocodeValue: promocodeValue, PaydHistoryId: paydHistoryId, PromocodeId: promocodeId } = promo

      switch (action) {
        case promoAction.activate:
          activatePromo({
            msisdn,
            promocodeValue,
            ...autoInteractionData
          })
          break
        case promoAction.cancel:
          cancelPromocodeCompensation({
            paydHistoryId,
            msisdn,
            promocodeId,
            promocodeValue,
            ...autoInteractionData,
            historyRerequestData: {
              SubscriberId: subscriberId,
              SubscriberBranchId: branchId,
              FromDate: dateWithUtc(datePeriodStart),
              ToDate: dateWithUtc(datePeriodFinish),
              CompensationFormId: 3,
              IsActualOnly: false
            }
          })
          break
        case promoAction.notify:
          notifyPromo({
            msisdn,
            promocodeId,
            notifyCode: notifyCodes.okSms,
            ...autoInteractionData
          })
      }
    },
    [msisdn, autoInteractionData, activatePromo, cancelPromocodeCompensation, notifyPromo]
  )

  return (
    <StyledModal
      destroyOnClose
      title={<ModalTitle>История компенсаций</ModalTitle>}
      onCancel={handleCloseModal}
      width={historyModalWidth}
      visible={isCompensationsHistoryModalVisible}
      footer={null}
    >
      <RatingWrapper>
        <RatingMenu currentFeatureId={compensationsHistoryModalId} />
      </RatingWrapper>
      <WrapperFilter>
        <StyledRangerPicker
          limitMonth={dateLimit}
          isMonthOnly={isDisabledDate}
          isDisablePrevChangeButton={isDisabledDate}
          onChange={({ to, from }) => {
            setDatePeriodStart(from.set(dayEndTime))
            setDatePeriodFinish(to)
          }}
          value={{ from: datePeriodStart, to: datePeriodFinish }}
        />
        <Button disabled={isDisabledDate} type='primary' onClick={() => searchHandle()}>
          Найти
        </Button>
      </WrapperFilter>
      <StyledTabs onChange={onChangeTab} type='card' defaultActiveKey={activeTab}>
        <TabPane key={compensationsMethods.package} tab='Пакеты'>
          <PackageHistoryTable paydServiceHistory={paydServiceHistory} />
        </TabPane>
        <TabPane key={compensationsMethods.enrollment} tab='Зачисления'>
          <EnrollmentHistoryTable
            paymentsHistory={enrollmentsDataSource}
            isEnrollments
            isLoading={isPaymentsHistoryLoading || paydService.isLoading}
          />
        </TabPane>
        <TabPane key={compensationsMethods.promocode} tab='Промокоды'>
          <PromoHistoryTable
            promoRights={promoRights}
            handlePromo={handlePromo}
            promoHistory={promoHistory}
            isLoading={false}
          />
        </TabPane>
      </StyledTabs>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 24px 15px;
  }
`
const ModalTitle = styled.div`
  font-weight: bold;
`
const StyledRangerPicker = styled(RangePicker)`
  width: 500px;
`
const StyledTabs = styled(Tabs)`
  margin-top: 30px;
`
const RatingWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 56px;
  padding: 17px 10px;
`
const WrapperFilter = styled.div`
  display: flex;
  justify-content: space-between;
`

export default CompensationsHistoryModal
