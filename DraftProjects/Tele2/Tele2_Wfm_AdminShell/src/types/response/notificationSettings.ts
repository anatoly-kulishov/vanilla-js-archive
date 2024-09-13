import Common from '@t2crm/wfm-utils/lib/types/common';

declare namespace NotificationSettingsResponses {
  interface Setting {
    notificationSettingsId: number;
    partnerId: number;
    partnerName: string;
    dealerId: number;
    dealerName: string;
    notificationConditionId: number;
    notificationConditionName: string;
    isActive: boolean;
    timeLag: number;
  }

  interface Response extends Common.PageableResponse {
    settings: Setting[];
  }
}

export default NotificationSettingsResponses;
