import { FC, useCallback, useEffect } from 'react';
import {
  Button, Form, Input,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { SearchOutlined } from '@ant-design/icons';
import useStorageFilters from '@t2crm/wfm-utils/lib/hooks/useStorageFilters';

import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { MAX_INN_LENGTH, MAX_INPUT_LENGTH } from 'pages/PartnersPage/constants';
import useDictionaries from 'hooks/useDictionaries';
import { trimObjFields } from 'utils/helpers';
import CustomSelect from 'components/CustomSelect';

const { Item } = Form;

const className = cn('partners-filters');

const filtersMap = new Map([
  ['name', 'nm'],
  ['statusId', 'sidl'],
  ['juridicalTypeId', 'jurtpid'],
  ['INN', 'inn'],
]);

interface FiltersProps {
  onFiltersChange: (filters: Common.KeyValue) => void;
}

const PartnersFilters: FC<FiltersProps> = ({ onFiltersChange }) => {
  const [form] = useForm();
  const {
    statuses,
    juridicalTypes,
  } = useDictionaries(['statuses', 'juridical-types']);

  const [
    initialStorageState,
    setStorageFilters,
  ] = useStorageFilters('admin-partners', filtersMap);

  useEffect(() => {
    form.setFieldsValue(initialStorageState);

    onFiltersChange(initialStorageState);
  }, [form, initialStorageState, onFiltersChange]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      form.submit();
    }
  }, [form]);

  const handleClear = useCallback(() => {
    form.resetFields();
    const formFields = form.getFieldsValue();

    setStorageFilters(formFields);
    onFiltersChange(formFields);
  }, [form, onFiltersChange, setStorageFilters]);

  const handleFinish = useCallback((fields: Common.KeyValue) => {
    const trimmedFields = trimObjFields(fields);

    setStorageFilters(trimmedFields);
    onFiltersChange(trimmedFields);
  }, [onFiltersChange, setStorageFilters]);

  return (
    <Form
      form={form}
      name="wrap"
      layout="vertical"
      onFinish={handleFinish}
      className={className()}
    >
      <div className={className('content')}>
        <Item
          name="name"
          className={className('filter-item')}
          label="Партнер"
        >
          <Input
            allowClear
            onKeyDown={handleKeyDown}
            maxLength={MAX_INPUT_LENGTH}
            suffix={<SearchOutlined />}
          />
        </Item>
        <Item
          name="statusId"
          className={className('filter-item')}
          label="Статус"
        >
          <CustomSelect
            mode="multiple"
            maxTagCount="responsive"
            options={statuses.data}
            loading={statuses.isLoading}
            placeholder="Выберите статус"
          />
        </Item>

        <Item
          name="INN"
          className={className('filter-item')}
          label="ИНН"
        >
          <Input
            allowClear
            onKeyDown={handleKeyDown}
            maxLength={MAX_INN_LENGTH}
            suffix={<SearchOutlined />}
          />
        </Item>

        <Item
          name="juridicalTypeId"
          className={className('filter-item')}
          label="Юридический тип организации"
        >
          <CustomSelect
            mode="multiple"
            maxTagCount="responsive"
            options={juridicalTypes.data}
            loading={juridicalTypes.isLoading}
            placeholder="Выберите юр. тип организации"
          />
        </Item>

        <div className={className('actions')}>
          <Button onClick={handleClear}>Сбросить</Button>
          <Button htmlType="submit" type="primary">Найти</Button>
        </div>
      </div>
    </Form>
  );
};

export default PartnersFilters;
