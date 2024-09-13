import axios from 'axios';

import { SalesOfficeLimitationsService } from 'api/salesOfficeLimitations/types';

const SERVICE_HOST = process.env.SALES_OFFICE_LIMITATIONS_SERVICE;

const methodsSalesOfficeLimitationsService = {
  getActiveSalesOffice: () =>
    axios.get<SalesOfficeLimitationsService.GetActiveSalesOffice.Response>(
      `${SERVICE_HOST}/api/v1/ActiveSalesOffice`
    ),
  changeActiveSalesOffice: ({
    officeId
  }: SalesOfficeLimitationsService.ChangeActiveSalesOffice.Request) =>
    axios.post<SalesOfficeLimitationsService.ChangeActiveSalesOffice.Response>(
      `${SERVICE_HOST}/api/v2/ActiveSalesOffice/${officeId}`
    ),
  getActiveSalesOfficeStatus: (
    params: SalesOfficeLimitationsService.GetActiveSalesOfficeStatus.Request
  ) =>
    axios.get<SalesOfficeLimitationsService.GetActiveSalesOfficeStatus.Response>(
      `${SERVICE_HOST}/api/v1/ActiveSalesOffice/Status`,
      { params }
    )
};

export default methodsSalesOfficeLimitationsService;
