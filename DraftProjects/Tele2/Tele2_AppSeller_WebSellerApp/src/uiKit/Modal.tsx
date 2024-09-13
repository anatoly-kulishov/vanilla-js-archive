import { Modal as AntdModal, ModalProps } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const Modal: FC<ModalProps> = (props) => {
  return <AntdModalStyled visible centered footer={null} closable={false} {...props} />;
};

const AntdModalStyled = styled(AntdModal)`
  & .ant-modal-header {
    border-bottom: none;
    padding-bottom: 0;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;

    & .ant-modal-title {
      font-family: T2_DisplaySerif_Bold_Short;
      font-size: 18px;
      font-weight: 700;
    }
  }

  & .ant-modal-content {
    border-radius: 16px;
  }

  & .ant-modal-footer {
    border-top: none;
    padding: 0 24px 16px;
  }
`;

export default Modal;
