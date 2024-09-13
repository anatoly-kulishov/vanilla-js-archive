import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

export default function TariffConstructorModal (props) {
  const { isVisible, changeVisibility } = props

  const handleCancel = useCallback(() => {
    changeVisibility(false)
  }, [])

  const handleOk = useCallback(() => {
    changeVisibility(false)
  }, [])
  return <StyledModal
    visible={isVisible}
    width='60%'
    footer={null}
    onOk={handleOk}
    onCancel={handleCancel}
    closable={false}
    zIndex='10000'
  >
    <StyledIframe src='https://msk.tele2.ru/nastroy-tariff' />
  </StyledModal>
}

const StyledIframe = styled.iframe`
  width: 100%;
  height: 700px;
  border: none;
  padding: 0;
  margin: 0;
`
const StyledModal = styled(Modal)`
.ant-modal-body {
  padding: 0;
  height: 700px;
}
`
