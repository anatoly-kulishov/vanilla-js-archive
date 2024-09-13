import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import { ActionTypeDocumentIdentity, ActionDocumentIdentity } from './actions';
import initialState, { StateDocumentIdentity } from './state';

const reducerDocumentIdentity = handleActions(
  {
    [ActionTypeDocumentIdentity.GET_DOCUMENT_TYPES]: produce((state: StateDocumentIdentity) => {
      state.isLoadingGetDocumentTypes = true;
      state.isErrorGetDocumentTypes = false;
    }),
    [ActionTypeDocumentIdentity.GET_DOCUMENT_TYPES_SUCCESS]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.GetDocumentTypesSuccess;

        state.documentTypes = payload;
        state.isLoadingGetDocumentTypes = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_DOCUMENT_TYPES_ERROR]: produce(
      (state: StateDocumentIdentity) => {
        state.isLoadingGetDocumentTypes = false;
        state.isErrorGetDocumentTypes = true;
      }
    ),

    [ActionTypeDocumentIdentity.GET_DOCUMENT_FIELDS]: produce((state: StateDocumentIdentity) => {
      state.isLoadingGetDocumentFields = true;
      state.isErrorGetDocumentFields = false;
    }),
    [ActionTypeDocumentIdentity.GET_DOCUMENT_FIELDS_SUCCESS]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.GetDocumentFieldsSuccess;

        state.documentFields = payload;
        state.isLoadingGetDocumentFields = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_DOCUMENT_FIELDS_ERROR]: produce(
      (state: StateDocumentIdentity) => {
        state.isLoadingGetDocumentFields = false;
        state.isErrorGetDocumentFields = true;
      }
    ),

    [ActionTypeDocumentIdentity.GET_COUNTRIES]: produce((state: StateDocumentIdentity) => {
      state.isLoadingGetCountries = true;
      state.isErrorGetCountries = false;
    }),
    [ActionTypeDocumentIdentity.GET_COUNTRIES_SUCCESS]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.GetCountriesSuccess;

        state.countries = payload;
        state.isLoadingGetCountries = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_COUNTRIES_ERROR]: produce((state: StateDocumentIdentity) => {
      state.isLoadingGetCountries = false;
      state.isErrorGetCountries = true;
    }),

    [ActionTypeDocumentIdentity.GET_UFMS_DIVISIONS]: produce((state: StateDocumentIdentity) => {
      state.isLoadingGetUfmsDivisions = true;
      state.isErrorGetUfmsDivisions = false;
    }),
    [ActionTypeDocumentIdentity.GET_UFMS_DIVISIONS_SUCCESS]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.GetUfmsDivisionsSuccess;

        state.ufmsDivisions = payload;
        state.isLoadingGetUfmsDivisions = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_UFMS_DIVISIONS_ERROR]: produce(
      (state: StateDocumentIdentity) => {
        state.isLoadingGetUfmsDivisions = false;
        state.isErrorGetUfmsDivisions = true;
      }
    ),
    [ActionTypeDocumentIdentity.CLEAR_UFMS_DIVISIONS]: produce(
      (state: StateDocumentIdentity) => {
        state.ufmsDivisions = null;
      }
    ),

    [ActionTypeDocumentIdentity.GET_ADDRESSES]: produce((state: StateDocumentIdentity) => {
      state.isLoadingGetAddresses = true;
      state.isErrorGetAddresses = false;
    }),
    [ActionTypeDocumentIdentity.GET_ADDRESSES_SUCCESS]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.GetAddressesSuccess;

        state.addresses = payload;
        state.isLoadingGetAddresses = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_ADDRESSES_ERROR]: produce((state: StateDocumentIdentity) => {
      state.isLoadingGetAddresses = false;
      state.isErrorGetAddresses = true;
    }),

    [ActionTypeDocumentIdentity.SET_ADDRESSES_MANUAL]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.SetAddressesManual;

        state.addresses = payload;
      }
    ),

    [ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_TYPES]: produce(
      (state: StateDocumentIdentity) => {
        state.isLoadingGetResidenceDocumentTypes = true;
        state.isErrorGetResidenceDocumentTypes = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_TYPES_SUCCESS]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.GetResidenceDocumentTypesSuccess;

        state.residenceDocumentTypes = payload;
        state.isLoadingGetResidenceDocumentTypes = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_TYPES_ERROR]: produce(
      (state: StateDocumentIdentity) => {
        state.isLoadingGetResidenceDocumentTypes = false;
        state.isErrorGetResidenceDocumentTypes = true;
      }
    ),

    [ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_FIELDS]: produce(
      (state: StateDocumentIdentity) => {
        state.isLoadingGetResidenceDocumentFields = true;
        state.isErrorGetResidenceDocumentFields = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_FIELDS_SUCCESS]: produce(
      (state: StateDocumentIdentity, action: unknown) => {
        const { payload } = action as ActionDocumentIdentity.GetResidenceDocumentFieldsSuccess;

        state.residenceDocumentFields = payload;
        state.isLoadingGetResidenceDocumentFields = false;
      }
    ),
    [ActionTypeDocumentIdentity.GET_RESIDENCE_DOCUMENT_FIELDS_ERROR]: produce(
      (state: StateDocumentIdentity) => {
        state.isLoadingGetResidenceDocumentFields = false;
        state.isErrorGetResidenceDocumentFields = true;
      }
    ),

    [ActionTypeDocumentIdentity.RESET_STATE]: () => initialState
  },
  initialState
);

export default reducerDocumentIdentity;
