import React from 'react'

import InformClient from 'webseller/features/terminationClient/components/InformClient'
import OperationParams from 'webseller/features/terminationClient/components/OperationParams'
import Signing from 'webseller/features/terminationClient/components/Signing'
import Result from 'webseller/features/terminationClient/components/Result'
import OnlineVerification from 'webseller/features/terminationClient/components/OnlineVerification'

export const TerminationClientStep = {
  NONE: 'NONE',
  INFORM_CLIENT: 'INFORM_CLIENT',
  OPERATION_PARAMS: 'OPERATION_PARAMS',
  SIGNING: 'SIGNING',
  ONLINE_VERIFICATION: 'ONLINE_VERIFICATION',
  RESULT: 'RESULT'
}

const stepsMap = {
  [TerminationClientStep.INFORM_CLIENT]: {
    key: TerminationClientStep.INFORM_CLIENT,
    title: 'Проинформируй абонента',
    render: () => <InformClient />
  },
  [TerminationClientStep.OPERATION_PARAMS]: {
    key: TerminationClientStep.OPERATION_PARAMS,
    title: 'Параметры расторжения',
    render: () => <OperationParams />
  },
  [TerminationClientStep.SIGNING]: {
    key: TerminationClientStep.SIGNING,
    title: 'Печать документов',
    render: () => <Signing />
  },
  [TerminationClientStep.ONLINE_VERIFICATION]: {
    key: TerminationClientStep.ONLINE_VERIFICATION,
    title: 'Проверь наличие активной SIM',
    render: () => <OnlineVerification />
  },
  [TerminationClientStep.RESULT]: {
    key: TerminationClientStep.RESULT,
    title: 'Результат',
    render: () => <Result />
  }
}

const stepsOffline = [
  stepsMap[TerminationClientStep.INFORM_CLIENT],
  stepsMap[TerminationClientStep.OPERATION_PARAMS],
  stepsMap[TerminationClientStep.SIGNING],
  stepsMap[TerminationClientStep.RESULT]
]

const stepsOnline = [
  stepsMap[TerminationClientStep.INFORM_CLIENT],
  stepsMap[TerminationClientStep.OPERATION_PARAMS],
  stepsMap[TerminationClientStep.SIGNING],
  stepsMap[TerminationClientStep.RESULT]
]

export const getStepsTerminationClient = (type) => {
  switch (type) {
    case TerminationClientType.ONLINE: {
      return stepsOnline
    }

    case TerminationClientType.OFFLINE:
    default: {
      return stepsOffline
    }
  }
}

export const TerminationClientType = {
  NONE: 'NONE',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const OperationParamsFormFields = {
  SIGNATORY: 'signatory',
  BENEFICIARY: 'beneficiary',
  BENEFICIARY_PERSONAL_DATA: 'beneficiaryPersonalData',
  BALANCE_TRANSFER: 'balanceTransfer',
  BANK_BALANCE_TRANSFER_INFO: 'bankBalanceTransferInfo',
  NUMBER_BALANCE_TRANSFER_INFO: 'numberBalanceTransferInfo',
  CONTACT_NUMBER: 'contactNumber',
  CONTACT_EMAIL: 'contactEmail'
}

export const NumberBalanceTransferInfoFormFields = {
  NAME: 'name',
  NUMBER: 'number'
}

export const BankBalanceTransferInfoFormFields = {
  BANK_NAME: 'bankName',
  KPP: 'kpp',
  INN: 'inn',
  BIK: 'bik',
  RS: 'rs',
  ACCOUNT: 'account',
  CLIENT_NAME: 'clientName'
}

export const SignatoryParam = {
  CLIENT: 'CLIENT',
  CLIENT_REPRESENTATIVE: 'CLIENT_REPRESENTATIVE'
}

export const BeneficiaryParam = {
  SELF_INTEREST: 'SELF_INTEREST',
  BENEFICIARY_INTEREST: 'BENEFICIARY_INTEREST'
}

export const BalanceTransferParam = {
  NUMBER: 'NUMBER',
  BANK_ACCOUNT: 'BANK_ACCOUNT',
  WITHOUT_TRANSFER: 'WITHOUT_TRANSFER'
}
