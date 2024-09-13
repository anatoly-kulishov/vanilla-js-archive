export const EMAIL_REGEXP =
  // eslint-disable-next-line max-len
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const PHONE_WITH_MASK_REGEXP =
  /^(([87])[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{11}$/

export const ICC_MASK_REGEXP =
  /(^$)|(^[0-9]{20}$)/

export const PERSONAL_ACCOUNT_NAME_REGEXP =
  /(^$)|(^[0-9]{1,10}$)/

export const DOCUMENT_NUMBER_REGEXP =
  /(^$)|(^[0-9]{5,12}$)/

export const INN_REGEXP =
  /(^$)|(^[0-9]{10,12}$)/

export const OGRN_REGEXP =
  /(^$)|(^[0-9]{13,15}$)/

export const SUPERVISOR_DOCUMENT_NUMBER_REGEXP =
  /(^$)|(^[0-9]{5,12}$)/
