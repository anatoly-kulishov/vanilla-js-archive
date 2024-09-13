import {
  FC,
  useEffect,
  useCallback,
} from 'react';
import {
  Form,
  Button,
  Input,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DefaultOptionType } from 'antd/lib/select';
import isNil from 'lodash.isnil';

import useStorageFilters from '@t2crm/wfm-utils/lib/hooks/useStorageFilters';

import type Common from '@t2crm/wfm-utils/lib/types/common';
import cn from '@t2crm/wfm-utils/lib/utils/cn';

import './styles.less';
import CustomSelect from 'components/CustomSelect';

const { useForm, Item } = Form;

const className = cn('persons-filters');

export type FiltersProps = {
  updateActiveFilters: (filters: Common.KeyValue) => void;
};

const prepareStorageFilters = (filters: Common.KeyValue): Common.KeyValue => ({
  ...filters,
  dealerIdList: (
    filters.dealerIdList && !Array.isArray(filters.dealerIdList)
      ? [filters.dealerIdList]
      : filters.dealerIdList
  ),
});

const filtersMap = new Map([
  ['Name', 'nm'],
  ['MobilePhone', 'ph'],
  ['Email', 'em'],
  ['Status', 'sts'],
  ['Login', 'lg'],
]);

const statuses: DefaultOptionType[] = [
  { value: 'active', label: 'Активные' },
  { value: 'nonActive', label: 'Неактивные' },
  { value: 'all', label: 'Все' },
];

const Filters: FC<FiltersProps> = ({ updateActiveFilters }) => {
  const [initialFilters, setStorageFilters] = useStorageFilters(
    'admin-shell-persons',
    filtersMap,
    { prepareFilters: prepareStorageFilters },
  );
  const [form] = useForm();

  const getFiltersWithStatus = (filters: Common.KeyValue) => {
    if (isNil(filters?.Status)) {
      return filters;
    }
    const { Status, ...restFilters } = filters;

    if (Status === 'all') {
      return restFilters;
    }

    return {
      ...restFilters,
      isActive: Status === 'active' ? true : 'false',
    };
  };

  useEffect(() => {
    form.setFieldsValue(initialFilters);
    const newValues = getFiltersWithStatus(initialFilters);

    updateActiveFilters(newValues);
  }, [initialFilters, form, updateActiveFilters]);

  const handleSetFilters = useCallback((values: Common.KeyValue) => {
    const newValues = getFiltersWithStatus(values);

    setStorageFilters(values);
    updateActiveFilters(newValues);
  }, [setStorageFilters, updateActiveFilters]);

  useEffect(() => {
    if (Object.keys(initialFilters).length) {
      return;
    }
    form.setFieldsValue({ Status: statuses[2].value });
    const actualFormState = form.getFieldsValue();

    handleSetFilters(actualFormState);
  }, [form, handleSetFilters, initialFilters]);

  const handleClearFilters = useCallback(() => {
    form.resetFields();

    const emptyState = form.getFieldsValue();

    setStorageFilters(emptyState);
    updateActiveFilters(emptyState);
  }, [form, setStorageFilters, updateActiveFilters]);

  return (
    <div className={className()}>
      <Form
        form={form}
        onFinish={handleSetFilters}
        className={className('content')}
        layout="vertical"
      >
        <Item name="Name" label="Имя">
          <Input suffix={<SearchOutlined />} maxLength={255} />
        </Item>
        <Item name="Email" label="Почта">
          <Input suffix={<SearchOutlined />} maxLength={255} />
        </Item>
        <Item name="MobilePhone" label="Номер телефона">
          <Input suffix={<SearchOutlined />} maxLength={255} />
        </Item>
        <Item name="Login" label="Логин">
          <Input suffix={<SearchOutlined />} maxLength={255} />
        </Item>
        <Item
          name="Status"
          className={className('filter-item')}
          label="Статус"
        >
          <CustomSelect
            options={statuses}
            placeholder="Выберите статус"
          />
        </Item>
        <div className={className('actions')}>
          <Button onClick={handleClearFilters}>Сбросить</Button>
          <Button htmlType="submit" type="primary">Найти</Button>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
