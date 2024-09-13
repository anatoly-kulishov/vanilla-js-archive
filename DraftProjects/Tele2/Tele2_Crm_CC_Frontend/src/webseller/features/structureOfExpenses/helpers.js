import React from 'react'
import PeriodSelection from './components/PeriodSelection'
import Result from './components/ResultStep'
import TypeOfDetailing from './components/TypeOfDetailing/TypeOfDetailing'

export const StructureOfExpensesStep = {
  NONE: 'NONE',
  TYPE_OF_DETAILING: 'TYPE_OF_DETAILING',
  PERIOD_SELECTION: 'PERIOD_SELECTION',
  RESULT: 'RESULT'
}

const stepsMap = {
  [StructureOfExpensesStep.TYPE_OF_DETAILING]: {
    key: StructureOfExpensesStep.TYPE_OF_DETAILING,
    title: 'Вид детализации',
    render: () => <TypeOfDetailing />
  },
  [StructureOfExpensesStep.PERIOD_SELECTION]: {
    key: StructureOfExpensesStep.PERIOD_SELECTION,
    title: 'Выбор периода',
    render: () => <PeriodSelection />
  },
  [StructureOfExpensesStep.RESULT]: {
    key: StructureOfExpensesStep.RESULT,
    title: 'Результат',
    render: () => <Result />
  }
}

export const stepsStructureOfExpensesStep = [
  stepsMap[StructureOfExpensesStep.TYPE_OF_DETAILING],
  stepsMap[StructureOfExpensesStep.PERIOD_SELECTION],
  stepsMap[StructureOfExpensesStep.RESULT]
]
