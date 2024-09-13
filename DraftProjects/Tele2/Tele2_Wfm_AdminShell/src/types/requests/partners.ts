import Base from 'types/base';

declare namespace PartnersRequest {

  interface CreateOrModifyPartnerParams {
    id: string;
    name?: string;
    fullName: string;
    juridicalTypeId: number;
    companyGroupId?: number;
    companyGroup?: string;
    ogrn: string;
    inn: string;
    headPerson?: string;
    headStaffUnitId?: number;
    headStaffUnit?: string;
    statusId: number;
    address?: Base.Address[];
    contacts?: Base.Contacts[];
  }
}

export default PartnersRequest;
