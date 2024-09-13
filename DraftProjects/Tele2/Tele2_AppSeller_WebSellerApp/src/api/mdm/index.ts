import axios from 'axios';
import { MdmService } from './types';

const SERVICE_HOST = process.env.MDM_SERVICE;

const methodsMdmService = {
  getUfmsDivisions: ({ code }: MdmService.GetUfmsDivisions.Request) =>
    axios.get<MdmService.GetUfmsDivisions.Response>(`${SERVICE_HOST}/api/v1/Ufms/${code}`)
};

export default methodsMdmService;
