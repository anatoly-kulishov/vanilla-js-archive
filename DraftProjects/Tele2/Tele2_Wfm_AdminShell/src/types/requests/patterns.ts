import PatternsResponse from 'types/response/patterns';

declare namespace PatternsRequest {
  export type NewPattern = {
    description: string;
    weekData: Omit<PatternsResponse.WeekDay, 'id'>[];
  };

  export type SetPatternParams = Partial<{
    WorkTimePatternId: number;
    Description: string;
    officeCoordinateLatitude: number;
    officeCoordinateLongitude: number;
  }>;
}

export default PatternsRequest;
