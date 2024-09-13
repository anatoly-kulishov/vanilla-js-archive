import axios from 'axios';
import NotificationSettingsResponses from 'types/response/autoOperationsSettings';
import NotificationSettingsRequests from 'types/requests/notificationSettings';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { BASE_WORK_ACTIVITIES_URL } from '@t2crm/wfm-utils/lib/constants/apiUrls';

const getNotificationSettings = (params?: Common.KeyValue) => (
  axios.get<NotificationSettingsResponses.Response>(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/NotificationSettings`, { params },
  )
);

const createNotificationSettings = (
  params: NotificationSettingsRequests.CreateNotificationParams,
) => (
  axios.post(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/NotificationSettings`, params,
  )
);

const modifyNotificationSettings = (
  params: NotificationSettingsRequests.ModifyNotificationParams,
) => (
  axios.put(
    `${BASE_WORK_ACTIVITIES_URL}/api/v1/NotificationSettings`, params,
  )
);

export {
  getNotificationSettings,
  createNotificationSettings,
  modifyNotificationSettings,
};
