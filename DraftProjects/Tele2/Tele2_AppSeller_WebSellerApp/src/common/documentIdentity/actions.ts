import { createAction } from 'redux-actions';

import { IdentityDocumentsService } from 'api/identityDocuments/types';
import { DaDataIntegrationService } from 'api/daDataIntegration/types';
import { MdmService } from 'api/mdm/types';

export enum ActionTypeDocumentIdentity {
  GET_DOCUMENT_TYPES = 'webseller/documentIdentity/GET_DOCUMENT_TYPES',
  GET_DOCUMENT_TYPES_SUCCESS = 'webseller/documentIdentity/GET_DOCUMENT_TYPES_SUCCESS',
  GET_DOCUMENT_TYPES_ERROR = 'webseller/documentIdentity/GET_DOCUMENT_TYPES_ERROR',

  GET_DOCUMENT_FIELDS = 'webseller/documentIdentity/GET_DOCUMENT_FIELDS',
  GET_DOCUMENT_FIELDS_SUCCESS = 'webseller/documentIdentity/GET_DOCUMENT_FIELDS_SUCCESS`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ',
  GET_DOCUMENT_FIELDS_ERROR = 'webseller/documentIdentity/GET_DOCUMENT_FIELDS_ERROR',

  GET_COUNTRIES = 'webseller/documentIdentity/GET_COUNTRIES',
  GET_COUNTRIES_SUCCESS = 'webseller/documentIdentity/GET_COUNTRIES_SUCCESS',
  GET_COUNTRIES_ERROR = 'webseller/documentIdentity/GET_COUNTRIES_ERROR',

  GET_UFMS_DIVISIONS = 'webseller/documentIdentity/GET_UFMS_DIVISIONS',
  GET_UFMS_DIVISIONS_SUCCESS = 'webseller/documentIdentity/GET_UFMS_DIVISIONS_SUCCESS',
  GET_UFMS_DIVISIONS_ERROR = 'webseller/documentIdentity/GET_UFMS_DIVISIONS_ERROR',
  CLEAR_UFMS_DIVISIONS = 'webseller/documentIdentity/CLEAR_UFMS_DIVISIONS',

  GET_ADDRESSES = 'webseller/documentIdentity/GET_ADDRESSES',
  GET_ADDRESSES_SUCCESS = 'webseller/documentIdentity/GET_ADDRESSES_SUCCESS',
  GET_ADDRESSES_ERROR = 'webseller/documentIdentity/GET_ADDRESSES_ERROR',

  SET_ADDRESSES_MANUAL = 'webseller/documentIdentity/SET_ADDRESSES_MANUAL',

  GET_RESIDENCE_DOCUMENT_TYPES = 'webseller/documentIdentity/GET_RESIDENCE_DOCUMENT_TYPES',
  GET_RESIDENCE_DOCUMENT_TYPES_SUCCESS = 'webseller/documentIdentity/GET_RESIDENCE_DOCUMENT_TYPES_SUCCESS',
  GET_RESIDENCE_DOCUMENT_TYPES_ERROR = 'webseller/documentIdentity/GET_RESIDENCE_DOCUMENT_TYPES_ERROR',

  GET_RESIDENCE_DOCUMENT_FIELDS = 'webseller/documentIdentity/GET_RESIDENCE_DOCUMENT_FIELDS',
  GET_RESIDENCE_DOCUMENT_FIELDS_SUCCESS = 'webseller/documentIdentity/GET_RESIDENCE_DOCUMENT_FIELDS_SUCCESS',
  GET_RESIDENCE_DOCUMENT_FIELDS_ERROR = 'webseller/documentIdentity/GET_RESIDENCE_DOCUMENT_FIELDS_ERROR',

  RESET_STATE = 'webseller/documentIdentity/RESET_STATE'
}

export namespace ActionPayloadDocumentIdentity {
  export type GetDocumentTypesSuccess = Array<IdentityDocumentsService.Model.DocumentType>;

  export type GetDocumentFields = IdentityDocumentsService.GetDocumentFields.Request;
  export type GetDocumentFieldsSuccess = Array<IdentityDocumentsService.Model.DocumentField>;

