/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import {
  AutoComplete, Checkbox, Form, Input, Select, Switch, Typography, DatePicker,
} from 'antd';
import AdminPanelNamespace from 'types/adminPanel';
import 'antd/es/date-picker/style/index';
import locale from 'antd/es/date-picker/locale/ru_RU';
import Common from '@t2crm/wfm-utils/lib/types/common';
import PartnerSelect from 'components/PartnerSelect';

const { Item } = Form;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const renderItem = (
  type: AdminPanelNamespace.FormItemTypes,
  controlProps?: Common.KeyValue,
) => {
  switch (type) {
    case AdminPanelNamespace.FormItemTypes.Select:
      return (
        <Select
          showSearch
          allowClear
          showArrow
          filterOption={(input, option) => (
            (option?.label?.toString().toLowerCase().indexOf(input.toLowerCase()) ?? 0) >= 0
          )}
          notFoundContent={
            controlProps?.options?.length
              ? <Text>По вашему запросу ничего не найдено</Text>
              : undefined
            }
          {...controlProps}
        />
      );
    case AdminPanelNamespace.FormItemTypes.PartnerSelect:
      return <PartnerSelect {...controlProps} />;
    case AdminPanelNamespace.FormItemTypes.Autocomplete:
      return <AutoComplete options={controlProps?.options} allowClear />;
    case AdminPanelNamespace.FormItemTypes.Input:
      return <Input allowClear {...controlProps} />;
    case AdminPanelNamespace.FormItemTypes.Checkbox:
      return <Checkbox />;
    case AdminPanelNamespace.FormItemTypes.Switch:
      return <Switch />;
    case AdminPanelNamespace.FormItemTypes.TextArea:
      return <Input.TextArea />;
    case AdminPanelNamespace.FormItemTypes.RangePicker:
      return <RangePicker locale={locale} {...controlProps} />;
    default:
      return null;
  }
};

const FormItem: FC<AdminPanelNamespace.FilterItemProps> = (props) => {
  const {
    type, formItemProps, controlProps,
  } = props;

  return (
    <Item {...formItemProps}>
      {renderItem(type, controlProps)}
    </Item>
  );
};

export default FormItem;
