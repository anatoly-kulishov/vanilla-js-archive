export const spaTableColumns = [
  {
    title: 'Номер проблемы',
    dataIndex: 'SpaName'
  },
  {
    title: 'Дата/время начала',
    dataIndex: 'StartDateTime'
  },
  {
    title: 'Планируемая дата завершения',
    dataIndex: 'EndDateTime'
  },
  {
    title: 'Фактическая дата завершения',
    dataIndex: 'FactEndDateTime'
  },
  {
    title: 'Фактическая дата проведеного улучшения',
    dataIndex: 'DateImprovement'
  }
]

export const spaTableAdditionalColumns = [
  { title: 'Стандартная фраза для оператора', key: 'AnswerText' }
]
