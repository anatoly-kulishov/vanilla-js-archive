import { createAction } from 'redux-actions';
import { SigningType } from './helpers';
import { Api } from 'api/types';

export enum ActionTypeSigning {
  CHANGE_SIGNING_TYPE = 'webseller/signing/CHANGE_SIGNING_TYPE',

  CHECK_IS_CLIENT_HAS_PEP = 'webseller/signing/CHECK_IS_CLIENT_HAS_PEP',
  CHECK_IS_CLIENT_HAS_PEP_SUCCESS = 'webseller/signing/CHECK_IS_CLIENT_HAS_PEP_SUCCESS',
  CHECK_IS_CLIENT_HAS_PEP_ERROR = 'webseller/signing/CHECK_IS_CLIENT_HAS_PEP_ERROR',

  GET_PEP_NUMBERS = 'webseller/signing/GET_PEP_NUMBERS',
  GET_PEP_NUMBERS_SUCCESS = 'webseller/signing/GET_PEP_NUMBERS_SUCCESS',
  GET_PEP_NUMBERS_ERROR = 'webseller/signing/GET_PEP_NUMBERS_ERROR',

  CHANGE_ACTIVE_PEP_NUMBER = 'webseller/signing/CHANGE_ACTIVE_PEP_NUMBER',

  GET_SMS_CODE = 'webseller/signing/GET_SMS_CODE',
  GET_SMS_CODE_SUCCESS = 'webseller/signing/GET_SMS_CODE_SUCCESS',
  GET_SMS_CODE_ERROR = 'webseller/signing/GET_SMS_CODE_ERROR',

  GET_DOCUMENT_CODE = 'webseller/signing/GET_DOCUMENT_CODE',
  GET_DOCUMENT_CODE_SUCCESS = 'webseller/signing/GET_DOCUMENT_CODE_SUCCESS',
  GET_DOCUMENT_CODE_ERROR = 'webseller/signing/GET_DOCUMENT_CODE_ERROR',

  CHECK_PEP_CODE = 'webseller/signing/CHECK_PEP_CODE',
  CHECK_PEP_CODE_SUCCESS = 'webseller/signing/CHECK_PEP_CODE_SUCCESS',
  CHECK_PEP_CODE_ERROR = 'webseller/signing/CHECK_PEP_CODE_ERROR',

  GET_PAPER_DOCUMENTS = 'webseller/signing/GET_PAPER_DOCUMENTS',
  GET_PAPER_DOCUMENTS_SUCCESS = 'webseller/signing/GET_PAPER_DOCUMENTS_SUCCESS',
  GET_PAPER_DOCUMENTS_ERROR = 'webseller/signing/GET_PAPER_DOCUMENTS_ERROR',

  CANCEL_GET_DOCUMENT_CODE = 'webseller/signing/CANCEL_GET_DOCUMENT_CODE', // TODO удалить?
  CANCEL_GET_PAPER_DOCUMENTS = 'webseller/signing/CANCEL_GET_PAPER_DOCUMENTS', // TODO удалить?

  ADD_SIGNED_DOCUMENT = 'webseller/signing/ADD_SIGNED_DOCUMENT',
  REMOVE_SIGNED_DOCUMENT = 'webseller/signing/REMOVE_SIGNED_DOCUMENT',

  CHANGE_COMMENTARY = 'webseller/signing/CHANGE_COMMENTARY',

  SUBMIT_SIGNING = 'webseller/signing/SUBMIT_SIGNING',
  SKIP_SIGNING = 'webseller/signing/SKIP_SIGNING',

  RESET_STATE = 'webseller/signing/RESET_STATE'
}

export namespace ActionPayloadSigning {
  export type ChangeSigningType = SigningType;
  export type CheckIsClientHasPepSuccess = {
    isClientHasPep: boolean;
    subscriberData: Api.PersonalInfoService.GetDataSubscriber.Response;
  };
  export type GetPepNumbersSuccess = Api.PepService.Model.PepNumber[];
  export type ChangeActivePepNumber = string;
  export type CheckPepCodeSuccess = string;
  export type GetPaperDocumentsSuccess = Api.DocumentService.Model.Document[];
  export type AddSignedDocument = Api.DocumentService.Model.SignedDocument;
  export type RemoveSignedDocument = string;
  export type ChangeCommentary = string;
}

