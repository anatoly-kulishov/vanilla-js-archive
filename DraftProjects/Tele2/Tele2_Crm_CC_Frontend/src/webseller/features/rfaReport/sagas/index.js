import { all, takeEvery } from 'redux-saga/effects'

import { generateRfaReport, getAllDealerSalePoints, getDealerIdBySalePointId, getDealerInfo } from '../actions'
import {
  generateRfaReportSaga,
  getAllDealerSalePointsSaga,
  getDealerIdBySalePointIdSaga,
  getDealerInfoSaga
} from './sagas'

export default function * () {
  yield all([
    takeEvery(generateRfaReport().type, generateRfaReportSaga),
    takeEvery(getDealerInfo().type, getDealerInfoSaga),
    takeEvery(getAllDealerSalePoints().type, getAllDealerSalePointsSaga),
    takeEvery(getDealerIdBySalePointId().type, getDealerIdBySalePointIdSaga)
  ])
}
