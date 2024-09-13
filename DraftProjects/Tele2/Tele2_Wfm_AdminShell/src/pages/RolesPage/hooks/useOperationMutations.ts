import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { createOperation, deleteOperation } from 'utils/api/roles';

const useOperationMutations = () => {
  const client = useQueryClient();

  const createOperationMutation = useMutation(createOperation, {
    onSuccess: () => {
      client.invalidateQueries('selected-role');
    },
    onError: (errorResponse: AxiosError['response']) => {
      createOperationMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  const deleteOperationMutation = useMutation(deleteOperation, {
    onSuccess: () => {
      client.invalidateQueries('selected-role');
    },
    onError: (errorResponse: AxiosError['response']) => {
      deleteOperationMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    createOperationMutation,
    deleteOperationMutation,
  };
};

export default useOperationMutations;
