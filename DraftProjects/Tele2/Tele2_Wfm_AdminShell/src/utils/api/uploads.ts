import axios from 'axios';
import { BASE_FORECAST_PARAMETERS_LOAD_URL } from '@t2crm/wfm-utils/lib/constants/apiUrls';
import Common from '@t2crm/wfm-utils/lib/types/common';
import Uploads from 'types/response/uploads';

export const uploadStatisticData = (params: Common.KeyValue) => (
  axios.post<Uploads.StatisticDataError[]>(
    `${BASE_FORECAST_PARAMETERS_LOAD_URL}/api/v1/Parameters`, params,
  )
);

export const uploadDayHandling = (params: Common.KeyValue) => (
  axios.post(`${BASE_FORECAST_PARAMETERS_LOAD_URL}/api/v1/DayHandling`, params)
);

export const uploadDayEmployee = (params: Common.KeyValue) => (
  axios.post(`${BASE_FORECAST_PARAMETERS_LOAD_URL}/api/v1/DayEmployee`, params)
);
