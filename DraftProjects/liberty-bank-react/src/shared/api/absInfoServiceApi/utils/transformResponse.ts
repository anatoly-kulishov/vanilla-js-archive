import { BankOffice } from '../types';

export const transformBranches = (response: BankOffice[]) => {
  return response.filter((branch) => branch.office_coordinates !== 'string');
};
