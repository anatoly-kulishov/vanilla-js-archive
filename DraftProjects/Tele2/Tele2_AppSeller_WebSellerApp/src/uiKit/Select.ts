import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

const Select = styled(AntdSelect)`
  & .ant-select-selector {
    border-radius: 12px !important;
    height: auto !important;
    padding: 8px 16px !important;
    font-size: 14px !important;
  }
`;

export default Select;
