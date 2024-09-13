import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { createDealer, modifyDealer } from 'utils/api/dealers';

const useDealersMutations = (updateList: () => void) => {
  const createDealerMutation = useMutation(createDealer, {
    onSuccess: () => {
      updateList();
    },
    onError: (errorResponse: AxiosError['response']) => {
      createDealerMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  const modifyDealerMutation = useMutation(modifyDealer, {
    onSuccess: () => {
      updateList();
    },
    onError: (errorResponse: AxiosError['response']) => {
      modifyDealerMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    createDealerMutation,
    modifyDealerMutation,
  };
};

export default useDealersMutations;
