import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { createCompanyGroup, modifyCompanyGroup } from 'utils/api/companyGroups';

const useCompanyGroupMutations = (updateList: () => void) => {
  const createCompanyGroupMutation = useMutation(createCompanyGroup, {
    onSuccess: () => {
      updateList();
    },
    onError: (errorResponse: AxiosError['response']) => {
      createCompanyGroupMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  const modifyCompanyGroupMutation = useMutation(modifyCompanyGroup, {
    onSuccess: () => {
      updateList();
    },
    onError: (errorResponse: AxiosError['response']) => {
      modifyCompanyGroupMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  return {
    createCompanyGroupMutation,
    modifyCompanyGroupMutation,
  };
};

export default useCompanyGroupMutations;
