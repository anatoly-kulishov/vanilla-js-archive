import React from 'react'
import { Modal as AntdModal } from 'antd'
import styled from 'styled-components'

const Modal = props => {
  return <AntdModalStyled visible centered footer={null} closable={false} {...props} />
}

const AntdModalStyled = styled(AntdModal)`
  & .ant-modal {
    font-variant: normal;
    font-feature-settings: normal;
  }

  & .ant-modal-body {
    ${({ height, title }) => (height ? `height: calc(${height} - ${title ? '38px' : '0px'});` : '')}
  }

  & .ant-modal-header {
    border-bottom: none;
    padding-bottom: 0;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;

    & .ant-modal-title {
      font-family: T2HalvarBreit_ExtraBold;
      font-size: 18px;
    }
  }

  & .ant-modal-content {
    border-radius: 16px;
  }

  & .ant-modal-footer {
    border-top: none;
    padding: 0 24px 16px;
  }
`

export default Modal
