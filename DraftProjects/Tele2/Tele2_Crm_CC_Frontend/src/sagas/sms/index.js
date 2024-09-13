import { all, takeEvery } from 'redux-saga/effects'

import { GET_SMS_HISTORY_FETCH } from 'reducers/sms/getSmsHistoryReducer'
import { getSmsHistorySaga } from './getSmsHistorySaga'

import { GET_SMS_TEMPLATES_FETCH } from 'reducers/sms/getSmsTemplatesReducer'
import { getSmsTemplatesSaga } from './getSmsTemplatesSaga'

import { FETCH_TOP_SMS_TEMPLATES } from 'reducers/sms/topSmsTemplatesReducer'
import { fetchTopSmsTemplatesSaga } from './topSmsTemplatesSaga'

export default function * () {
  yield all([
    takeEvery(GET_SMS_HISTORY_FETCH, getSmsHistorySaga),
    takeEvery(GET_SMS_TEMPLATES_FETCH, getSmsTemplatesSaga),
    takeEvery(FETCH_TOP_SMS_TEMPLATES, fetchTopSmsTemplatesSaga)
  ])
}
