import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import { ActionTypeSigning, ActionSigning } from './actions';
import initialState, { StateSigning } from './state';

const reducerSigning = handleActions<StateSigning, unknown>(
  {
    [ActionTypeSigning.CHANGE_SIGNING_TYPE]: produce(
      (state: StateSigning, { payload }: ActionSigning.ChangeSigningType) => {
        state.signingType = payload;
      }
    ),

    [ActionTypeSigning.CHECK_IS_CLIENT_HAS_PEP]: produce((state: StateSigning) => {
      state.subscriberData = null;
      state.isLoadingCheckIsClientHasPep = true;
      state.isErrorCheckIsClientHasPep = false;
    }),
    [ActionTypeSigning.CHECK_IS_CLIENT_HAS_PEP_SUCCESS]: produce(
      (state: StateSigning, { payload }: ActionSigning.CheckIsClientHasPepSuccess) => {
        state.isLoadingCheckIsClientHasPep = false;
        state.isClientHasPep = payload.isClientHasPep;
        state.subscriberData = payload.subscriberData;
      }
    ),
    [ActionTypeSigning.CHECK_IS_CLIENT_HAS_PEP_ERROR]: produce((state: StateSigning) => {
      state.isLoadingCheckIsClientHasPep = false;
      state.isErrorCheckIsClientHasPep = true;
    }),

    [ActionTypeSigning.GET_PEP_NUMBERS]: produce((state: StateSigning) => {
      state.isLoadingGetPepNumbers = true;
      state.isErrorGetPepNumbers = false;
    }),
    [ActionTypeSigning.GET_PEP_NUMBERS_SUCCESS]: produce(
      (state: StateSigning, { payload }: ActionSigning.GetPepNumbersSuccess) => {
        state.isLoadingGetPepNumbers = false;
        const hasMsisdns = payload?.length > 0;
        if (hasMsisdns) {
          state.pepNumbers = payload;
          state.activePepNumber = payload[0].msisdn;
        }
      }
    ),
    [ActionTypeSigning.GET_PEP_NUMBERS_ERROR]: produce((state: StateSigning) => {
      state.isLoadingGetPepNumbers = false;
      state.isErrorGetPepNumbers = true;
      state.pepNumbers = null;
    }),

    [ActionTypeSigning.CHANGE_ACTIVE_PEP_NUMBER]: produce(
      (state: StateSigning, { payload }: ActionSigning.ChangeActivePepNumber) => {
        state.activePepNumber = payload;
      }
    ),

    [ActionTypeSigning.GET_SMS_CODE]: produce((state: StateSigning) => {
      state.isLoadingGetSmsCode = true;
      state.isErrorGetSmsCode = false;
    }),
    [ActionTypeSigning.GET_SMS_CODE_SUCCESS]: produce((state: StateSigning) => {
      state.isLoadingGetSmsCode = false;
    }),
    [ActionTypeSigning.GET_SMS_CODE_ERROR]: produce((state: StateSigning) => {
      state.isLoadingGetSmsCode = false;
      state.isErrorGetSmsCode = true;
    }),

    [ActionTypeSigning.GET_DOCUMENT_CODE]: produce((state: StateSigning) => {
      state.isLoadingGetDocumentCode = true;
      state.isErrorGetDocumentCode = false;
    }),
    [ActionTypeSigning.GET_DOCUMENT_CODE_SUCCESS]: produce((state: StateSigning) => {
      state.isLoadingGetDocumentCode = false;
    }),
    [ActionTypeSigning.GET_DOCUMENT_CODE_ERROR]: produce((state: StateSigning) => {
      state.isLoadingGetDocumentCode = false;
      state.isErrorGetDocumentCode = true;
    }),

    [ActionTypeSigning.CHECK_PEP_CODE]: produce((state: StateSigning) => {
      state.isLoadingCheckPepCode = true;
      state.isErrorCheckPepCode = false;
    }),
    [ActionTypeSigning.CHECK_PEP_CODE_SUCCESS]: produce(
      (state: StateSigning, { payload }: ActionSigning.CheckPepCodeSuccess) => {
        state.isLoadingCheckPepCode = true;
        state.isSuccessfulSigning = true;
        state.pepCode = payload;
      }
    ),
    [ActionTypeSigning.CHECK_PEP_CODE_ERROR]: produce((state: StateSigning) => {
      state.isLoadingCheckPepCode = false;
      state.isErrorCheckPepCode = true;
    }),

    [ActionTypeSigning.GET_PAPER_DOCUMENTS]: produce((state: StateSigning) => {
      state.isLoadingGetPaperDocuments = true;
      state.isErrorGetPaperDocuments = false;
    }),
    [ActionTypeSigning.GET_PAPER_DOCUMENTS_SUCCESS]: produce(
      (state: StateSigning, { payload }: ActionSigning.GetPaperDocumentsSuccess) => {
        state.isLoadingGetPaperDocuments = false;
        state.paperDocuments = payload;
      }
    ),
    [ActionTypeSigning.GET_PAPER_DOCUMENTS_ERROR]: produce((state: StateSigning) => {
      state.isLoadingGetPaperDocuments = false;
      state.isErrorGetPaperDocuments = true;
    }),

    [ActionTypeSigning.ADD_SIGNED_DOCUMENT]: produce(
      (state: StateSigning, { payload }: ActionSigning.AddSignedDocument) => {
        state.signedDocuments.push(payload);
      }
    ),
    [ActionTypeSigning.REMOVE_SIGNED_DOCUMENT]: produce(
      (state: StateSigning, { payload }: ActionSigning.RemoveSignedDocument) => {
        state.signedDocuments = state.signedDocuments.filter(({ uid }) => uid !== payload);
      }
    ),

    [ActionTypeSigning.CHANGE_COMMENTARY]: produce(
      (state: StateSigning, { payload }: ActionSigning.ChangeCommentary) => {
        state.commentary = payload;
      }
    ),

    [ActionTypeSigning.SUBMIT_SIGNING]: produce((state: StateSigning) => {
      state.isSuccessfulSigning = true;
    }),
    [ActionTypeSigning.SKIP_SIGNING]: produce((state: StateSigning) => {
      state.isSigningSkipped = true;
      state.isErrorGetDocumentCode = false;
      state.isErrorGetPaperDocuments = false;
    }),
    [ActionTypeSigning.RESET_STATE]: () => initialState
  },
  initialState
);

export default reducerSigning;
