import { InputText } from './ui/InputText/InputText';
import { InputSearch } from './ui/InputSearch/InputSearch';
import { InputPassword } from './ui/InputPassword/InputPassword.tsx';
import { InputSelect } from './ui/InputSelect/InputSelect.tsx';
import { InputCheckbox } from './ui/InputCheckbox/InputCheckbox.tsx';
import { InputSMS } from './ui/InputSMS/InputSMS.tsx';
import { InputDate } from './ui/InputDate/InputDate.tsx';
import { InputNumber } from './ui/InputNumber/InputNumber.tsx';
import { InputEmail } from './ui/InputEmail/InputEmail.tsx';
import { InputTel } from './ui/InputTel/InputTel.tsx';
import type { IInputProps } from './model/newTypes.ts';

export const Input: IInputProps = {
  Select: InputSelect,
  Search: InputSearch,
  SMS: InputSMS,
  Password: InputPassword,
  Text: InputText,
  Checkbox: InputCheckbox,
  Date: InputDate,
  Number: InputNumber,
  Email: InputEmail,
  Tel: InputTel,
};

InputSelect.displayName = 'Input.Select';
InputSearch.displayName = 'Input.Search';
InputSMS.displayName = 'Input.SMS';
InputPassword.displayName = 'Input.Password';
InputText.displayName = 'Input.Text';
InputCheckbox.displayName = 'Input.Checkbox';
InputDate.displayName = 'Input.Date';
InputNumber.displayName = 'Input.Number';
InputEmail.displayName = 'Input.Email';
InputTel.displayName = 'Input.Tel';
