import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { createRole } from 'utils/api/roles';

const useRoleMutations = () => {
  const client = useQueryClient();

  const createRoleMutation = useMutation(createRole, {
    onSuccess: () => {
      client.invalidateQueries('roles');
    },
    onError: (errorResponse: AxiosError['response']) => {
      createRoleMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    createRoleMutation,
  };
};

export default useRoleMutations;
