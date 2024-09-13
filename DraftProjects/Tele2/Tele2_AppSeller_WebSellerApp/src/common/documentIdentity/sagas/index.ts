import { notification } from 'antd';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import api from 'api';
import actions, {
  ActionTypeDocumentIdentity,
  ActionDocumentIdentity
} from 'common/documentIdentity/actions';
import { BussinessLogicError } from 'api/helpers';
// TODO интегрировать в namespace Api
import { IdentityDocumentsService } from 'api/identityDocuments/types';
import { DaDataIntegrationService } from 'api/daDataIntegration/types';
import { MdmService } from 'api/mdm/types';

function* getDocumentTypesSaga() {
  try {
    const responseDocumentTypes: AxiosResponse<IdentityDocumentsService.GetDocumentTypes.Response> =
      yield call(api.identityDocuments.getDocumentTypes);

    const documentTypes = responseDocumentTypes?.data?.identityDocumentTypes;

    if (documentTypes) {
      yield put(actions.getDocumentTypesSuccess(documentTypes));
    } else {
      throw new BussinessLogicError();
    }
  } catch {
    yield put(actions.getDocumentTypesError());
    notification.error({
      message: 'Форма ДУЛ',
      description: 'Не удалось получить список типов ДУЛ'
    });
  }
}

function* getDocumentFieldsSaga({ payload }: ActionDocumentIdentity.GetDocumentFields) {
  try {
    const responseDocumentFields: AxiosResponse<IdentityDocumentsService.GetDocumentFields.Response> =
      yield call(api.identityDocuments.getDocumentFields, payload);

    const documentFields = responseDocumentFields?.data?.fields;

    if (documentFields) {
      yield put(actions.getDocumentFieldsSuccess(documentFields));
    } else {
      throw new BussinessLogicError();
    }
  } catch {
    yield put(actions.getDocumentFieldsError());
    notification.error({
      message: 'Форма ДУЛ',
      description: 'Не удалось получить список полей для формы'
    });
  }
}

function* getCountriesSaga({ payload }: ActionDocumentIdentity.GetCountries) {
  try {
    const responseCountries: AxiosResponse<IdentityDocumentsService.GetCountries.Response> =
      yield call(api.identityDocuments.getCountries, payload);

    const countries = responseCountries?.data?.countries;

    if (countries) {
      yield put(actions.getCountriesSuccess(countries));
    } else {
      throw new BussinessLogicError();
    }
  } catch {
    yield put(actions.getCountriesError());
  }
}

function* getUfmsDivisionsSaga({ payload }: ActionDocumentIdentity.GetUfmsDivisions) {
  try {
    const responseUfmsDivisions: AxiosResponse<MdmService.GetUfmsDivisions.Response> = yield call(
      api.mdm.getUfmsDivisions,
      payload
    );

    const ufmsDivisions = responseUfmsDivisions?.data?.data;

    if (ufmsDivisions) {
      yield put(actions.getUfmsDivisionsSuccess(ufmsDivisions));
    } else {
      throw new BussinessLogicError();
    }
  } catch {
    yield put(actions.getUfmsDivisionsError());
  }
}

function* getAddressesSaga({ payload }: ActionDocumentIdentity.GetAddresses) {
  try {
    const responseAddresses: AxiosResponse<DaDataIntegrationService.GetSuggestionAddress.Response> =
      yield call(api.daDataIntegration.getSuggestionAddress, payload);

    const rawAddresses = responseAddresses?.data?.Data?.DaData;
    const addresses = rawAddresses?.map((address) => address.SearchAccuracy);

    if (addresses) {
      yield put(actions.getAddressesSuccess(addresses));
    } else {
      throw new BussinessLogicError();
    }
  } catch {
    yield put(actions.getAddressesError());
  }
}

function* getResidenceDocumentTypesSaga({
  payload: { requestData, handleNeedMigrationCardForm, handleNoNeedMigrationCardForm }
}: ActionDocumentIdentity.GetResidenceDocumentTypes) {
  try {
    const responseResidenceDocumentTypes: AxiosResponse<IdentityDocumentsService.GetResidenceDocumentTypes.Response> =
      yield call(api.identityDocuments.getResidenceDocumentTypes, requestData);

    const residenceDocumentTypes = responseResidenceDocumentTypes?.data?.approvedResidenceDocuments;

    const isNeedMigrationCardForm = residenceDocumentTypes?.length > 0;

    if (isNeedMigrationCardForm) {
      yield put(actions.getResidenceDocumentTypesSuccess(residenceDocumentTypes));
      yield call(handleNeedMigrationCardForm);
    } else {
      yield call(handleNoNeedMigrationCardForm);
    }
  } catch {
    yield put(actions.getDocumentTypesError());
    notification.error({
      message: 'Миграционная карта',
      description: 'Не удалось получить список типов документов'
    });
  }
}

function* getResidenceDocumentFieldsSaga({
  payload
}: ActionDocumentIdentity.GetResidenceDocumentFields) {
  try {
    const responseResidenceDocumentFields: AxiosResponse<IdentityDocumentsService.GetResidenceDocumentFields.Response> =
      yield call(api.identityDocuments.getResidenceDocumentFields, payload);

    const residenceDocumentFields = responseResidenceDocumentFields?.data?.fields;

    if (residenceDocumentFields) {
      yield put(actions.getResidenceDocumentFieldsSuccess(residenceDocumentFields));
    } else {
      throw new BussinessLogicError();
    }
  } catch {
    yield put(actions.getResidenceDocumentFieldsError());
    notification.error({
      message: 'Миграционная карта',
      description: 'Не удалось получить список полей для формы'
    });
  }
}

export default function* sagaDocumentIdentity() {
  yield all([
    takeEvery(ActionTypeDocumentIdentity.GET_DOCUMENT_TYPES, getDocumentTypesSaga),
    takeEvery(ActionTypeDocumentIdentity.GET_DOCUMENT_FIELDS, getDocumentFieldsSaga),
    takeEvery(ActionTypeDocumentIdentity.GET_COUNTRIES, getCountriesSaga),
    takeEvery(ActionTypeDocumentIdentity.GET_UFMS_DIVISIONS, getUfmsDivisionsSaga),
    takeEvery(ActionTypeDocumentIdentity.GET_ADDRESSES, getAddressesSaga),
    takeEvery(
      ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_TYPES,
      getResidenceDocumentTypesSaga
    ),
    takeEvery(
      ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_FIELDS,
      getResidenceDocumentFieldsSaga
    )
  ]);
}
