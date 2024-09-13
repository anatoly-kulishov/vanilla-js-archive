import { Form } from 'antd';
import styled from 'styled-components';

// TODO типизировать
const FormItem = styled<any>(Form.Item)`
  margin-bottom: 10px;
  text-align: left;
  position: relative;

  ${({ isRequired }) => {
    return isRequired
      ? `&::before {
        content: '*';
        position: absolute;
        top: 0px;
        left: 6px;
        z-index: 1002;                                                                                                                                                                                                                                                                                      
        font-size: 18px;
        color: red;
      }`
      : '';
  }}
`;

export default FormItem;
