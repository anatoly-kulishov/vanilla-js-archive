import { AddressOptionsType } from '../model/types';
import { URL, HEADERS } from './constants';

export const fetchAddressSuggest = (
  query: string,
  type: string,
  addressOptions: AddressOptionsType,
) => {
  const body = JSON.stringify({
    query,
    // eslint-disable-next-line camelcase
    from_bound: { value: type },
    // eslint-disable-next-line camelcase
    to_bound: { value: type },
    locations: { ...addressOptions },
  });

  const responce = fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: HEADERS,
    body,
  });

  return responce;
};