  export type GetCountries = IdentityDocumentsService.GetCountries.Request;
  export type GetCountriesSuccess = Array<IdentityDocumentsService.Model.Country>;

  export type GetUfmsDivisions = MdmService.GetUfmsDivisions.Request;
  export type GetUfmsDivisionsSuccess = Array<MdmService.Model.UfmsDivision>;

  export type GetAddresses = DaDataIntegrationService.GetSuggestionAddress.Request;
  export type GetAddressesSuccess = Array<DaDataIntegrationService.Model.Address>;

  export type SetAddressesManual = Array<DaDataIntegrationService.Model.Address>;

  export type GetResidenceDocumentTypes = {
    requestData: IdentityDocumentsService.GetResidenceDocumentTypes.Request;
    handleNeedMigrationCardForm: VoidFunction;
    handleNoNeedMigrationCardForm: VoidFunction;
  };
  export type GetResidenceDocumentTypesSuccess = Array<IdentityDocumentsService.Model.DocumentType>;

  export type GetResidenceDocumentFields =
    IdentityDocumentsService.GetResidenceDocumentFields.Request;
  export type GetResidenceDocumentFieldsSuccess =
    Array<IdentityDocumentsService.Model.DocumentField>;
}

const actionDocumentIdentity = {
  getDocumentTypes: createAction(ActionTypeDocumentIdentity.GET_DOCUMENT_TYPES),
  getDocumentTypesSuccess: createAction<ActionPayloadDocumentIdentity.GetDocumentTypesSuccess>(
    ActionTypeDocumentIdentity.GET_DOCUMENT_TYPES_SUCCESS
  ),
  getDocumentTypesError: createAction(ActionTypeDocumentIdentity.GET_DOCUMENT_TYPES_ERROR),

  getDocumentFields: createAction<ActionPayloadDocumentIdentity.GetDocumentFields>(
    ActionTypeDocumentIdentity.GET_DOCUMENT_FIELDS
  ),
  getDocumentFieldsSuccess: createAction<ActionPayloadDocumentIdentity.GetDocumentFieldsSuccess>(
    ActionTypeDocumentIdentity.GET_DOCUMENT_FIELDS_SUCCESS
  ),
  getDocumentFieldsError: createAction(ActionTypeDocumentIdentity.GET_DOCUMENT_FIELDS_ERROR),

  getCountries: createAction<ActionPayloadDocumentIdentity.GetCountries>(
    ActionTypeDocumentIdentity.GET_COUNTRIES
  ),
  getCountriesSuccess: createAction<ActionPayloadDocumentIdentity.GetCountriesSuccess>(
    ActionTypeDocumentIdentity.GET_COUNTRIES_SUCCESS
  ),
  getCountriesError: createAction(ActionTypeDocumentIdentity.GET_COUNTRIES_ERROR),

  getUfmsDivisions: createAction<ActionPayloadDocumentIdentity.GetUfmsDivisions>(
    ActionTypeDocumentIdentity.GET_UFMS_DIVISIONS
  ),
  getUfmsDivisionsSuccess: createAction<ActionPayloadDocumentIdentity.GetUfmsDivisionsSuccess>(
    ActionTypeDocumentIdentity.GET_UFMS_DIVISIONS_SUCCESS
  ),
  getUfmsDivisionsError: createAction(ActionTypeDocumentIdentity.GET_UFMS_DIVISIONS_ERROR),
  clearUfmsDivisions: createAction(ActionTypeDocumentIdentity.CLEAR_UFMS_DIVISIONS),

  getAddresses: createAction<ActionPayloadDocumentIdentity.GetAddresses>(
    ActionTypeDocumentIdentity.GET_ADDRESSES
  ),
  getAddressesSuccess: createAction<ActionPayloadDocumentIdentity.GetAddressesSuccess>(
    ActionTypeDocumentIdentity.GET_ADDRESSES_SUCCESS
  ),
  getAddressesError: createAction(ActionTypeDocumentIdentity.GET_ADDRESSES_ERROR),

  setAddressesManual: createAction(ActionTypeDocumentIdentity.SET_ADDRESSES_MANUAL),

  getResidenceDocumentTypes: createAction<ActionPayloadDocumentIdentity.GetResidenceDocumentTypes>(
    ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_TYPES
  ),
  getResidenceDocumentTypesSuccess:
    createAction<ActionPayloadDocumentIdentity.GetResidenceDocumentTypesSuccess>(
      ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_TYPES_SUCCESS
    ),
  getResidenceDocumentTypesError: createAction(
    ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_TYPES_ERROR
  ),

  getResidenceDocumentFields:
    createAction<ActionPayloadDocumentIdentity.GetResidenceDocumentFields>(
      ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_FIELDS
    ),
  getResidenceDocumentFieldsSuccess:
    createAction<ActionPayloadDocumentIdentity.GetResidenceDocumentFieldsSuccess>(
      ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_FIELDS_SUCCESS
    ),
  getResidenceDocumentFieldsError: createAction(
    ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_FIELDS_ERROR
  ),

  resetState: createAction(ActionTypeDocumentIdentity.RESET_STATE)
};

