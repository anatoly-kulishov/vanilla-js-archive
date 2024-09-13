declare namespace Uploads {
  type StatisticDataError = {
    officeId: number;
    parameter: string;
    sheet: string;
    errorMessage: string;
    operDate: string;
  };
}

export default Uploads;
