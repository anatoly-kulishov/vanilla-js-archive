import React from 'react'

import PartiesRelation from 'webseller/features/recreateClient/components/PartiesRelation'
import TransmittingParty from 'webseller/features/recreateClient/components/TransmittingParty'
import ReceivingParty from 'webseller/features/recreateClient/components/ReceivingParty'
import Agreements from 'webseller/features/recreateClient/components/Agreements'
import SubmitStep from 'webseller/features/recreateClient/components/SubmitStep'
import Signing from 'webseller/features/recreateClient/components/Signing'
import OnlineAvailabilityStep from 'webseller/features/recreateClient/components/OnlineAvailabilityStep'
import Result from 'webseller/features/recreateClient/components/Result'
import { getCurrStep, getNextStepType, getPrevStepType } from 'webseller/helpers/steps'

export const StepTypeRecreateClient = {
  NONE: 'NONE',
  PARTIES_RELATION: 'PARTIES_RELATION',
  TRANSMITTING_PARTY: 'TRANSMITTING_PARTY',
  RECEIVING_PARTY: 'RECEIVING_PARTY',
  ADDITIONAL_AGREEMENTS: 'ADDITIONAL_AGREEMENTS',
  SUBMIT: 'SUBMIT',
  DOCUMENTS: 'DOCUMENTS',
  ONLINE_AVAILABILITY: 'ONLINE_AVAILABILITY',
  RESULT: 'RESULT,'
}

export const RecreateClientType = {
  NONE: 'NONE',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const PartiesRelationType = {
  DEFAULT: 'DEFAULT',
  CURRENT_CLIENT_REPRESENTATIVE: 'CURRENT_CLIENT_REPRESENTATIVE',
  NEW_CLIENT_REPRESENTATIVE: 'NEW_CLIENT_REPRESENTATIVE'
}

const stepsMap = {
  [StepTypeRecreateClient.PARTIES_RELATION]: {
    key: StepTypeRecreateClient.PARTIES_RELATION,
    title: 'Выберите подписывающие стороны',
    render: () => <PartiesRelation />
  },
  [StepTypeRecreateClient.TRANSMITTING_PARTY]: {
    key: StepTypeRecreateClient.TRANSMITTING_PARTY,
    title: 'Проверка данных передающей стороны',
    render: () => <TransmittingParty />
  },
  [StepTypeRecreateClient.RECEIVING_PARTY]: {
    key: StepTypeRecreateClient.RECEIVING_PARTY,
    title: 'Ввод данных принимающей стороны',
    render: () => <ReceivingParty />
  },
  [StepTypeRecreateClient.ADDITIONAL_AGREEMENTS]: {
    key: StepTypeRecreateClient.ADDITIONAL_AGREEMENTS,
    title: 'Согласия',
    render: () => <Agreements />
  },
  [StepTypeRecreateClient.SUBMIT]: {
    key: StepTypeRecreateClient.SUBMIT,
    title: 'Подтверждение создания заявки на переоформление',
    render: () => <SubmitStep />
  },
  [StepTypeRecreateClient.DOCUMENTS]: {
    key: StepTypeRecreateClient.DOCUMENTS,
    title: 'Печать документов',
    render: () => <Signing />
  },
  [StepTypeRecreateClient.ONLINE_AVAILABILITY]: {
    key: StepTypeRecreateClient.ONLINE_AVAILABILITY,
    title: 'Проверка доступности онлайн переоформления',
    render: () => <OnlineAvailabilityStep />
  },
  [StepTypeRecreateClient.RESULT]: {
    key: StepTypeRecreateClient.RESULT,
    title: 'Результат',
    render: () => <Result />
  }
}

export const stepsRecreateClientOnline = [
  // stepsMap[StepTypeRecreateClient.PARTIES_RELATION],
  stepsMap[StepTypeRecreateClient.TRANSMITTING_PARTY],
  stepsMap[StepTypeRecreateClient.RECEIVING_PARTY],
  stepsMap[StepTypeRecreateClient.ADDITIONAL_AGREEMENTS],
  stepsMap[StepTypeRecreateClient.SUBMIT],
  stepsMap[StepTypeRecreateClient.DOCUMENTS],
  stepsMap[StepTypeRecreateClient.ONLINE_AVAILABILITY],
  stepsMap[StepTypeRecreateClient.RESULT]
]

export const stepsRecreateClientOffline = [
  // stepsMap[StepTypeRecreateClient.PARTIES_RELATION],
  stepsMap[StepTypeRecreateClient.TRANSMITTING_PARTY],
  stepsMap[StepTypeRecreateClient.RECEIVING_PARTY],
  stepsMap[StepTypeRecreateClient.ADDITIONAL_AGREEMENTS],
  stepsMap[StepTypeRecreateClient.SUBMIT],
  stepsMap[StepTypeRecreateClient.DOCUMENTS],
  stepsMap[StepTypeRecreateClient.RESULT]
]

const stepsByProcessType = {
  [RecreateClientType.ONLINE]: stepsRecreateClientOnline,
  [RecreateClientType.OFFLINE]: stepsRecreateClientOffline
}

export const getStepsByRecreateClientType = recreateClientType => stepsByProcessType[recreateClientType]

export const getCurrStepRecreateClient = ({ currStepType, recreateClientType }) => {
  const steps = getStepsByRecreateClientType(recreateClientType)

  return getCurrStep({ currStepType, steps })
}

export const getNextStepTypeRecreateClient = ({ currentStepType, recreateClientType }) => {
  const steps = getStepsByRecreateClientType(recreateClientType)

  return getNextStepType({ currStepType: currentStepType, steps })
}

export const getPrevStepTypeRecreateClient = ({ currentStepType, recreateClientType }) => {
  const steps = getStepsByRecreateClientType(recreateClientType)

  return getPrevStepType({ currStepType: currentStepType, steps })
}
