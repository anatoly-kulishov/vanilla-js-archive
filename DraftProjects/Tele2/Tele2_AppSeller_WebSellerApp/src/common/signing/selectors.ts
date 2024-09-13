import { State } from 'helpers/store/state';

const selectorsSigning = {
  selectAll: (state: State) => state.webseller.signing,

  selectSigningType: (state: State) => state.webseller.signing.signingType,

  selectIsSuccessfulSigning: (state: State) => state.webseller.signing.isSuccessfulSigning,
  selectIsSigningSkipped: (state: State) => state.webseller.signing.isSigningSkipped,

  selectSubscriberData: (state: State) => state.webseller.signing.subscriberData,
  selectIsClientHasPep: (state: State) => state.webseller.signing.isClientHasPep,
  selectIsLoadingCheckIsClientHasPep: (state: State) =>
    state.webseller.signing.isLoadingCheckIsClientHasPep,

  selectPepNumbers: (state: State) => state.webseller.signing.pepNumbers,
  selectIsLoadingGetPepNumbers: (state: State) => state.webseller.signing.isLoadingGetPepNumbers,
  selectActivePepNumber: (state: State) => state.webseller.signing.activePepNumber,

  selectIsLoadingGetSmsCode: (state: State) => state.webseller.signing.isLoadingGetSmsCode,
  selectIsLoadingGetDocumentCode: (state: State) =>
    state.webseller.signing.isLoadingGetDocumentCode,
  selectIsErrorGetDocumentCode: (state: State) => state.webseller.signing.isErrorGetDocumentCode,

  selectPepCode: (state: State) => state.webseller.signing.pepCode,
  selectIsLoadingCheckPepCode: (state: State) => state.webseller.signing.isLoadingCheckPepCode,

  selectPaperDocuments: (state: State) => state.webseller.signing.paperDocuments,
  selectIsLoadingGetPaperDocuments: (state: State) =>
    state.webseller.signing.isLoadingGetPaperDocuments,
  selectIsErrorGetPaperDocuments: (state: State) =>
    state.webseller.signing.isErrorGetPaperDocuments,

  selectCommentary: (state: State) => state.webseller.signing.commentary,
  selectSignedDocuments: (state: State) => state.webseller.signing.signedDocuments
};

export default selectorsSigning;
