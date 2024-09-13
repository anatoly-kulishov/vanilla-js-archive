import { FC, useCallback } from 'react';
import { Form, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import AdminPanelNamespace from 'types/adminPanel';
import Common from '@t2crm/wfm-utils/lib/types/common';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import FormItem from '../FormItem';
import './styles.less';

const className = cn('filters');

const Filters: FC<AdminPanelNamespace.FilterProps> = ({
  updateActiveFilters,
  filtersKey,
  filterItems,
}) => {
  const [form] = useForm();

  const handleClear = useCallback(() => {
    form.resetFields();
    const formFields = form.getFieldsValue();
    updateActiveFilters(formFields);
  }, [form, updateActiveFilters]);

  const handleFinish = useCallback((fields: Common.KeyValue) => {
    updateActiveFilters(fields);
  }, [updateActiveFilters]);

  return (
    <Form
      form={form}
      name={`${filtersKey}-form`}
      layout="vertical"
      onFinish={handleFinish}
      className={className()}
    >
      <div className={className('content')}>
        {filterItems?.map((filterItem, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <FormItem {...filterItem} key={index} />
        ))}

        <div className={className('actions')}>
          <Button onClick={handleClear}>Сбросить</Button>
          <Button htmlType="submit" type="primary">Найти</Button>
        </div>
      </div>
    </Form>
  );
};

export default Filters;
