import { InputCheckbox } from '../ui/InputCheckbox/InputCheckbox';
import { InputDate } from '../ui/InputDate/InputDate';
import { InputNumber } from '../ui/InputNumber/InputNumber';
import { InputPassword } from '../ui/InputPassword/InputPassword';
import { InputSearch } from '../ui/InputSearch/InputSearch';
import { InputSelect } from '../ui/InputSelect/InputSelect';
import { InputSMS } from '../ui/InputSMS/InputSMS';
import { InputText } from '../ui/InputText/InputText';
import { InputEmail } from '../ui/InputEmail/InputEmail.tsx';
import { InputTel } from '../ui/InputTel/InputTel.tsx';

export interface IInputProps {
  Search: typeof InputSearch;
  Password: typeof InputPassword;
  Text: typeof InputText;
  Select: typeof InputSelect;
  Checkbox: typeof InputCheckbox;
  SMS: typeof InputSMS;
  Date: typeof InputDate;
  Number: typeof InputNumber;
  Email: typeof InputEmail;
  Tel: typeof InputTel;
}
