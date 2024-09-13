import axios from 'axios';
import { PepService } from './types';

const SERVICE_HOST = process.env.PEP_SERVICE;

const methodsPepService = {
  getClientsPep: (body: PepService.GetClientsPep.Request) =>
    axios.post<PepService.GetClientsPep.Response>(`${SERVICE_HOST}/api/v1/clients/pep`, body),

  sendPepCode: (body: PepService.SendPepCode.Request) =>
    axios.post<PepService.SendPepCode.Response>(`${SERVICE_HOST}/api/v1/pep/code`, body),

  checkPepCode: (msisdn: string, body: PepService.CheckPepCode.Request) =>
    axios.post<PepService.CheckPepCode.Response>(
      `${SERVICE_HOST}/api/v1/Pep/${msisdn}/code/isChecked`,
      body
    )
};

export default methodsPepService;
