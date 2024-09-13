import axios from 'axios';

import { DealerInfoService } from 'api/dealerInfo/types';

const SERVICE_HOST = process.env.DEALER_INFO_SERVICE;

const methodsDealerInfoService = {
  getSalesOfficeInfo: ({ officeId }: DealerInfoService.GetSalesOfficeInfo.Request) =>
    axios.get<DealerInfoService.GetSalesOfficeInfo.Response>(
      `${SERVICE_HOST}/api/v1/Offices/${officeId}`
    ),
  getSalesOfficeBranches: ({ officeId }: DealerInfoService.GetSalesOfficeBranches.Request) =>
    axios.get<DealerInfoService.GetSalesOfficeBranches.Response>(
      `${SERVICE_HOST}/api/v1/Offices/${officeId}/Branches`
    )
};

export default methodsDealerInfoService;
