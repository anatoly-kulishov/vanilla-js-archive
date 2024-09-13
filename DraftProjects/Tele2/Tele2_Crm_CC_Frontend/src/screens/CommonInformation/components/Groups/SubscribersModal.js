/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import get from 'lodash/get'

import { Modal, Spin } from 'antd'
import Filter from './Filter'
import Expand from './Expand'
import LoadingSpinner from 'components/LoadingSpinner'
import SubscribersTable from './SubscribersTable'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { GROUPS_SUBSCRIBERS_MODAL } from 'constants/logModalNames'

export default function SubscribersModal ({
  title,
  ratePlanId,
  isToggled,
  toggleModal,
  groupsSubscribers: {
    subscribersList,
    subscribersInfo,
    isSubscribersListLoading
  },
  handleFilterChange,
  subcribersActiveFilter,
  isDeleteGroupUser,
  deleteGroup,
  validateAutopayService,
  getUnpaidChargeDataAndShowAlert,
  processingParameters,
  paramsForDeleting
}) {
  SubscribersModal.propTypes = {
    title: PropTypes.string,
    isToggled: PropTypes.bool,
    toggleModal: PropTypes.func,
    groupsSubscribers: PropTypes.object,
    handleFilterChange: PropTypes.func,
    subcribersActiveFilter: PropTypes.number,
    ratePlanId: PropTypes.number,
    isDeleteGroupUser: PropTypes.bool,
    deleteGroup: PropTypes.func,
    validateAutopayService: PropTypes.func,
    getUnpaidChargeDataAndShowAlert: PropTypes.func,
    processingParameters: PropTypes.object,
    paramsForDeleting: PropTypes.object
  }

  const isSubscribersLoading = isSubscribersListLoading && !subscribersList && !subscribersInfo

  const handleCloseModal = () => {
    toggleModal(false)
    logIfEnabled({ type: MODAL_CLOSE, log: GROUPS_SUBSCRIBERS_MODAL })
  }

  useEffect(() => {
    if (isToggled) {
      logIfEnabled({ type: MODAL_OPEN, log: GROUPS_SUBSCRIBERS_MODAL })
    }
  }, [isToggled])

  return (
    <Wrapper
      width={900}
      title={title}
      visible={isToggled}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Spin spinning={isSubscribersLoading} indicator={<LoadingSpinner spin />}>
        <ExpandWrapper>
          <Expand groupInfo={subscribersInfo} />
        </ExpandWrapper>
        <Filter
          activeFilter={subcribersActiveFilter}
          isMainFilter={false}
          countAll={get(subscribersInfo, 'CountAll', null)}
          countCurrent={get(subscribersInfo, 'CountCurrent', null)}
          countOld={get(subscribersInfo, 'CountOld', null)}
          countPreliminare={get(subscribersInfo, 'CountPreliminare', null)}
          handleFilterChange={handleFilterChange}
        />
        <SubscribersTable
          isDeleteGroupUser={isDeleteGroupUser}
          ratePlanId={ratePlanId}
          list={subscribersList}
          productCode={get(subscribersInfo, 'ProductCode', null)}
          groupId={get(subscribersInfo, 'GroupId', null)}
          deleteGroup={deleteGroup}
          validateAutopayService={validateAutopayService}
          getUnpaidChargeDataAndShowAlert={getUnpaidChargeDataAndShowAlert}
          processingParameters={processingParameters}
          paramsForDeleting={paramsForDeleting}
        />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled(Modal)`
  .ant-modal-header {
    padding: 14px 24px 10px 14px;
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
    padding: 0;
  }
`

const ExpandWrapper = styled.div`
  padding: 8px 16px;
`
