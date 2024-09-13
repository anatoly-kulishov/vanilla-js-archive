import React from 'react'
import { call, put } from 'redux-saga/effects'
import moment from 'moment'

import api from 'utils/api'

import {
  FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_SUCCESS,
  FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_FAILURE,
  FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_ERROR
} from 'reducers/massProblems/massProblemDiagnosticsReducer'

import HtmlRender from 'components/HtmlRender'

const { fetchActualMtpJournalForPeriod } = api

export function * fetchActualMtpJournalForPeriodSaga ({ payload: { datePeriodStart, datePeriodFinish } }) {
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchActualMtpJournalForPeriod, {
      datePeriodStart: moment(datePeriodStart)
        .utc()
        .format(),
      datePeriodFinish: moment(datePeriodFinish)
        .utc()
        .format()
    })

    if (IsSuccess) {
      const formatMarkup = (item) => {
        item.WhatHappens = item.WhatHappens && <HtmlRender value={item.WhatHappens} />
        item.AnswerText = item.AnswerText && <HtmlRender value={item.AnswerText} />
        item.WhatToControl = item.WhatToControl && <HtmlRender value={item.WhatToControl} />
        item.Recomendation = item.Recomendation && <HtmlRender value={item.Recomendation} />
      }

      const formatDate = (item) => {
        for (const key of Object.keys(item)) {
          if (item[key] && key.includes('Time')) {
            item[key] = moment(item[key]).format('DD.MM.YYYY HH:mm')
          }
        }
      }

      for (const item of Data) {
        formatMarkup(item)
        formatDate(item)
      }

      yield put({ type: FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_ERROR, payload: MessageText })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_FAILURE, payload: message })
  }
}
