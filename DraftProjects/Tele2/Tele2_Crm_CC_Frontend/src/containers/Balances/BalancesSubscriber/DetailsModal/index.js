/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Modal } from 'antd'
import DetailsContent from './DetailsContent'
import { checkRight } from 'utils/helpers'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { DETAILS_MODAL } from 'constants/logModalNames'

import {
  deactivateCreditInfo,
  activateCreditInfo
} from 'reducers/finance/balanceReducer'

const mapStateToProps = state => ({
  ...state.finance,
  ...state.internal.userState,
  ...state.personalInfo.personalAccountState,
  handlingId: state.internal.handlingState.Id,
  balance: state.finance.balance
})

const mapDispatchToProps = {
  deactivateCreditInfo,
  activateCreditInfo
}

function DetailsModal ({
  isDetailsToggled,
  handleDetailsModalOpen,
  deactivateCreditInfo,
  activateCreditInfo,
  personalAccount,
  handlingId,
  user,
  balance: {
    isTrustCreditInfoError,
    isTrustCreditInfoLoading,
    trustCreditInfoMessage,
    trustCreditInfo
  }
}) {
  DetailsModal.propTypes = {
    isDetailsToggled: PropTypes.bool,
    handleDetailsModalOpen: PropTypes.func,
    personalAccount: PropTypes.object,
    trustCreditInfo: PropTypes.object,
    trustCreditInfoMessage: PropTypes.string,
    isTrustCreditInfoError: PropTypes.bool,
    isTrustCreditInfoLoading: PropTypes.bool,
    deactivateCreditInfo: PropTypes.func,
    activateCreditInfo: PropTypes.func,
    handlingId: PropTypes.number,
    user: PropTypes.object,
    balance: PropTypes.object
  }

  const isTrustCreditAction = handlingId && checkRight(user, 'CC:TrustCreditAction')

  useEffect(() => {
    if (isDetailsToggled) {
      logIfEnabled({ type: MODAL_OPEN, log: DETAILS_MODAL })
    }
  }, [isDetailsToggled])

  const onClose = () => {
    handleDetailsModalOpen()
    logIfEnabled({ type: MODAL_CLOSE, log: DETAILS_MODAL })
  }

  return (
    <DetailsStyledModal
      title='Детализация'
      visible={isDetailsToggled}
      width={700}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
    >
      <DetailsContent
        personalAccount={personalAccount}
        handlingId={handlingId}
        trustCreditInfo={trustCreditInfo}
        isTrustCreditInfoError={isTrustCreditInfoError}
        isTrustCreditInfoLoading={isTrustCreditInfoLoading}
        deactivateCreditInfo={deactivateCreditInfo}
        activateCreditInfo={activateCreditInfo}
        trustCreditInfoMessage={trustCreditInfoMessage}
        isTrustCreditAction={isTrustCreditAction}
      />
    </DetailsStyledModal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal)

const DetailsStyledModal = styled(Modal)`
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-body {
    padding: 0;
  }
`
