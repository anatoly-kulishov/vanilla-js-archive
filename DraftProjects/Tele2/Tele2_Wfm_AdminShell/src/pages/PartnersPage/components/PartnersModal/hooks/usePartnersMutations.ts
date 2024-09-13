import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { createPartner, modifyPartner } from 'utils/api/partners';

const usePartnersMutations = (updateList: () => void) => {
  const createPartnerMutation = useMutation(createPartner, {
    onSuccess: () => {
      updateList();
    },
    onError: (errorResponse: AxiosError['response']) => {
      createPartnerMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  const modifyPartnerMutation = useMutation(modifyPartner, {
    onSuccess: () => {
      updateList();
    },
    onError: (errorResponse: AxiosError['response']) => {
      modifyPartnerMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    createPartnerMutation,
    modifyPartnerMutation,
  };
};

export default usePartnersMutations;
