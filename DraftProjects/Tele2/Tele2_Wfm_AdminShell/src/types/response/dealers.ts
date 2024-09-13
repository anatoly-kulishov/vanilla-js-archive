import Base from 'types/base';

declare namespace DealersResponse {
  interface DealerByIdInfo {
    id: number;
    partnerId: number;
    partner: string;
    regionId: string;
    region: string;
    channelId?: number;
    channel?: number;
    name?: string;
    fullName: string;
    statusId: number;
    status: string;
    headStaffUnitId?: number;
    headStaffUnit?: string;
    headPersonId?: number;
    headPerson?: string;
    createdOn: string;
    createdBy: string;
    address: Base.Address[];
    contacts: Base.Contacts[];
  }

}

export default DealersResponse;
