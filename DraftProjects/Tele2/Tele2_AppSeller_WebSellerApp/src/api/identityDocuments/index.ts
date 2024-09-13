import axios from 'axios';

import { IdentityDocumentsService } from './types';

const SERVICE_HOST = process.env.IDENTITY_DOCUMENTS_SERVICE;

const methodsIdentityDocumentsService = {
  getDocumentTypes: () =>
    axios.get<IdentityDocumentsService.GetDocumentTypes.Response>(
      `${SERVICE_HOST}/api/v1/IdentityDocumentTypes`
    ),
  getDocumentFields: ({ docTypeId }: IdentityDocumentsService.GetDocumentFields.Request) =>
    axios.get<IdentityDocumentsService.GetDocumentFields.Response>(
      `${SERVICE_HOST}/api/v1/IdentityDocumentTypes/${docTypeId}/Fields`
    ),
  getCountries: (params: IdentityDocumentsService.GetCountries.Request) =>
    axios.get<IdentityDocumentsService.GetCountries.Response>(
      `${SERVICE_HOST}/api/v1/Countries/Filtered`,
      { params }
    ),
  getDocumentValidityPeriod: ({
    id,
    ...params
  }: IdentityDocumentsService.GetDocumentValidityPeriod.Request) =>
    axios.get<IdentityDocumentsService.GetDocumentValidityPeriod.Response>(
      `${SERVICE_HOST}/api/v1/IdentityDocumentTypes/${id}/ValidityPeriod`,
      { params }
    ),
  getResidenceDocumentTypes: (params: IdentityDocumentsService.GetResidenceDocumentTypes.Request) =>
    axios.get<IdentityDocumentsService.GetResidenceDocumentTypes.Response>(
      `${SERVICE_HOST}/api/v1/ApprovedResidenceDocuments/Filtered`,
      { params }
    ),
  getResidenceDocumentFields: (
    params: IdentityDocumentsService.GetResidenceDocumentFields.Request
  ) =>
    axios.get<IdentityDocumentsService.GetResidenceDocumentFields.Response>(
      `${SERVICE_HOST}/api/v1/ApprovedResidenceDocuments/${params.typeId}/Fields`
    ),
  getResidenceDocumentValidityPeriod: ({
    typeId,
    ...params
  }: IdentityDocumentsService.GetResidenceDocumentValidityPeriod.Request) =>
    axios.get<IdentityDocumentsService.GetResidenceDocumentValidityPeriod.Response>(
      `${SERVICE_HOST}/api/v1/ApprovedResidenceDocuments/${typeId}/ValidityPeriod`,
      { params }
    )
};

export default methodsIdentityDocumentsService;
