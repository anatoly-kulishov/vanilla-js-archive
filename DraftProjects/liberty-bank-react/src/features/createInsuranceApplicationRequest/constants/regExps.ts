/* eslint no-useless-escape: 0 */

export const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/;
export const PHONE_MASK = '+7 (***) *** ** **';
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASSPORT_MASK = '** ** ******';
export const PASSPORT_REGEX = /\d{2}\s\d{2}\s\d{6}/;
export const ID_MASK = /^[\w\s]+$/;
export const REFUGEE_CERTIFICATE_MASK = '** *******';
export const REFUGEE_CERTIFICATE_REGEX = /\d{2}\s\d{7}/;
export const RESIDENT_CARD_MASK = '**№*******';
export const RESIDENT_CARD_REGEX = /\d{2}№\d{7}/;
