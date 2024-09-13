import Common from '@t2crm/wfm-utils/lib/types/common';

declare namespace AutoOperationsSettingsResponses {
  interface Setting {
    partnerId: number,
    partnerName: string,
    dealerId: number,
    dealerName: string,
    employeeActivityId: number,
    employeeActivityName: string,
    autoOperationsTypeId: number,
    autoOperationsTypeName: string,
    timeLag: number
  }

  interface Response extends Common.PageableResponse {
    settings: Setting[];
  }
}

export default AutoOperationsSettingsResponses;
