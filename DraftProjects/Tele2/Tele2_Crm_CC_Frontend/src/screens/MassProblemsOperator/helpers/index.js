import { CHANNELED_TO_DEFAULT_MAPPING } from 'constants/massProblems'
import get from 'lodash/get'

const getValueByCondition = (isChannelIncluded, record, field, channel) => {
  const defaultMtpFieldName = CHANNELED_TO_DEFAULT_MAPPING[field]
  const defaultMtpValue = record?.[defaultMtpFieldName]
  const attributesForInterfacesValue = get(record, `AttributesForInterfaces.${channel}.${field}`, undefined)

  return isChannelIncluded && attributesForInterfacesValue ? attributesForInterfacesValue : defaultMtpValue
}

export const getChanneledMtpValue = (record, field, selectedServiceChannelInterface = 'crm') => {
  const isChannelIncluded = record?.ServiceChannelInterface?.includes(selectedServiceChannelInterface)
  const value = getValueByCondition(isChannelIncluded, record, field, selectedServiceChannelInterface)

  return value
}
