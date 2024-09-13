import Common from '@t2crm/wfm-utils/lib/types/common';

declare namespace NotificationSettingsRequests {
  interface Filters {
    dealerIdList: number[];
    notificationConditionIdList: number[];
    textField: string;
    isActive: boolean;
  }

  interface GetNotificationsParams extends Partial<Filters>, Common.PageableRequest {
    partnerId: number;
  }

  interface CreateNotificationParams {
    partnerId: number;
    dealerId: number;
    notificationConditionId: number;
    isActive: boolean;
    timeLag?: number;
  }

  interface ModifyNotificationParams extends CreateNotificationParams {
    notificationSettingsId: number;
  }
}

export default NotificationSettingsRequests;
