import React from 'react'

import AccessLevel from './components/AccessLevel'
import Signing from './components/Signing'
import Result from './components/Result'

export const NumberRoleManagmentStep = {
  NONE: 'NONE',
  ACCESS_LEVEL: 'ACCESS_LEVEL',
  SIGNING: 'SIGNING',
  RESULT: 'RESULT'
}

const stepsMap = {
  [NumberRoleManagmentStep.ACCESS_LEVEL]: {
    key: NumberRoleManagmentStep.ACCESS_LEVEL,
    title: 'Изменение роли',
    render: () => <AccessLevel />
  },
  [NumberRoleManagmentStep.SIGNING]: {
    key: NumberRoleManagmentStep.SIGNING,
    title: 'Печать документов',
    render: () => <Signing />
  },
  [NumberRoleManagmentStep.RESULT]: {
    key: NumberRoleManagmentStep.RESULT,
    title: 'Результат',
    render: () => <Result />
  }
}

export const stepsNumberRoleManagment = [
  stepsMap[NumberRoleManagmentStep.ACCESS_LEVEL],
  stepsMap[NumberRoleManagmentStep.SIGNING],
  stepsMap[NumberRoleManagmentStep.RESULT]
]

export const isAdminRole = (roleName) => roleName === 'Администратор'
