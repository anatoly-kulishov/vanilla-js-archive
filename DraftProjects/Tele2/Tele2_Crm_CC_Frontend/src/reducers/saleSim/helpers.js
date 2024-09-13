import { SALLING_PROCESS_STEPS, SallingProcessTypes } from 'webseller/features/saleSim/helpers'

export const getNextStepAfterSaleSim = (sallingProcessType) => {
  const isMnpOrder = sallingProcessType === SallingProcessTypes.MNP_ORDER
  return isMnpOrder ? SALLING_PROCESS_STEPS.TRANSFER_TIME : SALLING_PROCESS_STEPS.DOCUMENT_DATA
}
