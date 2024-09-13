export const prolongedMassProblemsTableColumns = [
  {
    title: 'Номер проблемы',
    dataIndex: 'ProblemId',
    width: '15%'
  },
  {
    title: 'Наименование проблемы',
    dataIndex: 'ProblemName',
    width: '40%',
    render: (value, record) => value || record.ServiceName
  },
  {
    title: 'Дата/время начала',
    dataIndex: 'StartDateTime',
    width: '15%'
  },
  {
    title: 'Планируемая дата завершения',
    dataIndex: 'EndDateTime' || 'PlanDateTime',
    width: '15%'
  },
  {
    title: 'Фактическая дата завершения',
    dataIndex: 'FactEndTime' || 'FinishDateTime',
    width: '15%'
  }
]

export const prolongedMassProblemsTableAdditionalColumns = [
  {
    title: 'Стандартная фраза для оператора',
    key: 'AnswerText'
  }
]
