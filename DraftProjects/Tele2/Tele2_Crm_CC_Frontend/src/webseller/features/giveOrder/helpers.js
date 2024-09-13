import React from 'react'

import { GIVING_ORDER_PROCESS_STEPS } from 'reducers/giveOrder/giveOrderStepsReducer'
import OrderListStep from 'webseller/features/giveOrder/components/OrderListStep'
import OrderStep from 'webseller/features/giveOrder/components/OrderStep'

export const giveOrderStepsMap = {
  [GIVING_ORDER_PROCESS_STEPS.SELECT_ORDER]: {
    key: GIVING_ORDER_PROCESS_STEPS.SELECT_ORDER,
    title: 'Выбрать интернет-заказ',
    render: () => <OrderListStep />
  },
  [GIVING_ORDER_PROCESS_STEPS.GIVE_ORDER]: {
    key: GIVING_ORDER_PROCESS_STEPS.GIVE_ORDER,
    title: 'Выдать заказ',
    render: () => <OrderStep />
  }
}

export const steps = [
  giveOrderStepsMap[GIVING_ORDER_PROCESS_STEPS.SELECT_ORDER],
  giveOrderStepsMap[GIVING_ORDER_PROCESS_STEPS.GIVE_ORDER]
]
