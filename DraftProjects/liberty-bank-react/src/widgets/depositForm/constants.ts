import type { IImageProps } from '@/shared';

export const DEPOSIT_FORM = {
  title: 'Расчет потенциальной доходности',
  buttonSend: 'Отправить заявку',
  buttonBack: 'Назад',
  conditions: 'Я ознакомлен/ -а с',
  prolongation: 'Я согласен на пролонгацию депозита',
  conditionsLink1: 'Условиями депозитного продукта',
  conditionsLink2: 'Общими условиями размещения средств в депозит',
  amountDeposit: 'Сумма по депозиту',
  profitDeposit: 'Прибыль по депозиту',
  profitOnDepositPercentage: 'Прибыль по депозиту в % от изначальной суммы',
  amountInputLabel: 'Сумма депозита',
  termInputLabel: 'Срок депозита',
} as const;

export const infoFrameText = {
  titleSuccess: 'Ваш депозит открыт',
  titleFailed: 'Не удалось открыть депозит. Попробуйте оформить его снова!',
  requestStatus: 'Посмотреть мои депозиты',
  creditList: 'Вернуться к списку депозитов',
  reapply: 'Повторно подать заявку',
} as const;

export const successOpenedCredit: IImageProps = {
  image: 'all-product-current-bill',
  dir: 'bills',
  width: '278',
  height: '200',
  style: { transform: 'scale(-1, 1)' },
} as const;

export const failedOpenedCredit: IImageProps = {
  image: 'failed-open-bill',
  dir: 'bills',
  width: '269',
  height: '200',
} as const;
