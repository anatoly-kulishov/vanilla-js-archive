import { FC, useEffect } from 'react';
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd';
import styled from 'styled-components';

const DatePicker: FC<DatePickerProps> = (props) => {
  const reformatDate = (event, separator = '.') => {
    const strippedInput = event.target.value.replaceAll(separator, '');
    let newInput = '';

    for (let char = 0; char < strippedInput.length; char += 1) {
      if (char === 2 || char === 4) newInput += separator;
      newInput += strippedInput.charAt(char);
    }

    event.target.value = newInput;
  };

  useEffect(() => {
    const { id } = props;

    if (id) {
      const input = document.getElementById(id);
      input?.addEventListener('keyup', reformatDate);

      return () => {
        input?.removeEventListener('keyup', reformatDate);
      };
    }
  }, []);

  return (
    <AntdDatePickerStyled format="DD.MM.YYYY" suffixIcon={null} allowClear={false} {...props} />
  );
};

export default DatePicker;

const AntdDatePickerStyled = styled(AntdDatePicker)`
  border-radius: 12px;
  padding: 12px 16px;

  & input {
    font-family: T2_Rooftop_Regular;
    font-weight: 400;
    font-size: 14px;
    line-height: normal;
  }
`;
