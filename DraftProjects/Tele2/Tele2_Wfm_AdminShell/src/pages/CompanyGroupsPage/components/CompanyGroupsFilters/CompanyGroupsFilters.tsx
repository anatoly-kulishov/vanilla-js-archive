import { FC, useCallback, useEffect } from 'react';
import {
  Button, Form, Input,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import useStorageFilters from '@t2crm/wfm-utils/lib/hooks/useStorageFilters';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { MAX_INPUT_LENGTH } from 'pages/PartnersPage/constants';
import { trimObjFields } from 'utils/helpers';
import { SearchOutlined } from '@ant-design/icons';

const { Item } = Form;

const className = cn('company-groups-filters');

const filtersMap = new Map([
  ['name', 'nm'],
]);

interface FiltersProps {
  updateActiveFilters: (filters: Common.KeyValue) => void;
}

const CompanyGroupsFilters: FC<FiltersProps> = ({ updateActiveFilters }) => {
  const [form] = useForm();

  const [
    initialStorageState,
    setStorageFilters,
  ] = useStorageFilters('admin-company-groups', filtersMap);

  useEffect(() => {
    form.setFieldsValue(initialStorageState);

    updateActiveFilters(initialStorageState);
  }, [form, initialStorageState, updateActiveFilters]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      form.submit();
    }
  }, [form]);

  const handleClear = useCallback(() => {
    form.resetFields();
    const formFields = form.getFieldsValue();

    setStorageFilters(formFields);
    updateActiveFilters(formFields);
  }, [form, updateActiveFilters, setStorageFilters]);

  const handleFinish = useCallback((fields: Common.KeyValue) => {
    const trimmedFields = trimObjFields(fields);
    setStorageFilters(trimmedFields);
    updateActiveFilters(trimmedFields);
  }, [updateActiveFilters, setStorageFilters]);

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
          label="Группа компаний"
        >
          <Input
            allowClear
            onKeyDown={handleKeyDown}
            maxLength={MAX_INPUT_LENGTH}
            suffix={<SearchOutlined />}
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

export default CompanyGroupsFilters;
