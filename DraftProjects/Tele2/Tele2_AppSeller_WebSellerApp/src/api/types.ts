import { PepService as PepServiceTypes } from './pep/types';
import { SmsService as SmsServiceTypes } from './sms/types';
import { PersonalInfoService as PersonalInfoServiceTypes } from './personalInfo/types';
import { DocumentService as DocumentServiceTypes } from './document/types';

export type ErrorResponse = {
  message: string;
  bCode: number;
  warnings: Array<string>;
  stackTrace: string;
};

export namespace Api {
  export import PepService = PepServiceTypes;
  export import SmsService = SmsServiceTypes;
  export import PersonalInfoService = PersonalInfoServiceTypes;
  export import DocumentService = DocumentServiceTypes;
}
