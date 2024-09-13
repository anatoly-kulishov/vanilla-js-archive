import { call, put } from 'redux-saga/effects'
import api from 'utils/api'
import {
  getApprovedStayingDocumentFieldError,
  getApprovedStayingDocumentFieldSuccess,
  getApprovedStayingDocumentsError,
  getApprovedStayingDocumentsSuccess,
  getDocumentIdentityCountriesError,
  getDocumentIdentityCountriesSuccess,
  getDocumentIdentityFieldsError,
  getDocumentIdentityFieldsSuccess,
  getDocumentIdentityTypesError,
  getDocumentIdentityTypesSuccess,
  getValidityIdentityDocumentPeriodError,
  getValidityIdentityDocumentPeriodSuccess,
  getValidityStayingDocumentPeriodError,
  getValidityStayingDocumentPeriodSuccess
} from 'reducers/documentIdentity/documentIdentityReducer'

const validateStatusDefault = status => status >= 200 && status < 300

export function * getDocumentIdentityTypesSaga ({ payload }) {
  const { fetchIdentityDocumentTypes } = api

  try {
    const { data, status } = yield call(fetchIdentityDocumentTypes, payload)

    if (validateStatusDefault(status)) {
      yield put(getDocumentIdentityTypesSuccess({ data }))
    } else {
      yield put(getDocumentIdentityTypesError())
    }
  } catch (exception) {
    yield put(getDocumentIdentityTypesError())
  }
}

export function * getDocumentIdentityFieldsSaga ({ payload }) {
  const { fetchIdentityDocumentFields } = api

  try {
    const { data, status } = yield call(fetchIdentityDocumentFields, payload)

    if (validateStatusDefault(status)) {
      yield put(getDocumentIdentityFieldsSuccess({ data }))
    } else {
      yield put(getDocumentIdentityFieldsError())
    }
  } catch (exception) {
    yield put(getDocumentIdentityFieldsError())
  }
}

export function * getDocumentIdentityCountriesSaga ({ payload }) {
  const { fetchIdentityDocumentCountries } = api

  try {
    const { data, status } = yield call(fetchIdentityDocumentCountries, payload)

    if (validateStatusDefault(status)) {
      yield put(getDocumentIdentityCountriesSuccess({ data }))
    } else {
      yield put(getDocumentIdentityCountriesError())
    }
  } catch (exception) {
    yield put(getDocumentIdentityCountriesError())
  }
}

export function * getApprovedStayingDocumentsSaga ({ payload }) {
  const { fetchApprovedStayingDocuments } = api
  const { onChangeFormStepId, onSubmitForm } = payload

  try {
    const { data, status } = yield call(fetchApprovedStayingDocuments, payload)

    if (validateStatusDefault(status)) {
      yield put(getApprovedStayingDocumentsSuccess({ data }))

      if (data && data.approvedResidenceDocuments?.length) {
        onChangeFormStepId()
      }

      if (data && !data.approvedResidenceDocuments?.length) {
        onSubmitForm()
      }
    } else {
      yield put(getApprovedStayingDocumentsError())
    }
  } catch (exception) {
    yield put(getApprovedStayingDocumentsError())
  }
}

export function * getApprovedStayingDocumentFieldSaga ({ payload }) {
  const { fetchApprovedStayingDocumentField } = api

  try {
    const { data, status } = yield call(fetchApprovedStayingDocumentField, payload)

    if (validateStatusDefault(status)) {
      yield put(getApprovedStayingDocumentFieldSuccess({ data }))
    } else {
      yield put(getApprovedStayingDocumentFieldError())
    }
  } catch (exception) {
    yield put(getApprovedStayingDocumentFieldError())
  }
}

export function * getIsValidIdentityDocumentPeriodSaga ({ payload }) {
  const { fetchValidityIdentityDocPeriod } = api

  try {
    const { data, status } = yield call(fetchValidityIdentityDocPeriod, payload)
    if (validateStatusDefault(status)) {
      yield put(getValidityIdentityDocumentPeriodSuccess({ data }))
    } else {
      yield put(getValidityIdentityDocumentPeriodError())
    }
  } catch (exception) {
    yield put(getValidityIdentityDocumentPeriodError())
  }
}

export function * getIsValidStayingDocumentPeriodSaga ({ payload }) {
  const { fetchValidityStayingDocPeriod } = api

  try {
    const { data, status } = yield call(fetchValidityStayingDocPeriod, payload)

    if (validateStatusDefault(status)) {
      yield put(getValidityStayingDocumentPeriodSuccess({ data }))
    } else {
      yield put(getValidityStayingDocumentPeriodError())
    }
  } catch (exception) {
    yield put(getValidityStayingDocumentPeriodError())
  }
}
