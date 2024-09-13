import { isoDateSorter } from 'utils/helpers'

export const columns = [
  {
    title: 'Номер телефона',
    dataIndex: 'Msisdn',
    key: 'Msisdn',
    sorter: (item1, item2) => item1.Msisdn.localeCompare(item2.Msisdn)
  },
  {
    title: 'Наименование тарифного плана',
    dataIndex: 'RateName',
    key: 'RateName',
    sorter: (item1, item2) => item1.RateName.localeCompare(item2.RateName)
  },
  {
    title: 'Дата начала',
    dataIndex: 'StartDateTime',
    key: 'StartDateTime',
    sorter: (item1, item2) => isoDateSorter(item1.StartDateTime, item2.StartDateTime),
    defaultSortOrder: 'descend'
  },
  {
    title: 'Дата окончания',
    dataIndex: 'EndDateTime',
    key: 'EndDateTime',
    sorter: (item1, item2) => isoDateSorter(item1.EndDateTime, item2.EndDateTime),
    defaultSortOrder: 'descend'
  },
  {
    title: 'Автор',
    dataIndex: 'UserName',
    key: 'UserName',
    sorter: (item1, item2) => item1.UserName.localeCompare(item2.UserName)
  }
]
