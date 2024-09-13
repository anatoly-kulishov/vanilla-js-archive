declare namespace ResponseDictionaries {
  export type Dealer = {
    id: number;
    partnerId: number;
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
    juridicalAddress?: string;
    actualAddress?: string;
    phone?: string;
    email?: string;
  };

  export type CompanyGroup = {
    companyGroupId: number;
    name: string;
    fullName: string;
  };

  export type PartnerStatus = {
    id: number;
    name: string;
    description: string;
  };

  export type JuridicalTypes = {
    id: number;
    name: string;
    fullName: string;
  };

  export type Position = {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  };

  export type ContactType = {
    id: number;
    name: string;
    isActive: boolean;
  };

  export type AddressType = {
    id: number;
    name: string;
  };

  export type MacroRegion = {
    id: string;
    nameRus: string;
  };

  export type Region = {
    id: string;
    name: string;
  };

  export type OfficeStatus = {
    id: number;
    name: string;
  };

  export type EmployeeActivity = {
    id: number;
    name: string;
  };

  type AutoOperationsType = {
    autoOperationsTypeId: number;
    autoOperationsTypeName: string;
  };

  type NotificationType = {
    notificationTypeId: number;
    notificationTypeName: string;
  };

  type NotificationCondition = {
    notificationConditionId: number;
    notificationConditionName: string;
  };
}

export default ResponseDictionaries;
