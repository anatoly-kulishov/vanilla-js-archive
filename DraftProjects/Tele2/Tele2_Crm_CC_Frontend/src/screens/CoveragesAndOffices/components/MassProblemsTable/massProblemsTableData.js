export const massProblemsTableColumns = [
  {
    title: 'Номер проблемы',
    dataIndex: 'RelationId',
    width: '15%'
  },
  {
    title: 'Дата/время начала',
    dataIndex: 'StartDateTime',
    width: '15%'
  },
  {
    title: 'Тип проблемы',
    dataIndex: 'ProblemTypeName',
    width: '15%'
  },
  {
    title: 'Статус проблемы',
    dataIndex: 'StatusName',
    width: '15%'
  },
  {
    title: 'Наименование проблемы',
    dataIndex: 'ProblemName',
    width: '40%'
  }
]

export const massProblemsTableAdditionalColumns = [
  {
    title: 'Стандартная фраза для оператора',
    key: 'AnswerText'
  }
]
