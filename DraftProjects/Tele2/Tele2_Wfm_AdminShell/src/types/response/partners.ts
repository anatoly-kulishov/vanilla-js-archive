import Common from "@t2crm/wfm-utils/lib/types/common";
import Base from "types/base";

declare namespace PartnersResponse {
  interface Dealer {
    id: number;
    partnerId: number;
    regionId: string;
    region: string;
    channelId: number;
    channel: string;
    name: string;
    fullName: string;
    statusId: number;
    status: string;
    headStaffUnitId: number;
    headStaffUnit: string;
    headPersonId: number;
    headPerson: string;
    createdOn: string;
    createdBy: string;
    juridicalAddress: string;
    actualAddress: string;
    phone: string;
    email: string;
  }

  interface Partner {
    id: number;
    name: string;
    fullName: string;
    juridicalTypeId: number;
    juridicalType: string;
    companyGroupId: number;
    companyGroup: string;
    ogrn: string;
    inn: string;
    headPersonId: number;
    headPerson: string;
    headStaffUnitId: number;
    headStaffUnit: string;
    statusId: number;
    status: string;
    createdOn: string;
    createdBy: string;
    email: string;
  }
  interface PartnerByIdInfo extends Partner {
    address: Base.Address[];
    contacts: Base.Contacts[];
  }

  interface PagablePartners extends Common.PageableResponse {
    partners: Partner[];
  }
}

export default PartnersResponse;
