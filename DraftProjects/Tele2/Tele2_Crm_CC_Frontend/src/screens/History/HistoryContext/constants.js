import moment from 'moment'

export const historyContextDisplayName = 'HistoryContext'

export const dateFormat = 'DD.MM.YYYY'

export const wargamingStatusList = {
  success: { value: 'SUCCESS', label: 'Успешно' },
  error: { value: 'ERROR', label: 'Ошибка' }
}

export const smsStatusIdList = {
  all: { value: 100000000, label: 'Все' },
  awaited: { value: 100000007, label: 'Ожидает' },
  sent: { value: 100000003, label: 'Отправлено' }
}

export const dayStartTime = { hour: 0, minute: 0, second: 0 }
export const dayEndTime = { hour: 23, minute: 59, second: 59 }

export const initialHistoryState = {
  flags: {
    isHistoryFilterVisible: false
  },
  filters: {
    msisdn: '',
    datePeriodStart: moment().subtract(7, 'days'),
    datePeriodFinish: moment(),
    ticketsDatePeriodStart: moment().subtract(1, 'months'),
    ticketsDatePeriodFinish: moment(),
    cbmDatePeriodStart: moment().subtract(1, 'months'),
    cbmDatePeriodFinish: moment(),
    tariffDatePeriodStart: moment().subtract(1, 'year'),
    tariffDatePeriodFinish: moment(),
    creditChangeReason: null,
    serviceName: '',
    offerName: '',
    smsStatus: smsStatusIdList.all.value,
    smsShowBy: 1,
    smsSource: 0,
    interactionShowBy: 2,
    interactionReason: null,
    interactionCategory: null,
    ticketNumber: null,
    ticketStatus: { key: '', label: '' },
    ticketReason: { key: '', label: '' },
    ticketCategory: { key: '', label: '' },
    ticketSearchForAllSubscribers: false,
    questionaryId: null,
    mnpOrderId: null,
    wgStatus: '',
    stateCode: null,
    campaignId: null
  }
}

export const HistoryType = {
  Promo: 'Promo'
}
