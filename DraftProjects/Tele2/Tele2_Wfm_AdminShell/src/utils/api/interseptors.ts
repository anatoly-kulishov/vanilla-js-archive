import axios from 'axios';
import { notification } from 'antd';
import getApiGetParams from '@t2crm/wfm-utils/lib/utils/getApiGetParams';

export const initInterceptors = (signOutRedirect: () => void) => {
  axios.interceptors.response.use(
    (response) => {
      if (response.status >= 200 && response.status < 300) {
        if (['put', 'post', 'delete'].includes(response.config?.method?.toLowerCase() ?? '')) {
          notification.success({
            message: 'Изменение сохранено',
            placement: 'bottomRight',
          });
        }
      }

      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        signOutRedirect();
      }
      notification.error({
        message: error.response?.data?.message ?? 'Ошибка запроса',
        placement: 'bottomRight',
      });
      return Promise.reject(error.response);
    },
  );
};

export const initAxiosConfigs = () => {
  axios.defaults.paramsSerializer = getApiGetParams;
};

export const setAuthHeader = (token?: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    Error('Can`t found session token or storage for session info');
  }
};
