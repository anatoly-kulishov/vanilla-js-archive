import { Input, Radio, Checkbox, InputNumber, Select } from 'antd'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
const { Group: RadioGroup } = Radio

export const MsisdnType = 'MSISDN'
export const CheckboxType = 'Checkbox'

export const controls = {
  Input: Input.TextArea,
  InputNumber: InputNumber,
  RadioGroup: RadioGroup,
  Checkbox: Checkbox,
  Msisdn: MsisdnMaskedInput,
  Select: Select
}

export default {
  controls
}
