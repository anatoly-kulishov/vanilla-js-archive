import axios from 'axios';
import AutoOperationsSettingsResponses from 'types/response/autoOperationsSettings';
import AutoOperationsSettingsRequests from 'types/requests/autoOperationsSettings';
import { BASE_WORK_ACTIVITIES_URL } from '@t2crm/wfm-utils/lib/constants/apiUrls';

const getAutoOperationsSettings = (params: AutoOperationsSettingsRequests.GetSettingsParams) => (
  axios.get<AutoOperationsSettingsResponses.Response>(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/AutoOperationSettings`, { params },
  )
);

const deleteOperationSettings = (params: AutoOperationsSettingsRequests.DeleteSettingsParams) => (
  axios.delete(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/AutoOperationSettings`, { params },
  )
);

const modifyOperationSettings = (params: AutoOperationsSettingsRequests.ModifySettingsParams) => (
  axios.put(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/AutoOperationSettings`, params,
  )
);

export {
  getAutoOperationsSettings,
  deleteOperationSettings,
  modifyOperationSettings,
};
