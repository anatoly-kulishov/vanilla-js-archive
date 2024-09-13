import { call, put } from 'redux-saga/effects'

import api from 'utils/api'

import {
  FETCH_MESSAGE_TEMPLATES_SUCCESS,
  FETCH_MESSAGE_TEMPLATES_ERROR,
  FETCH_MESSAGE_TEMPLATES_FAILURE
} from 'reducers/twinspot/messageTemplatesReducer'

const {
  fetchMessageTemplates
} = api

export function * fetchMessageTemplatesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchMessageTemplates, payload)
    if (data.IsSuccess) {
      const sortedTemplates = {}
      data.Data.Sections.forEach(section => {
        sortedTemplates[section.SectionTemplateId] = { name: section.Name, templates: [] }
      })
      data.Data.Templates.forEach(template => {
        sortedTemplates[template.SectionTemplateId].templates = [...sortedTemplates[template.SectionTemplateId].templates, template]
      })
      yield put({ type: FETCH_MESSAGE_TEMPLATES_SUCCESS, payload: sortedTemplates })
    } else {
      yield put({ type: FETCH_MESSAGE_TEMPLATES_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_MESSAGE_TEMPLATES_FAILURE, message: exception.message })
  }
}
