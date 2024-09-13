import axios from 'axios';
import type Common from '@t2crm/wfm-utils/lib/types/common';
import type ResponsePerson from 'types/response/persons';
import type RequestPersons from 'types/requests/persons';
import { BASE_MIGRATIONS_URL, BASE_PERSONS_URL } from '@t2crm/wfm-utils/lib/constants/apiUrls';

export const getPersons = (filters: Common.KeyValue) => (
  axios.get<ResponsePerson.Person[]>(
    `${BASE_PERSONS_URL}/api/v1/Persons`, { params: filters },
  )
);

export const uploadPersons = (data: RequestPersons.UploadFiles) => (
  axios.post(`${BASE_MIGRATIONS_URL}/api/v1/Migrations`, data)
);

export const downloadTemplate = () => (
  axios.get<Blob>(`${BASE_MIGRATIONS_URL}/api/v1/Migrations/Template`, {
    responseType: 'blob',
  })
);
