import { all, takeEvery } from 'redux-saga/effects'

import {
  checkPepCodeChangingTariffPlanSaga,
  createInteractionChangingClientStatusSaga,
  getPaperDocumentsChangingTariffPlanSaga,
  getSmsCodeChangingTariffPlanSaga,
  getSubscriberPersonalDataSaga,
  initChangingTariffPlanSaga
} from './sagas'
import {
  checkPepCodeCChangingTariffPlan,
  createInteractionChangingTariffPlan,
  getPaperDocumentsChangingTariffPlan,
  getSmsCodeChangingTariffPlan,
  getSubscriberPersonalData,
  initChangingTariffPlan
} from '../actions'

export default function * () {
  yield all([
    takeEvery(initChangingTariffPlan().type, initChangingTariffPlanSaga),
    takeEvery(getSmsCodeChangingTariffPlan().type, getSmsCodeChangingTariffPlanSaga),
    takeEvery(checkPepCodeCChangingTariffPlan().type, checkPepCodeChangingTariffPlanSaga),
    takeEvery(getPaperDocumentsChangingTariffPlan().type, getPaperDocumentsChangingTariffPlanSaga),
    takeEvery(createInteractionChangingTariffPlan().type, createInteractionChangingClientStatusSaga),
    takeEvery(getSubscriberPersonalData().type, getSubscriberPersonalDataSaga)
  ])
}
