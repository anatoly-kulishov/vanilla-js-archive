import { IJwtPayload } from '../..';

type TgetCustomerId = (token: string) => string;

export const getCustomerId: TgetCustomerId = (token) => {
  const [, jwtPayloadBase64] = token.split('.');
  const jwtPayload: IJwtPayload = JSON.parse(atob(jwtPayloadBase64));
  return jwtPayload.sub;
};
