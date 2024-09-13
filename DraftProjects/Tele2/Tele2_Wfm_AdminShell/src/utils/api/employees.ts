import axios from 'axios';
import EmployeesResponse from 'types/response/employees';
import { BASE_EMPLOYEES_URL } from '@t2crm/wfm-utils/lib/constants/apiUrls';

export const getEmployees = (partnerId: number) => (
  axios.get<EmployeesResponse.Employee[]>(
    `${BASE_EMPLOYEES_URL}/api/v1/Employees/${partnerId}`,
  )
);

export default {
  getEmployees,
};
