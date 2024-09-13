import React, { useCallback, useEffect } from 'react'
import { Modal } from 'antd'
import { array, bool, func, number, object } from 'prop-types'
import styled from 'styled-components'

import PersonBlock from '../PersonBlock'
import CustomersTable from './components/CustomersTable'

import { PersonalAccountShape } from 'constants/personalAccount'
import { wsStatus } from 'constants/wsStatus'
import { markerTypes } from 'constants/markerTypes'

const propTypes = {
  isVisible: bool,
  handleVisiblePersonModal: func,
  customerScenarioHistory: array,
  isCustomerScenarioHistoryLoading: bool,
  createScenario: func,
  personalAccount: PersonalAccountShape,
  connectCustomerSegmentsWs: func,
  personId: number,
  customerSegments: object,
  customerSegmentsWsStatus: number,
  handlingId: number,
  disconnectCustomerSegmentsWs: func,
  customerSegmentsPreview: object,
  getCustomerScenarioHistory: func,
  isLoading: bool
}

const PersonModal = props => {
  const {
    isVisible,
    handleVisiblePersonModal,
    customerScenarioHistory,
    isCustomerScenarioHistoryLoading,
    createScenario,
    personalAccount,
    connectCustomerSegmentsWs,
    personId,
    customerSegments,
    customerSegmentsWsStatus,
    handlingId,
    disconnectCustomerSegmentsWs,
    customerSegmentsPreview,
    getCustomerScenarioHistory,
    isLoading
  } = props

  const { CustomerSegments } = customerSegments ?? {}
  const { CustomerCount } = customerSegmentsPreview ?? {}
  const { Msisdn } = personalAccount ?? {}

  useEffect(() => {
    return disconnectCustomerSegmentsWs
  }, [])

  useEffect(() => {
    if (isVisible && customerSegmentsWsStatus !== wsStatus.open) {
      if (personId && handlingId && Msisdn) {
        const params = { customerId: personId, handlingId, msisdn: Msisdn }
        connectCustomerSegmentsWs(params)
      }
    }
  }, [isVisible, personId, handlingId, Msisdn])

  useEffect(() => {
    if (isVisible && personId) {
      getCustomerScenarioHistory(personId)
    }
  }, [isVisible, personId])

  const handleCloseModal = useCallback(() => {
    disconnectCustomerSegmentsWs()
    handleVisiblePersonModal()
  }, [])

  const handleClickMarker = useCallback(
    ({ record, marker = {}, markerType }) => {
      const { CustomerId, Msisdn, SubscriberId, BranchId, Upsale } = record
      const { Link, IsLinkedHandling, Value } = marker

      let data = {
        ScenarioName: markerType,
        Link,
        CustomerId,
        ClickMsisdn: Msisdn,
        SubscriberId,
        BranchId,
        Value: String(Value),
        IsLinkedHandling
      }

      switch (markerType) {
        case markerTypes.CLSUpgrade: {
          const { SubscriberId, Msisdn, BillingBranchId } = personalAccount
          data = {
            ...data,
            SubscriberId,
            ClickMsisdn: Msisdn,
            BranchId: BillingBranchId,
            CustomerId
          }
          break
        }
        case markerTypes.Upsale: {
          const { Value, Link, IsLinkedHandling } = Upsale
          const value = Value.map(item => item.OfferId).join(' ')
          data = { ...data, Value: value, Link, IsLinkedHandling }
          break
        }
      }

      createScenario(data)
    },
    [personalAccount]
  )

  let tableData
  if (CustomerSegments?.length) {
    tableData = CustomerSegments
  } else if (CustomerCount) {
    tableData = new Array(CustomerCount).fill({ isLoading: true })
  }

  const isTableDataLoading = customerSegmentsWsStatus === wsStatus.connecting || !CustomerCount

  return (
    <StyledModal
      footer={null}
      onCancel={handleCloseModal}
      visible={isVisible}
      title={
        <PersonBlock
          onClickMarker={handleClickMarker}
          record={customerSegmentsPreview}
          customersCount={CustomerCount}
          areMarkersClickable
          isLoading={isLoading}
        />
      }
      width={1600}
    >
      <CustomersTable
        tableData={tableData}
        customerScenarioHistory={customerScenarioHistory}
        isCustomerScenarioHistoryLoading={isCustomerScenarioHistoryLoading}
        onClickMarker={handleClickMarker}
        isLoading={isTableDataLoading}
      />
    </StyledModal>
  )
}

PersonModal.propTypes = propTypes

export default PersonModal

const StyledModal = styled(Modal)`
  top: 140px;

  .ant-modal-body {
    padding: 0px;
  }
`
