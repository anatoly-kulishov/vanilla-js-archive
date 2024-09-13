import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import useStorageFilters from '@t2crm/wfm-utils/lib/hooks/useStorageFilters';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { trimObjFields } from 'utils/helpers';
import CustomSelect from 'components/CustomSelect';
import useDictionaries from 'hooks/useDictionaries';
import { SearchOutlined } from '@ant-design/icons';
import PartnerSelect from 'components/PartnerSelect';

type Props = {
  updateActiveFilters: (filters: Common.KeyValue) => void;
};

const className = cn('dealers-filters');
const { Item } = Form;

const filtersMap = new Map([
  ['partnerId', 'prtnrId'],
  ['macroRegionId', 'mcrnId'],
  ['regionId', 'rgnId'],
  ['name', 'name'],
  ['statusId', 'stsId'],
]);

const DealersFilters: FC<Props> = ({
  updateActiveFilters,
}) => {
  const [
    initialStorageState,
    setStorageFilters,
  ] = useStorageFilters('admin-dealers', filtersMap);

  const [form] = useForm();
  const [selectedMacroRegionId, setSelectedMacroRegionId] = useState<string>(initialStorageState.macroRegionId ?? '');

  const {
    macroRegions,
    statuses,
    regions,
  } = useDictionaries(['macroRegions', 'regions', 'statuses'],
    { macroRegionId: selectedMacroRegionId });

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

  const onMacroRegionChange = useCallback((macroRegionId: string) => {
    setSelectedMacroRegionId(macroRegionId);
    form.setFieldsValue({ regionId: '' });
  }, [form]);

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
          name="partnerId"
          className={className('filter-item')}
          label="Партнер"
        >
          <PartnerSelect
            placeholder="Выберите партнера"
          />
        </Item>

        <Item
          name="macroRegionId"
          className={className('filter-item')}
          label="Макрорегион"
        >
          <CustomSelect
            options={macroRegions.data}
            loading={macroRegions.isFetching}
            onChange={onMacroRegionChange}
            placeholder="Выберите макрорегион"
          />
        </Item>

        <Item
          className={className('region')}
          name="regionId"
          label="Регион"
        >
          <CustomSelect
            options={regions.data}
            loading={regions.isFetching}
            placeholder="Выберите регион"
          />
        </Item>

        <Item
          name="name"
          className={className('filter-item')}
          label="Дилер"
        >
          <Input
            allowClear
            maxLength={255}
            onKeyDown={handleKeyDown}
            suffix={<SearchOutlined />}
          />
        </Item>

        <Item
          name="statusId"
          className={className('filter-item')}
          label="Статус"
        >
          <CustomSelect
            options={statuses.data}
            loading={statuses.isFetching}
            placeholder="Выберите статус"
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

export default DealersFilters;
