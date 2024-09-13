import { Input, Radio, Switch, InputNumber, Select } from 'antd'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
const { Group: RadioGroup } = Radio

export const MsisdnType = 'MSISDN'

export const controls = {
  Input: Input.TextArea,
  InputNumber: InputNumber,
  RadioGroup: RadioGroup,
  Checkbox: Switch,
  Msisdn: MsisdnMaskedInput,
  Select: Select
}

export default {
  controls
}
