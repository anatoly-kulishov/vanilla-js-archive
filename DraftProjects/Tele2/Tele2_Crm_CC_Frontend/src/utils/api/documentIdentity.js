import axios from 'axios'

const SERVICE_HOST = `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP}/identitydocumentsservice`

export default {
  fetchIdentityDocumentTypes: params => axios.get(`${SERVICE_HOST}/api/v1/IdentityDocumentTypes`, { params }),
  fetchIdentityDocumentFields: params => axios.get(`${SERVICE_HOST}/api/v1/IdentityDocumentTypes/${params.id}/Fields`),
  fetchIdentityDocumentCountries: params =>
    axios.get(`${SERVICE_HOST}/api/v1/Countries/Filtered`, {
      params: {
        identityDocumentType: params.identityDocumentType,
        countryName: params.countryName
      }
    }),
  fetchApprovedStayingDocuments: params =>
    axios.get(`${SERVICE_HOST}/api/v1/ApprovedResidenceDocuments/Filtered`, {
      params: {
        identityDocumentId: params.identityDocumentId,
        countryId: params.countryId
      }
    }),
  fetchApprovedStayingDocumentField: params =>
    axios.get(`${SERVICE_HOST}/api/v1/ApprovedResidenceDocuments/${params?.id}/Fields`),
  fetchValidityIdentityDocPeriod: ({ id, ...params }) =>
    axios.get(`${SERVICE_HOST}/api/v1/IdentityDocumentTypes/${id}/ValidityPeriod`, { params }),
  fetchValidityStayingDocPeriod: ({ id, ...params }) =>
    axios.get(`${SERVICE_HOST}/api/v1/ApprovedResidenceDocuments/${id}/ValidityPeriod`, { params })
}
