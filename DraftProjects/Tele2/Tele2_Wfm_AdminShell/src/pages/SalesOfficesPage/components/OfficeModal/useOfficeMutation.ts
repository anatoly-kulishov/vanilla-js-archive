import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import PatternsRequest from 'types/requests/patterns';
import { setManagerEmployee, setPattern } from 'utils/api/offices';

const useOfficeMutations = () => {
  const client = useQueryClient();

  const modifyMangerEmployeeMutation = useMutation(setManagerEmployee, {
    onError: (errorResponse: AxiosError['response']) => {
      modifyMangerEmployeeMutation.reset();
      return Promise.reject(errorResponse);
    },
  });

  const modifyOfficeMutation = useMutation(
    'modify-office',
    (variables: PatternsRequest.SetPatternParams & { officeId: number }) => {
      const { officeId, ...restParams } = variables;
      return setPattern(officeId, restParams);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['employees']);
      },
      onError: (errorResponse: AxiosError['response']) => {
        modifyOfficeMutation.error = errorResponse;
        return Promise.reject(errorResponse);
      },
    },
  );

  return {
    modifyMangerEmployeeMutation,
    modifyOfficeMutation,
  };
};

export default useOfficeMutations;
