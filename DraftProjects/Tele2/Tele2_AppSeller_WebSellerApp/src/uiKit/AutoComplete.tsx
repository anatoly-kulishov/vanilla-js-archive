import { FC } from 'react';
import { AutoComplete as AntdAutoComplete, AutoCompleteProps } from 'antd';
import styled from 'styled-components';

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  return (
    <AutoCompleteStyled
      showSearch
      filterOption={false}
      notFoundContent={null}
      defaultActiveFirstOption={false}
      {...props}
    />
  );
};

const AutoCompleteStyled = styled(AntdAutoComplete)`
  & .ant-select-selection-search {
    display: flex;
    align-items: center;

    & input {
      height: auto !important;
      width: 100% !important;
      line-height: normal !important;
      text-align: center !important;
    }
  }

  & .ant-select-selector {
    border-radius: 12px !important;
    height: auto !important;
    font-size: 14px !important;
  }
`;

export default AutoComplete;
