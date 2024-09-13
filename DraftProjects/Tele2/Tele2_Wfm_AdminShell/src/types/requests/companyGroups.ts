declare namespace CompanyGroupsRequests {
  interface CreateCompanyGroupParams {
    name?: string;
    fullName: string;
  }

  interface ModifyCompanyGroupParams {
    id: number;
    name?: string;
    fullName: string;
  }
}

export default CompanyGroupsRequests;
