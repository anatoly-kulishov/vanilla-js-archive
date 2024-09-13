import { OrderStatuses } from './orderStatuses'

export default [
  { key: 0, value: 'Создание черновика заявки' },
  { key: 1, value: 'Регистрация новой заявки' },
  { key: 2, value: 'Возврат заявки в обработку' },
  { key: 3, value: 'Перевод заявки в ожидание' },
  { key: 4, value: 'Передача заявки в РТК' },
  { key: 99, value: 'Отмена заявки' },
  { key: -1, value: 'Удаление заявки' }
]

export const OperationIds = {
  Reject: -1,
  Cancel: 99,
  CancelTransfer: 98,
  Wait: 2,
  Return: 3,
  SetStatus: 30
}

export const Operation = {
  Cancel: 'Cancel',
  CancelTransfer: 'CancelTransfer',
  Reject: 'Reject',
  Return: 'Return',
  Wait: 'Wait',
  Transfer: 'Transfer',
  Save: 'Save',
  Process: 'Process'
}

export const OperationToIdMapping = {
  [Operation.Cancel]: OperationIds.Cancel,
  [Operation.Reject]: OperationIds.Reject,
  [Operation.Return]: OperationIds.Return,
  [Operation.Wait]: OperationIds.Wait
}

export const OperationTitle = {
  Cancel: 'Укажите причину отмены заявки',
  CancelTransfer: 'Укажите причину отмены заявки',
  Reject: 'Укажите причину удаления заявки',
  Return: 'Укажите причину возврата заявки в работу',
  Wait: 'Укажите причину перевода заявки в состояние ожидания'
}

export const DefaultReasonIds = {
  CancelTransfer: 98001
}

// Operation availability for different order statusIds, user rights and order history
export const availableConditions = {
  returnStatus: [
    { statuses: [OrderStatuses.ErrorWithRTC], rights: ['change'], history: [{ reasonId: 200002, operationId: 205 }] }
  ],
  save: [
    { statuses: [OrderStatuses.Draft], rights: ['new', 'modify'] },
    { statuses: [OrderStatuses.New, OrderStatuses.Waiting, OrderStatuses.ErrorWithRTC], rights: ['perform', 'modify'] },
    {
      statuses: [
        OrderStatuses.TransferredToRtc,
        OrderStatuses.InWork,
        OrderStatuses.InstallerAppointed,
        OrderStatuses.InstallationDone,
        OrderStatuses.Closed
      ],
      rights: ['modify']
    }
  ],
  process: [{ statuses: [OrderStatuses.Draft], rights: ['new'] }],
  rtcErrorCancel: [
    {
      statuses: [OrderStatuses.New, OrderStatuses.Waiting],
      rights: ['perform', 'change']
    }
  ],
  cancel: [
    {
      statuses: [
        OrderStatuses.New,
        OrderStatuses.Waiting,
        OrderStatuses.TransferredToRtc,
        OrderStatuses.ErrorWithRTC,
        OrderStatuses.InWork,
        OrderStatuses.InstallerAppointed,
        OrderStatuses.InstallationDone,
        OrderStatuses.Closed
      ],
      rights: ['perform', 'change']
    }
  ],
  reject: [{ statuses: [OrderStatuses.Draft], rights: ['new'] }],
  transfer: [{ statuses: [OrderStatuses.New, OrderStatuses.Waiting], rights: ['transfer'] }],
  wait: [{ statuses: [OrderStatuses.New], rights: ['perform'] }],
  return: [{ statuses: [OrderStatuses.Waiting], rights: ['perform'] }]
}

export const blockConditions = {
  wait: [{ history: [{ reasonId: 200002, operationId: 205 }], rights: ['limited'] }],
  transfer: [{ history: [{ reasonId: 200002, operationId: 205 }] }],
  return: [{ rights: ['limited'] }],
  status: [{ rights: ['limited'] }],
  save: [
    {
      statuses: [
        OrderStatuses.Waiting,
        OrderStatuses.InstallerAppointed,
        OrderStatuses.InstallationDone,
        OrderStatuses.Closed,
        OrderStatuses.ErrorWithRTC
      ],
      rights: ['limited']
    }
  ]
}
