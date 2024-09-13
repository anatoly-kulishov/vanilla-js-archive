import { useCallback, useEffect, useState } from 'react';
import { FormInstance } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { debounce } from 'lodash';

export enum ValidationMessage {
  PATTERN = 'Недопустимое значение',
  MIN_LENGTH = 'Минимальное допустимое количество символов',
  MAX_LENGTH = 'Превышена допустимая длина',
  REQUIRED = 'Обязательный параметр',
  FIELD_RESTRICTIONS = 'Ограчения поля',
  INVALID_IDENTITY_DOCUMENT = 'Паспорт недействителен',
  INVALID_STAYING_DOCUMENT = 'Дата окончания действия документа меньше текущей даты',
  INVALID_MIGRATION_DATES = 'Дата начала пребывания не может быть позже сегодняшней даты',
}

export const getFormFieldName = ({
  fieldName,
  parentFormName
}: {
  fieldName: string;
  parentFormName?: string;
}) => (parentFormName ? [parentFormName, fieldName] : fieldName);

export const setFormFieldValues = ({
  form,
  fields,
  parentFormName
}: {
  form: FormInstance;
  fields: Array<[string, unknown]>;
  parentFormName?: string;
}) => {
  if (parentFormName) {
    const allValues = form.getFieldsValue();
    const currentFormValues = allValues[parentFormName];
    fields.forEach(([fieldName, value]) => {
      currentFormValues[fieldName] = value;
    });
    form.setFieldsValue(allValues);
  } else {
    const currentValues = form.getFieldsValue();
    fields.forEach(([fieldName, value]) => {
      currentValues[fieldName] = value;
    });
    form.setFieldsValue(currentValues);
  }
};

export const useSearchInputValidation = ({
  form,
  fieldName,
  results,
  isLoading
}: {
  form: FormInstance;
  fieldName: NamePath;
  results: Array<unknown> | null;
  isLoading: boolean;
}) => {
  const [query, setQuery] = useState(() => form.getFieldValue(fieldName));

  useEffect(() => {
    if (query && results && !isLoading) {
      form?.validateFields([fieldName]);
    }
  }, [query, isLoading, results]);

  const onChangeQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  return { query, onChangeQuery };
};

export const useDebouncedSearch = ({
  minLengthQuery = 3,
  msDebounce = 250,
  search,
  deps = []
}: {
  minLengthQuery?: number;
  msDebounce?: number;
  search: (query: string) => void;
  deps?: Array<unknown>;
}) =>
  useCallback(
    debounce((query?: string) => {
      if (query && query.length >= minLengthQuery) {
        search(query);
      }
    }, msDebounce),
    deps
  );
