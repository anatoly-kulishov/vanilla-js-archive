import axios from 'axios';
import type Common from '@t2crm/wfm-utils/lib/types/common';
import type ResponseDictionaries from 'types/response/dictionaries';
import {
  BASE_PARTNERS_URL,
  BASE_RDM_URL,
  BASE_SALES_OFFICES_URL,
  BASE_WORK_ACTIVITIES_URL,
} from '@t2crm/wfm-utils/lib/constants/apiUrls';

const getDealers = (filters?: Common.KeyValue) => (
  axios.get<ResponseDictionaries.Dealer[]>(
    `${BASE_PARTNERS_URL}/api/v1/Dealers`, { params: filters },
  )
);

const getStatuses = () => (
  axios.get<ResponseDictionaries.PartnerStatus[]>(
    `${BASE_PARTNERS_URL}/api/v1/Dictionary/Statuses`,
  )
);

const getJuridicalTypes = () => (
  axios.get<ResponseDictionaries.JuridicalTypes[]>(
    `${BASE_PARTNERS_URL}/api/v1/Dictionary/JuridicalTypes`,
  )
);

const getCompanyGroups = (filters?: Common.KeyValue) => (
  axios.get<ResponseDictionaries.CompanyGroup[]>(
    `${BASE_PARTNERS_URL}/api/v1/CompanyGroups`, { params: filters },
  )
);

const getPositions = () => (
  axios.get<ResponseDictionaries.Position[]>(
    `${BASE_PARTNERS_URL}/api/v1/Dictionary/Positions`,
  )
);

const getContactTypes = () => (
  axios.get<ResponseDictionaries.ContactType[]>(
    `${BASE_PARTNERS_URL}/api/v1/Dictionary/ContactTypes`,
  )
);

const getAddressTypes = () => (
  axios.get<ResponseDictionaries.AddressType[]>(
    `${BASE_PARTNERS_URL}/api/v1/Dictionary/AddressTypes`,
  )
);

const getMacroRegions = () => (
  axios.get<ResponseDictionaries.MacroRegion[]>(
    `${BASE_RDM_URL}/api/v1/MacroRegions`,
  )
);

const getRegions = (params?: Common.KeyValue) => (
  axios.get<ResponseDictionaries.Region[]>(
    `${BASE_RDM_URL}/api/v1/Regions`, { params },
  )
);

const getOfficesStatuses = () => (
  axios.get<ResponseDictionaries.OfficeStatus[]>(
    `${BASE_SALES_OFFICES_URL}/api/v1/Statuses`,
  )
);

const getEmployeeActivities = (params?: Common.KeyValue) => (
  axios.get<ResponseDictionaries.EmployeeActivity[]>(
    `${BASE_RDM_URL}/api/v1/Dictionary/EmployeeActivity`, { params },
  )
);

const getAutoOperationsTypes = (params?: Common.KeyValue) => (
  axios.get<ResponseDictionaries.AutoOperationsType[]>(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/Dictionary/AutoOperationsTypes`, { params },
  )
);

const getNotificationTypes = () => (
  axios.get<ResponseDictionaries.NotificationType[]>(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/Dictionary/NotificationTypes`,
  )
);

const getNotificationConditions = () => (
  axios.get<ResponseDictionaries.NotificationCondition[]>(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/Dictionary/NotificationConditions`,
  )
);

export {
  getDealers,
  getStatuses,
  getJuridicalTypes,
  getCompanyGroups,
  getPositions,
  getContactTypes,
  getAddressTypes,
  getMacroRegions,
  getRegions,
  getOfficesStatuses,
  getEmployeeActivities,
  getAutoOperationsTypes,
  getNotificationTypes,
  getNotificationConditions,
};
