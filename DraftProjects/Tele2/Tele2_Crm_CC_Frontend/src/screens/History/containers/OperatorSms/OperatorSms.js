/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Spin, Popconfirm, Button, Modal } from 'antd'

import OperatorSmsFilter from './OperatorSmsFilter'
import OperatorSmsGrid from './OperatorSmsGrid'
import OperatorSmsModalContent from './OperatorSmsModalContent'

import LoadingSpinner from 'components/LoadingSpinner'
import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState, dayStartTime, dayEndTime, smsStatusIdList } from '../../HistoryContext/constants'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { HISTORY_OPERATOR_SMS_MODAL } from 'constants/logModalNames'

const LoadIcon = <LoadingSpinner spin />

export default function OperatorSms ({
  smsHistoryState: { isSmsHistoryLoading, smsHistory },
  personalAccountState: { personalAccount, isPersonalAccountLoading },
  mnpMarkers,
  handlingId,
  queryParamsState: { queryParams },
  smsSending,
  fetchLteNumber,
  getSmsHistory,
  cancelSms
}) {
  OperatorSms.propTypes = {
    smsHistoryState: PropTypes.object,
    personalAccountState: PropTypes.object,
    mnpMarkers: PropTypes.object,
    handlingId: PropTypes.number,
    queryParamsState: PropTypes.object,
    smsSending: PropTypes.func,
    fetchLteNumber: PropTypes.func,
    getSmsHistory: PropTypes.func,
    cancelSms: PropTypes.func
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  const [smsRecord, setSmsRecord] = useState(null)
  const [isModalToggled, setIsModalToggled] = useState(false)

  const updateOperatorSms = () => {
    const { msisdn, datePeriodStart, datePeriodFinish, smsStatus } = filters

    if (personalAccount && smsSending) {
      const {
        Msisdn
      } = personalAccount
      const { Lte450 } = mnpMarkers ?? {}
      const historyMsisdn = Lte450 ? smsSending.lteNumber : msisdn || Msisdn

      getSmsHistory({
        msisdn: historyMsisdn,
        status: smsStatus === smsStatusIdList.all.value ? null : smsStatus,
        startDate: moment
          .utc(datePeriodStart)
          .set(dayStartTime)
          .format(),
        endDate: moment
          .utc(datePeriodFinish)
          .set(dayEndTime)
          .format(),
        handlingId: handlingId
      })
    }
  }

  const handleFiltersClear = () => {
    const { msisdn } = queryParams
    const { smsShowBy, smsStatus, smsSource, datePeriodStart, datePeriodFinish } = initialHistoryState.filters
    updateHistoryFilterValue({
      msisdn,
      smsShowBy,
      smsStatus,
      smsSource,
      datePeriodStart,
      datePeriodFinish
    })
  }

  const onClickRemove = () => {
    updateHistoryFilterValue({
      msisdn: ''
    })
  }

  const openModal = record => {
    setSmsRecord(record)
    setIsModalToggled(true)
    logIfEnabled({ type: MODAL_OPEN, log: HISTORY_OPERATOR_SMS_MODAL })
  }

  const closeModal = () => {
    setIsModalToggled(false)
    setSmsRecord(null)
    logIfEnabled({ type: MODAL_CLOSE, log: HISTORY_OPERATOR_SMS_MODAL })
  }

  const onCancel = () => {
    cancelSms({
      MessageId: smsRecord.MessageId,
      CrmMessageId: null,
      Msisdn: filters.msisdn,
      HandlingID: smsRecord.HandlingId,
      TechType: 'SMS',
      TechID: smsRecord.MessageId
    })
    closeModal()
  }

  const checkMsisdnInFilter = () => {
    if (!filters.msisdn) {
      updateHistoryFilterValue({ msisdn: personalAccount.Msisdn })
    }
  }

  const checkLte450 = () => {
    const {
      ClientId: clientId,
      ClientCategory: clientCategory,
      BillingBranchId
    } = personalAccount
    const { Lte450 } = mnpMarkers ?? {}
    if (Lte450) {
      fetchLteNumber({
        clientId,
        branchId: BillingBranchId,
        msisdn: filters.msisdn || personalAccount.Msisdn,
        clientCategory
      })
    }
  }

  useEffect(() => {
    checkMsisdnInFilter()
    checkLte450()
  }, [])

  useEffect(() => {
    if (handlingId) {
      updateOperatorSms()
    }
  }, [handlingId])

  return (
    <Fragment>
      <FiltersWrapper>
        <OperatorSmsFilter
          filters={filters}
          onSubmit={updateOperatorSms}
          onClear={handleFiltersClear}
          onFilterChange={updateHistoryFilterValue}
          onClickRemove={onClickRemove}
        />
      </FiltersWrapper>
      <Spin indicator={LoadIcon} spinning={isPersonalAccountLoading || isSmsHistoryLoading}>
        <OperatorSmsGrid onOpenSms={openModal} history={smsHistory && smsHistory.ResponseModel} />
      </Spin>
      {smsRecord && (
        <StyledModal
          title={`${smsRecord.Msisdn} ${smsRecord.Status}`}
          visible={isModalToggled}
          onCancel={closeModal}
          footer={
            smsRecord.Cancel ? (
              <Popconfirm
                placement='top'
                title={'Отменить отправку SMS?'}
                onConfirm={onCancel}
                okText='Да'
                cancelText='Нет'
              >
                <Button type='primary'>Отменить отправку</Button>
              </Popconfirm>
            ) : null
          }
        >
          <OperatorSmsModalContent record={smsRecord} />
        </StyledModal>
      )}
    </Fragment>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 14px 24px 10px 24px;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-footer {
    text-align: center;
    font-family: T2HalvarBreit_ExtraBold;
  }
`
