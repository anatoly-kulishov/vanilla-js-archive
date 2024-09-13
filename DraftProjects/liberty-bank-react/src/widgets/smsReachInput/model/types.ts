import { Control, FieldErrors } from 'react-hook-form';

export interface SmsFormControls {
  errors: FieldErrors<{ sms: string }>;
  control: Control<{ sms: string }>;
  minutes: number;
  seconds: number;
  sendNewCodeClickHandler: () => void;
}
