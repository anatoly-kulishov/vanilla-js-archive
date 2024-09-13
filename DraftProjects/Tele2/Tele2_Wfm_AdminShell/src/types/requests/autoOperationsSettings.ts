import Common from '@t2crm/wfm-utils/lib/types/common';

declare namespace AutoOperationsSettingsRequests {
  interface GetSettingsParams extends Partial<Common.PageableRequest> {
    dealerIdList?: number[];
    partnerId?: number;
    employeeActivityIdList?: number[];
    autoOperationsTypeIdList?: number[]
  }

  interface ModifySettingsParams {
    autoOperationsTypeId: number;
    employeeActivityId: number;
    partnerId: number;
    dealerId: number;
    timeLag: number;
  }

  interface DeleteSettingsParams {
    dealerId: number;
    employeeActivityId: number;
    autoOperationsTypeId: number
  }
}

export default AutoOperationsSettingsRequests;
