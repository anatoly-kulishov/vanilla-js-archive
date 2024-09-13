import { DaDataIntegrationService } from 'api/daDataIntegration/types';
import { IdentityDocumentsService } from 'api/identityDocuments/types';
import { MdmService } from 'api/mdm/types';

export type StateDocumentIdentity = {
  documentTypes: Array<IdentityDocumentsService.Model.DocumentType> | null;
  isLoadingGetDocumentTypes: boolean;
  isErrorGetDocumentTypes: boolean;

  documentFields: Array<IdentityDocumentsService.Model.DocumentField> | null;
  isLoadingGetDocumentFields: boolean;
  isErrorGetDocumentFields: boolean;

  countries: Array<IdentityDocumentsService.Model.Country> | null;
  isLoadingGetCountries: boolean;
  isErrorGetCountries: boolean;

  ufmsDivisions: Array<MdmService.Model.UfmsDivision> | null;
  isLoadingGetUfmsDivisions: boolean;
  isErrorGetUfmsDivisions: boolean;

  addresses: Array<DaDataIntegrationService.Model.Address> | null;
  isLoadingGetAddresses: boolean;
  isErrorGetAddresses: boolean;

  residenceDocumentTypes: Array<IdentityDocumentsService.Model.DocumentType> | null;
  isLoadingGetResidenceDocumentTypes: boolean;
  isErrorGetResidenceDocumentTypes: boolean;

  residenceDocumentFields: Array<IdentityDocumentsService.Model.DocumentField> | null;
  isLoadingGetResidenceDocumentFields: boolean;
  isErrorGetResidenceDocumentFields: boolean;
};

const initialStateDocumentIdentity: StateDocumentIdentity = {
  documentTypes: null,
  isLoadingGetDocumentTypes: false,
  isErrorGetDocumentTypes: false,

  documentFields: null,
  isLoadingGetDocumentFields: false,
  isErrorGetDocumentFields: false,

  countries: null,
  isLoadingGetCountries: false,
  isErrorGetCountries: false,

  ufmsDivisions: null,
  isLoadingGetUfmsDivisions: false,
  isErrorGetUfmsDivisions: false,

  addresses: null,
  isLoadingGetAddresses: false,
  isErrorGetAddresses: false,

  residenceDocumentTypes: null,
  isLoadingGetResidenceDocumentTypes: false,
  isErrorGetResidenceDocumentTypes: false,

  residenceDocumentFields: null,
  isLoadingGetResidenceDocumentFields: false,
  isErrorGetResidenceDocumentFields: false
};

export default initialStateDocumentIdentity;
