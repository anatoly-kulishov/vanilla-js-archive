export namespace SmsService {
  export namespace SendSms {
    export type Request = {
      Msisdn: string;
      SenderSms: 'Tele2';
      ScriptInforming: '100000004';
      BillingBranch: number;
      Text: string;
      IgnoreAdvertisingAgreement: boolean;
      IgnorePeriodOfSilence: boolean;
      CreateInteractionParams: {
        SubscriberId: number;
        HandlingId: string;
      };
    };
  }
}
