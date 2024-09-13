import { useQuery } from 'react-query';
import OfficesResponse from 'types/response/offices';
import { getPatternsForOfficeDay } from 'utils/api/offices';

const useOfficePattern = (
  officeInfo: OfficesResponse.OfficeByIdInfo | undefined,
  day: string,
) => {
  const data = useQuery({
    queryKey: ['workTimePattern', officeInfo?.id, day],
    enabled: (
      officeInfo !== undefined
      && officeInfo.workTimePatternId !== undefined && officeInfo.workTimePatternId !== null
    ),
    queryFn: () => (
      officeInfo
      && getPatternsForOfficeDay(officeInfo?.workTimePatternId as number, day).then((response) => (
        response.data
      ))
    ),
  });

  return data;
};

export default useOfficePattern;
