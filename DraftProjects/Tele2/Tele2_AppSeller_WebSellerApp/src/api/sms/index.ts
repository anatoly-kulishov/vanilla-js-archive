import axios from 'axios';
import { SmsService } from './types';

const SERVICE_HOST = process.env.SMS_SERVICE;

const methodsSmsService = {
  sendSms: (data: SmsService.SendSms.Request) => axios.post(`${SERVICE_HOST}/sms/AddSms`, data)
};

export default methodsSmsService;
