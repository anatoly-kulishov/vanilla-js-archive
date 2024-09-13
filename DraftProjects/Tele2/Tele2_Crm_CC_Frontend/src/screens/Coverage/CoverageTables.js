export const massProblemsColumns = [
  {
    title: 'Номер проблемы',
    dataIndex: 'ProblemId',
    width: '15%'
  },
  {
    title: 'Наименование проблемы',
    dataIndex: 'ProblemName' || 'ServiceName',
    width: '40%'
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

export const faultsColumns = [
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
    title: 'Список адресов',
    dataIndex: 'ProblemArea'
  }
]

export const pwColumns = [
  {
    title: 'Номер проблемы',
    dataIndex: 'PWNumber'
  },
  {
    title: 'Дата/время начала',
    dataIndex: 'StartDateTime'
  },
  {
    title: 'Планируемая дата завершения',
    dataIndex: 'FactEndDateTime'
  },
  {
    title: 'Фактическая дата завершения',
    dataIndex: 'FactEndDateTime'
  },
  {
    title: 'Описание проблемы',
    dataIndex: 'WhatHappens'
  }
]

export const spaColumns = [
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

export const additionalMassProblemsColumns = [
  {
    title: 'Наименование сервиса',
    key: 'ServiceName'
  },
  {
    title: 'Описание проблемы',
    key: 'WhatHappens'
  },
  {
    title: 'Стандартная фраза для оператора',
    key: 'AnswerText'
  },
  {
    title: 'Рекомендации абоненту',
    key: 'Recomendation'
  },
  {
    title: 'Список адресов',
    key: 'ProblemArea'
  }
]

export const additionalFaultsColumns = [
  {
    title: 'Стандартная фраза для оператора',
    key: 'AnswerText'
  }
]

export const additionalPwColumns = [
  {
    title: 'Описание проблемы',
    key: 'WhatHappens'
  },
  {
    title: 'Стандартная фраза для оператора',
    key: 'AnswerText'
  },
  {
    title: 'Список адресов',
    key: 'ProblemArea'
  }
]

export const additionalSpaColumns = [
  {
    title: 'Описание проблемы',
    key: 'WhatHappens'
  },
  {
    title: 'Стандартная фраза для оператора',
    key: 'AnswerText'
  },
  {
    title: 'Список адресов',
    key: 'ProblemArea'
  }
]