const actionSigning = {
  changeSigningType: createAction<ActionPayloadSigning.ChangeSigningType>(
    ActionTypeSigning.CHANGE_SIGNING_TYPE
  ),

  checkIsClientHasPep: createAction(ActionTypeSigning.CHECK_IS_CLIENT_HAS_PEP),
  checkIsClientHasPepSuccess: createAction<ActionPayloadSigning.CheckIsClientHasPepSuccess>(
    ActionTypeSigning.CHECK_IS_CLIENT_HAS_PEP_SUCCESS
  ),
  checkIsClientHasPepError: createAction(ActionTypeSigning.CHECK_IS_CLIENT_HAS_PEP_ERROR),

  getPepNumbers: createAction(ActionTypeSigning.GET_PEP_NUMBERS),
  getPepNumbersSuccess: createAction<ActionPayloadSigning.GetPepNumbersSuccess>(
    ActionTypeSigning.GET_PEP_NUMBERS_SUCCESS
  ),
  getPepNumbersError: createAction(ActionTypeSigning.GET_PEP_NUMBERS_ERROR),

  changeActivePepNumber: createAction<ActionPayloadSigning.ChangeActivePepNumber>(
    ActionTypeSigning.CHANGE_ACTIVE_PEP_NUMBER
  ),

  getSmsCode: createAction(ActionTypeSigning.GET_SMS_CODE),
  getSmsCodeSuccess: createAction(ActionTypeSigning.GET_SMS_CODE_SUCCESS),
  getSmsCodeError: createAction(ActionTypeSigning.GET_SMS_CODE_ERROR),

  getDocumentCode: createAction(ActionTypeSigning.GET_DOCUMENT_CODE),
  getDocumentCodeSuccess: createAction(ActionTypeSigning.GET_DOCUMENT_CODE_SUCCESS),
  getDocumentCodeError: createAction(ActionTypeSigning.GET_DOCUMENT_CODE_ERROR),

  checkPepCode: createAction(ActionTypeSigning.CHECK_PEP_CODE),
  checkPepCodeSuccess: createAction<ActionPayloadSigning.CheckPepCodeSuccess>(
    ActionTypeSigning.CHECK_PEP_CODE_SUCCESS
  ),
  checkPepCodeError: createAction(ActionTypeSigning.CHECK_PEP_CODE_ERROR),

  getPaperDocuments: createAction(ActionTypeSigning.GET_PAPER_DOCUMENTS),
  getPaperDocumentsSuccess: createAction<ActionPayloadSigning.GetPaperDocumentsSuccess>(
    ActionTypeSigning.GET_PAPER_DOCUMENTS_SUCCESS
  ),
  getPaperDocumentsError: createAction(ActionTypeSigning.GET_PAPER_DOCUMENTS_ERROR),

  // TODO удалить, т.к. в компоненте не обрабатывается
  // cancelGetDocumentCode: createAction(ActionTypeSigning.CANCEL_GET_DOCUMENT_CODE),
  cancelGetPaperDocuments: createAction(ActionTypeSigning.CANCEL_GET_PAPER_DOCUMENTS),

  addSignedDocument: createAction<ActionPayloadSigning.AddSignedDocument>(
    ActionTypeSigning.ADD_SIGNED_DOCUMENT
  ),
  removeSignedDocument: createAction<ActionPayloadSigning.RemoveSignedDocument>(
    ActionTypeSigning.REMOVE_SIGNED_DOCUMENT
  ),

  changeCommentary: createAction<ActionPayloadSigning.ChangeCommentary>(
    ActionTypeSigning.CHANGE_COMMENTARY
  ),

  submitSigning: createAction(ActionTypeSigning.SUBMIT_SIGNING),
  skipSigning: createAction(ActionTypeSigning.SKIP_SIGNING),
  resetState: createAction(ActionTypeSigning.RESET_STATE)
};

export namespace ActionSigning {
  export type ChangeSigningType = ReturnType<typeof actionSigning.changeSigningType>;

  export type CheckIsClientHasPep = ReturnType<typeof actionSigning.checkIsClientHasPep>;
  export type CheckIsClientHasPepSuccess = ReturnType<
    typeof actionSigning.checkIsClientHasPepSuccess
  >;
  export type CheckIsClientHasPepError = ReturnType<typeof actionSigning.checkIsClientHasPepError>;

  export type GetPepNumbers = ReturnType<typeof actionSigning.getPepNumbers>;
  export type GetPepNumbersSuccess = ReturnType<typeof actionSigning.getPepNumbersSuccess>;
  export type GetPepNumbersError = ReturnType<typeof actionSigning.getPepNumbersError>;

  export type ChangeActivePepNumber = ReturnType<typeof actionSigning.changeActivePepNumber>;

  export type GetSmsCode = ReturnType<typeof actionSigning.getSmsCode>;
  export type GetSmsCodeSuccess = ReturnType<typeof actionSigning.getSmsCodeSuccess>;
  export type GetSmsCodeError = ReturnType<typeof actionSigning.getSmsCodeError>;

  export type GetDocumentCode = ReturnType<typeof actionSigning.getDocumentCode>;
  export type GetDocumentCodeSuccess = ReturnType<typeof actionSigning.getDocumentCodeSuccess>;
  export type GetDocumentCodeError = ReturnType<typeof actionSigning.getDocumentCodeError>;

  export type CheckPepCode = ReturnType<typeof actionSigning.checkPepCode>;
  export type CheckPepCodeSuccess = ReturnType<typeof actionSigning.checkPepCodeSuccess>;
  export type CheckPepCodeError = ReturnType<typeof actionSigning.checkPepCodeError>;

  export type GetPaperDocuments = ReturnType<typeof actionSigning.getPaperDocuments>;
  export type GetPaperDocumentsSuccess = ReturnType<typeof actionSigning.getPaperDocumentsSuccess>;
  export type GetPaperDocumentsError = ReturnType<typeof actionSigning.getPaperDocumentsError>;

  // TODO удалить, т.к. в компоненте не обрабатывается
  // export type CancelGetDocumentCode = ReturnType<typeof actionSigning.cancelGetDocumentCode>;
  export type CancelGetPaperDocuments = ReturnType<typeof actionSigning.cancelGetPaperDocuments>;

  export type AddSignedDocument = ReturnType<typeof actionSigning.addSignedDocument>;
  export type RemoveSignedDocument = ReturnType<typeof actionSigning.removeSignedDocument>;

  export type ChangeCommentary = ReturnType<typeof actionSigning.changeCommentary>;

  export type SubmitSigning = ReturnType<typeof actionSigning.submitSigning>;
  export type SkipSigning = ReturnType<typeof actionSigning.skipSigning>;
  export type ResetSigning = ReturnType<typeof actionSigning.resetState>;
}

export default actionSigning;
