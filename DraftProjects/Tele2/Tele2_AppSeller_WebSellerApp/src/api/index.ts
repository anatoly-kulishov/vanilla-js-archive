import methodsSalesOfficeLimitationsService from 'api/salesOfficeLimitations';
import methodsDealerInfoService from 'api/dealerInfo';
import methodsIdentityDocumentsService from 'api/identityDocuments';
import methodsDaDataIntegrationService from 'api/daDataIntegration';
import methodsMdmService from 'api/mdm';
import methodsDocumentService from 'api/document';
import methodsPersonalInfoService from './personalInfo';
import methodsPepService from 'api/pep';
import methodsSmsService from 'api/sms';

const api = {
  salesOfficeLimitations: methodsSalesOfficeLimitationsService,
  dealerInfo: methodsDealerInfoService,
  identityDocuments: methodsIdentityDocumentsService,
  daDataIntegration: methodsDaDataIntegrationService,
  mdm: methodsMdmService,
  document: methodsDocumentService,
  personalInfo: methodsPersonalInfoService,
  pep: methodsPepService,
  sms: methodsSmsService
};

export default api;
