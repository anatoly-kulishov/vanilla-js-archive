import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ApprovePersonalDataCommon from 'webseller/common/personalData/components/ApprovePersonalData'
import { AgreementKey } from 'webseller/common/agreements/helpers'
import { changeStepDuplicateRfa } from '../reducer'
import { DuplicateRfaStep } from '../helpers'
import { selectPersonalDataDuplicateRfa } from '../selectors'

export default function ApprovePersonalData () {
  const personalData = useSelector(selectPersonalDataDuplicateRfa)

  const dispatch = useDispatch()

  const approvePersonalData = () => dispatch(changeStepDuplicateRfa(DuplicateRfaStep.SIGNING))
  const editPersonalData = () => dispatch(changeStepDuplicateRfa(DuplicateRfaStep.PERSONAL_DATA))

  return (
    <ApprovePersonalDataCommon
      isShowAgreements
      personalData={personalData}
      availableAgreementKeys={[
        AgreementKey.isAgreeUseSubscriberInfo,
        AgreementKey.isPersonalDataDelegation,
        AgreementKey.isRefuseSmsAdvertising,
        AgreementKey.isNotAcceptDs,
        AgreementKey.isNotTariffSms
      ]}
      approveData={approvePersonalData}
      editData={editPersonalData}
    />
  )
}
