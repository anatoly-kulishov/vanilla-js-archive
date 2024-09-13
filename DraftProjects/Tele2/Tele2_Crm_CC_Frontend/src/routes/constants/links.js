import fromEnv from 'config/fromEnv'

export const links = [
  {
    text: 'HLR',
    path: `${fromEnv('REACT_APP_TRBL')}`,
    target: '_blank',
    parameters: [
      {
        name: 'msisdn',
        stateValuePath: 'personalInfo.personalAccountState.personalAccount.Msisdn'
      }
    ]
  },
  {
    text: 'Проверка промокодов',
    path: 'http://10.246.4.23:32013/static/',
    target: '_blank'
  }
]
