import { State } from 'helpers/store/state';

const selectorsDocumentIdentity = {
  selectDocumentTypes: (state: State) => state.webseller.documentIdentity.documentTypes,
  selectIsLoadingGetDocumentTypes: (state: State) =>
    state.webseller.documentIdentity.isLoadingGetDocumentTypes,
  selectIsErrorGetDocumentTypes: (state: State) =>
    state.webseller.documentIdentity.isErrorGetDocumentTypes,

  selectDocumentFields: (state: State) => state.webseller.documentIdentity.documentFields,
  selectIsLoadingGetDocumentFields: (state: State) =>
    state.webseller.documentIdentity.isLoadingGetDocumentFields,
  selectIsErrorGetDocumentFields: (state: State) =>
    state.webseller.documentIdentity.isErrorGetDocumentFields,

  selectCountries: (state: State) => state.webseller.documentIdentity.countries,
  selectIsLoadingGetCountries: (state: State) =>
    state.webseller.documentIdentity.isLoadingGetCountries,
  selectIsErrorGetCountries: (state: State) => state.webseller.documentIdentity.isErrorGetCountries,

  selectUfmsDivisions: (state: State) => state.webseller.documentIdentity.ufmsDivisions,
  selectIsLoadingGetUfmsDivisions: (state: State) =>
    state.webseller.documentIdentity.isLoadingGetUfmsDivisions,
  selectIsErrorGetUfmsDivisions: (state: State) =>
    state.webseller.documentIdentity.isErrorGetUfmsDivisions,

  selectAddresses: (state: State) => state.webseller.documentIdentity.addresses,
  selectIsLoadingGetAddresses: (state: State) =>
    state.webseller.documentIdentity.isLoadingGetAddresses,
  selectIsErrorGetAddresses: (state: State) => state.webseller.documentIdentity.isErrorGetAddresses,

  selectResidenceDocumentTypes: (state: State) => state.webseller.documentIdentity.residenceDocumentTypes,
  selectIsLoadingGetResidenceDocumentTypes: (state: State) =>
    state.webseller.documentIdentity.isLoadingGetResidenceDocumentTypes,
  selectIsErrorGetResidenceDocumentTypes: (state: State) =>
    state.webseller.documentIdentity.isErrorGetResidenceDocumentTypes,

  selectResidenceDocumentFields: (state: State) => state.webseller.documentIdentity.residenceDocumentFields,
  selectIsLoadingGetResidenceDocumentFields: (state: State) =>
    state.webseller.documentIdentity.isLoadingGetResidenceDocumentFields,
  selectIsErrorGetResidenceDocumentFields: (state: State) =>
    state.webseller.documentIdentity.isErrorGetResidenceDocumentFields,
};

export default selectorsDocumentIdentity;
