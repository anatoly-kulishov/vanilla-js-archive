import { FC, useEffect, useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import useStorageFilters from '@t2crm/wfm-utils/lib/hooks/useStorageFilters';

import type Common from '@t2crm/wfm-utils/lib/types/common';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import CustomSelect from 'components/CustomSelect';

import './styles.less';
import useDictionaries from 'hooks/useDictionaries';

const { useForm, Item, useWatch } = Form;

const className = cn('sale-offices-filters');

export type FiltersProps = {
  updateActiveFilters: (filters: Common.KeyValue) => void;
};

const filtersMap = new Map([
  ['macroRegionId', 'mcrnId'],
  ['regionId', 'rgnId'],
  ['DealerIdList', 'dlrId'],
  ['StatusIdList', 'stsId'],
]);

const Filters: FC<FiltersProps> = ({ updateActiveFilters }) => {
  const [
    initialFilters,
    setStorageFilters,
  ] = useStorageFilters('admin-sale-offices', filtersMap);

  const [form] = useForm();

  const macroRegionId = useWatch('macroRegionId', form);
  const regionId = useWatch('regionId', form);

  const {
    macroRegions,
    officesStatuses,
    regions,
    dealers,
  } = useDictionaries(['macroRegions', 'regions', 'officesStatuses', 'dealers'],
    { macroRegionId, regionId });

  useEffect(() => {
    form.setFieldsValue(initialFilters);
    updateActiveFilters(initialFilters);
  }, [initialFilters, form, updateActiveFilters]);

  const handleChangeFilters = useCallback((_, values: Common.KeyValue) => {
    form.setFieldsValue(values);
  }, [form]);

  const handleSetFilters = useCallback((values: Common.KeyValue) => {
    setStorageFilters(values);
    updateActiveFilters(values);
  }, [updateActiveFilters, setStorageFilters]);

  const onMacroRegionChange = useCallback(() => {
    form.setFieldsValue({ regionId: [], DealerIdList: [] });
  }, [form]);

  const onRegionChange = useCallback(() => {
    form.setFieldsValue({ DealerIdList: [] });
  }, [form]);

  const handleClearFilters = useCallback(() => {
    form.resetFields();
    form.setFieldsValue({ macroRegionId: [], regionId: [], DealerIdList: [] });

    const emptyState = form.getFieldsValue();

    setStorageFilters(emptyState);
    updateActiveFilters(emptyState);
  }, [
    form,
    setStorageFilters,
    updateActiveFilters,
  ]);

  return (
    <Form
      className={className()}
      form={form}
      onFinish={handleSetFilters}
      onValuesChange={handleChangeFilters}
      layout="vertical"
    >
      <Item name="macroRegionId" label="Макрорегион">
        <CustomSelect
          options={macroRegions.data}
          loading={macroRegions.isFetching}
          onChange={onMacroRegionChange}
          placeholder="Выберите макрорегион"
        />
      </Item>
      <Item name="regionId" label="Регион">
        <CustomSelect
          options={regions.data}
          loading={regions.isFetching}
          onChange={onRegionChange}
          placeholder="Выберите регион"
        />
      </Item>
      <Item name="DealerIdList" label="Дилер">
        <CustomSelect
          mode="multiple"
          maxTagCount="responsive"
          options={dealers.data}
          loading={dealers.isLoading}
          placeholder="Выберите дилера"
        />
      </Item>
      <Item name="address" label="Адрес">
        <Input suffix={<SearchOutlined />} maxLength={255} />
      </Item>
      <Item name="officeId" label="POSID">
        <Input suffix={<SearchOutlined />} maxLength={12} />
      </Item>
      <Item name="StatusIdList" label="Статус салона">
        <CustomSelect
          mode="multiple"
          maxTagCount="responsive"
          options={officesStatuses.data}
          loading={officesStatuses.isFetching}
          placeholder="Выберите статус"
        />
      </Item>

      <div className={className('actions')}>
        <Button onClick={handleClearFilters}>Сбросить</Button>
        <Button htmlType="submit" type="primary">Найти</Button>
      </div>
    </Form>
  );
};

export default Filters;
