import { MILLISECOND_IN_SECOND } from '../..';

type TCheckToken = (token: string) => boolean;

export const checkTokenExpire: TCheckToken = (token) => {
  const jwtPayloadBase64 = token.split('.')[1];
  const payload: number = JSON.parse(atob(jwtPayloadBase64)).exp;
  return payload * MILLISECOND_IN_SECOND - +new Date() < 0;
};
