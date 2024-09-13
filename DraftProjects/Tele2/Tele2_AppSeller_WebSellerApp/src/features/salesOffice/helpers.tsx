import { Step } from 'common/steps/helpers';

import ChangingSalesOffice from './components/ChangingSalesOffice';

export enum StepChangingActiveSalesOffice {
  NONE = 'NONE',
  CHECK = 'CHECK',
  SUBMIT = 'SUBMIT',
  RESULT = 'RESULT'
}

const stepsMap = {
  [StepChangingActiveSalesOffice.CHECK]: new Step({
    key: StepChangingActiveSalesOffice.CHECK,
    title: 'Торговая точка',
    width: '80%',
    render: () => <ChangingSalesOffice.Check />
  }),
  [StepChangingActiveSalesOffice.SUBMIT]: new Step({
    key: StepChangingActiveSalesOffice.SUBMIT,
    title: 'Проверь адрес новой торговой точки',
    width: '80%',
    render: () => <ChangingSalesOffice.Submit />
  }),
  [StepChangingActiveSalesOffice.RESULT]: new Step({
    key: StepChangingActiveSalesOffice.RESULT,
    title: 'Результат',
    width: '100%',
    render: () => <ChangingSalesOffice.Result/>
  })
};

export const stepsChangingActiveSalesOffice = [
  stepsMap[StepChangingActiveSalesOffice.CHECK],
  stepsMap[StepChangingActiveSalesOffice.SUBMIT],
  stepsMap[StepChangingActiveSalesOffice.RESULT]
];

export enum StatusChangingActiveSalesOffice {
  NONE = 'NONE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
