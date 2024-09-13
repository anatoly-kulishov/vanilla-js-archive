export const faultsTableColumns = [
  {
    key: 'ProblemArea',
    title: 'Адрес',
    dataIndex: 'ProblemArea'
  },
  {
    key: 'Technology',
    title: 'Технология',
    dataIndex: 'Technology'
  },
  {
    key: 'StartDateTime',
    title: 'Начало',
    dataIndex: 'StartDateTime'
  },
  {
    key: 'EndDateTime',
    title: 'Прогноз завершения',
    dataIndex: 'EndDateTime'
  },
  {
    key: 'FactEndDateTime',
    title: 'Завершено',
    dataIndex: 'FactEndDateTime'
  }
]

export const faultsTableAdditionalColumns = [
  {
    title: 'Стандартная фраза для оператора',
    key: 'AnswerText'
  }
]
