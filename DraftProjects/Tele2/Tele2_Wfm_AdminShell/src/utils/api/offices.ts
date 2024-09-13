import axios from 'axios';
import OfficesResponse from 'types/response/offices';
import type Common from '@t2crm/wfm-utils/lib/types/common';
import {
  BASE_SALES_OFFICES_URL,
  BASE_WORK_MODES_URL,
} from '@t2crm/wfm-utils/lib/constants/apiUrls';
import PatternsResponse from 'types/response/patterns';
import PatternsRequest from 'types/requests/patterns';
import OfficesRequest from 'types/requests/offices';

export const getOffices = (filters?: Common.KeyValue) => (
  axios.get<OfficesResponse.Offices>(
    `${BASE_SALES_OFFICES_URL}/api/v1/Offices`, { params: filters },
  )
);

export const getOfficeById = (id: number) => (
  axios.get<OfficesResponse.OfficeByIdInfo>(
    `${BASE_SALES_OFFICES_URL}/api/v1/Offices/${id}`,
  )
);

export const getAllPatterns = (filters: Common.KeyValue) => (
  axios.get<PatternsResponse.ShortPattern[]>(
    `${BASE_WORK_MODES_URL}/api/v1/Patterns`,
    { params: filters },
  )
);

export const getPatternsForOffice = (officeId: number) => (
  axios.get<PatternsResponse.Patterns>(
    `${BASE_WORK_MODES_URL}/api/v1/Patterns/${officeId}`,
  )
);

export const getPatternsForOfficeDay = (officeId: number, day: string) => (
  axios.get<PatternsResponse.WeekDay>(
    `${BASE_WORK_MODES_URL}/api/v1/Weekdays/${officeId}/${day}`,
  )
);

export const createPattern = (newPattern: PatternsRequest.NewPattern) => (
  axios.post<number>(
    `${BASE_WORK_MODES_URL}/api/v1/Patterns`,
    newPattern,
  )
);

export const setPattern = (
  officeId: number,
  params: PatternsRequest.SetPatternParams,
) => (
  axios.put<number>(
    `${BASE_SALES_OFFICES_URL}/localapi/v1/Offices/${officeId}`,
    params,
  )
);

export const setManagerEmployee = (params: OfficesRequest.CreateOrModifyManagerEmployeeParams) => (
  axios.put<number>(
    `${BASE_SALES_OFFICES_URL}/localapi/v1/Offices/Manager`,
    params,
  )
);

export const downloadSalesOfficesTemplate = () => (
  axios.get<Blob>(`${BASE_SALES_OFFICES_URL}/api/v1/Templates/SaleOffice`, {
    responseType: 'blob',
  })
);

export const downloadRecommendedEmployeesNumberTemplate = () => (
  axios.get<Blob>(`${BASE_SALES_OFFICES_URL}/api/v1/Templates/EmployeesRecommendedNumber`, {
    responseType: 'blob',
  })
);

export const uploadOffices = (files: FormData) => (
  axios.put(`${BASE_SALES_OFFICES_URL}/api/v1/Offices`, files)
);

export const uploadEmployeesRecommendedNumber = (files: FormData) => (
  axios.put(`${BASE_SALES_OFFICES_URL}/api/v1/Offices/EmployeesRecommendedNumber`, files)
);
