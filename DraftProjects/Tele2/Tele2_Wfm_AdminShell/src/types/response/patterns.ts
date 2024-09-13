declare namespace PatternsResponse {
  export type LunchBrake = {
    id: number;
    begin: string;
    end: string;
  };

  export type WeekDay = {
    id: number;
    name: string;
    workType: string;
    workTimeBegin?: string;
    workTimeEnd?: string;
    lunchBreaks?: LunchBrake[];
  };

  export type Patterns = {
    id: number;
    type: string;
    description: string;
    weekdays: WeekDay[];
  };

  export type ShortPattern = {
    patternId: number;
    description: string;
  };
}

export default PatternsResponse;
