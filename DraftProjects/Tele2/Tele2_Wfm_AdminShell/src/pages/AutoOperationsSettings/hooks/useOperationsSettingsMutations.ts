import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { deleteOperationSettings, modifyOperationSettings } from 'utils/api/autoOperationsSettings';

const useOperationsSettingsMutations = () => {
  const client = useQueryClient();

  const deleteSettings = useMutation(deleteOperationSettings, {
    onSuccess: () => {
      client.invalidateQueries('operations-settings');
    },
    onError: (errorResponse: AxiosError['response']) => {
      deleteSettings.reset();
      return Promise.reject(errorResponse);
    },
  });

  const modifySettings = useMutation(modifyOperationSettings, {
    onSuccess: () => {
      client.invalidateQueries('operations-settings');
    },
    onError: (errorResponse: AxiosError['response']) => {
      modifySettings.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    modifySettings,
    deleteSettings,
  };
};

export default useOperationsSettingsMutations;
