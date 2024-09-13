/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { changeVisibility } from 'reducers/services/serviceHistoryReducer'
import styled from 'styled-components'
import { Modal } from 'antd'
import ServiceHistory from './ServiceHistory'
import PropTypes from 'prop-types'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { SERVICE_HISTORY_MODAL } from 'constants/logModalNames'

const ServiceHistoryModal = ({
  serviceHistory,
  isServiceHistoryLoading,
  title,
  isVisible,
  changeVisibility
}) => {
  ServiceHistoryModal.propTypes = {
    serviceHistory: PropTypes.array,
    title: PropTypes.object,
    isVisible: PropTypes.bool,
    isServiceHistoryLoading: PropTypes.bool,
    changeVisibility: PropTypes.func
  }

  const handleCloseModal = () => {
    changeVisibility()
    logIfEnabled({ type: MODAL_CLOSE, log: SERVICE_HISTORY_MODAL })
  }

  useEffect(() => {
    if (isVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: SERVICE_HISTORY_MODAL })
    }
  }, [isVisible])

  return (
    <Fragment>
      <ServiceModal
        width={900}
        title={title}
        visible={isVisible}
        footer={null}
        onCancel={handleCloseModal}
      >
        <Wrapper>
          <ServiceHistory
            serviceHistory={serviceHistory}
            isServiceHistoryLoading={isServiceHistoryLoading}
          />
        </Wrapper>
      </ServiceModal>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    ...state.services.serviceHistory
  }
}

const mapDispatchToProps = {
  changeVisibility
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceHistoryModal)

const Wrapper = styled.div`
  background-color: #fff;
`
const ServiceModal = styled(Modal)`
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-body {
    padding: 0;
  }
`
