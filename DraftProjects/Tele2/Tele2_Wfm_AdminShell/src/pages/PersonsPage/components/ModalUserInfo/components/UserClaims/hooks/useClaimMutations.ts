import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { createUserClaim, deleteUserClaim } from 'utils/api/auth';

const useClaimMutations = () => {
  const client = useQueryClient();

  const createClaimMutation = useMutation(createUserClaim, {
    onSuccess: () => {
      client.invalidateQueries('user-claims');
    },
    onError: (errorResponse: AxiosError['response']) => {
      createClaimMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  const deleteClaimMutation = useMutation(deleteUserClaim, {
    onSuccess: () => {
      client.invalidateQueries('user-claims');
    },
    onError: (errorResponse: AxiosError['response']) => {
      deleteClaimMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    createClaimMutation,
    deleteClaimMutation,
  };
};

export default useClaimMutations;
