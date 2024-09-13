import axios from 'axios';
import { PersonalInfoService } from './types';

const SERVICE_HOST = process.env.PERSONAL_INFO_SERVICE;

const methodsPersonalInfoService = {
  getDataSubscriber: (params: PersonalInfoService.GetDataSubscriber.Request) =>
    axios.get<PersonalInfoService.GetDataSubscriber.Response>(
      `${SERVICE_HOST}/AdditionalInfo/GetSubscriberData`,
      { params }
    ),

  sendPepAgree: (data: PersonalInfoService.SendPepAgree.Request) =>
    axios.post(`${SERVICE_HOST}/Pep/SendAgree`, data)
};

export default methodsPersonalInfoService;
