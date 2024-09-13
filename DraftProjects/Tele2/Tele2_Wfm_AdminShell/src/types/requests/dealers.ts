import Base from 'types/base';

declare namespace DealersRequest {

  interface CreateOrModifyParams {
    id: number;
    partnerId: number;
    partner: string;
    regionId: string;
    channelId?: number;
    name: string;
    fullName: string;
    statusId: number;
    headPerson?: string;
    headStaffUnitId?: number;
    headStaffUnit?: string;
    departmentId?: number;
    department?: string;
    address?: Base.Address[];
    contacts?: Base.Contacts[];
  }

}

export default DealersRequest;
