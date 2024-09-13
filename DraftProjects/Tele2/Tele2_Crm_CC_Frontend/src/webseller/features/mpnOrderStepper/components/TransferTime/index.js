import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TransferTimeStep from 'webseller/common/transferTimeStep'

import { selectMpnOrderTransferNumberOld } from '../../selectors'
import { MNP_ORDER_PROCESS_STEPS } from '../../constants'
import { setMnpOrderProcessStep } from '../../actions'

export default function TransferTime () {
  const dispatch = useDispatch()

  const transferNumberOld = useSelector(selectMpnOrderTransferNumberOld)
  const goBack = () => dispatch(setMnpOrderProcessStep(MNP_ORDER_PROCESS_STEPS.TRANSFER_NUMBER))
  const goForward = () => dispatch(setMnpOrderProcessStep(MNP_ORDER_PROCESS_STEPS.DOCUMENT_DATA))

  return (
    <TransferTimeStep
      transferNumberOld={transferNumberOld}
      toNextStep={goForward}
      toPrevStep={goBack}
    />
  )
}