export namespace ActionDocumentIdentity {
  export type GetDocumentTypes = ReturnType<typeof actionDocumentIdentity.getDocumentTypes>;
  export type GetDocumentTypesSuccess = ReturnType<
    typeof actionDocumentIdentity.getDocumentTypesSuccess
  >;
  export type GetDocumentTypesError = ReturnType<
    typeof actionDocumentIdentity.getDocumentTypesError
  >;

  export type GetDocumentFields = ReturnType<typeof actionDocumentIdentity.getDocumentFields>;
  export type GetDocumentFieldsSuccess = ReturnType<
    typeof actionDocumentIdentity.getDocumentFieldsSuccess
  >;
  export type GetDocumentFieldsError = ReturnType<
    typeof actionDocumentIdentity.getDocumentFieldsError
  >;

  export type GetCountries = ReturnType<typeof actionDocumentIdentity.getCountries>;
  export type GetCountriesSuccess = ReturnType<typeof actionDocumentIdentity.getCountriesSuccess>;
  export type GetCountriesError = ReturnType<typeof actionDocumentIdentity.getCountriesError>;

  export type GetUfmsDivisions = ReturnType<typeof actionDocumentIdentity.getUfmsDivisions>;
  export type GetUfmsDivisionsSuccess = ReturnType<
    typeof actionDocumentIdentity.getUfmsDivisionsSuccess
  >;
  export type GetUfmsDivisionsError = ReturnType<
    typeof actionDocumentIdentity.getUfmsDivisionsError
  >;
  export type ClearUfms = ReturnType<typeof actionDocumentIdentity.clearUfmsDivisions>;

  export type GetAddresses = ReturnType<typeof actionDocumentIdentity.getAddresses>;
  export type GetAddressesSuccess = ReturnType<typeof actionDocumentIdentity.getAddressesSuccess>;
  export type GetAddressesError = ReturnType<typeof actionDocumentIdentity.getAddressesError>;

  export type SetAddressesManual = ReturnType<typeof actionDocumentIdentity.setAddressesManual>;

  export type GetResidenceDocumentTypes = ReturnType<
    typeof actionDocumentIdentity.getResidenceDocumentTypes
  >;
  export type GetResidenceDocumentTypesSuccess = ReturnType<
    typeof actionDocumentIdentity.getResidenceDocumentTypesSuccess
  >;
  export type GetResidenceDocumentTypesError = ReturnType<
    typeof actionDocumentIdentity.getResidenceDocumentTypesError
  >;

  export type GetResidenceDocumentFields = ReturnType<
    typeof actionDocumentIdentity.getResidenceDocumentFields
  >;
  export type GetResidenceDocumentFieldsSuccess = ReturnType<
    typeof actionDocumentIdentity.getResidenceDocumentFieldsSuccess
  >;
  export type GetResidenceDocumentFieldsError = ReturnType<
    typeof actionDocumentIdentity.getResidenceDocumentFieldsError
  >;

  export type ResetState = ReturnType<typeof actionDocumentIdentity.resetState>;
}

export default actionDocumentIdentity;
