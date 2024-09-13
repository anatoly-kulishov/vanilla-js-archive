import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { createNotificationSettings, modifyNotificationSettings } from 'utils/api/notificationSettings';

const useNotificationSettingsMutations = () => {
  const client = useQueryClient();

  const createSettings = useMutation(createNotificationSettings, {
    onSuccess: () => {
      client.invalidateQueries('notification-settings');
    },
    onError: (errorResponse: AxiosError['response']) => {
      createSettings.reset();
      return Promise.reject(errorResponse);
    },
  });

  const modifySettings = useMutation(modifyNotificationSettings, {
    onSuccess: () => {
      client.invalidateQueries('notification-settings');
    },
    onError: (errorResponse: AxiosError['response']) => {
      modifySettings.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    modifySettings,
    createSettings,
  };
};

export default useNotificationSettingsMutations;
