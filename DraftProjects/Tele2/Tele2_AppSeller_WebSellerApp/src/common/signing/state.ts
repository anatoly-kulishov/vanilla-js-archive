import { Api } from 'api/types';
import { SigningType } from './helpers';

export type StateSigning = {
  signingType: SigningType;

  isSuccessfulSigning: boolean;
  isSigningSkipped: boolean;

  subscriberData: Api.PersonalInfoService.GetDataSubscriber.Response | null;
  isClientHasPep: boolean;
  isLoadingCheckIsClientHasPep: boolean;
  isErrorCheckIsClientHasPep: boolean;

  pepNumbers: Api.PepService.Model.PepNumber[] | null;
  isLoadingGetPepNumbers: boolean;
  isErrorGetPepNumbers: boolean;

  activePepNumber: string | null;
  isLoadingGetSmsCode: boolean;
  isErrorGetSmsCode: boolean;

  isLoadingGetDocumentCode: boolean;
  isErrorGetDocumentCode: boolean;

  pepCode: string | null;
  isLoadingCheckPepCode: boolean;
  isErrorCheckPepCode: boolean;

  paperDocuments: Api.DocumentService.Model.Document[] | null;
  isLoadingGetPaperDocuments: boolean;
  isErrorGetPaperDocuments: boolean;

  commentary: string | null;

  signedDocuments: Api.DocumentService.Model.SignedDocument[];
};

const initialStateSigning: StateSigning = {
  signingType: SigningType.NONE,

  isSuccessfulSigning: false,
  isSigningSkipped: false,

  subscriberData: null,
  isClientHasPep: false,
  isLoadingCheckIsClientHasPep: false,
  isErrorCheckIsClientHasPep: false,

  pepNumbers: null,
  isLoadingGetPepNumbers: false,
  isErrorGetPepNumbers: false,

  activePepNumber: null,

  isLoadingGetSmsCode: false,
  isErrorGetSmsCode: false,

  isLoadingGetDocumentCode: false,
  isErrorGetDocumentCode: false,

  pepCode: null,
  isLoadingCheckPepCode: false,
  isErrorCheckPepCode: false,

  paperDocuments: null,
  isLoadingGetPaperDocuments: false,
  isErrorGetPaperDocuments: false,

  commentary: null,

  signedDocuments: []
};

export default initialStateSigning;
