import { FC } from 'react';
import { Typography, Select, SelectProps } from 'antd';

const { Text } = Typography;

const CustomSelect: FC<SelectProps> = (props) => {
  const { options } = props;
  return (
    <Select
    /* eslint-disable react/jsx-props-no-spreading */
      showSearch
      allowClear
      showArrow
      filterOption={(input, option) => (
        (option?.label?.toString().toLowerCase().indexOf(input.toLowerCase()) ?? 0) >= 0
      )}
      notFoundContent={
        options && options?.length > 0
          ? <Text>По вашему запросу ничего не найдено</Text>
          : undefined
        }
      {...props}
    />
  );
};

export default CustomSelect;
