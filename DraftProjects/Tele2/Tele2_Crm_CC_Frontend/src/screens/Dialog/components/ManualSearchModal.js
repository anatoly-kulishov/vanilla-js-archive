import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal } from 'antd'

import Search from 'containers/Search'

export default function ManualSearchModal (props) {
  ManualSearchModal.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    handleUpdatingIdentificationLevel: PropTypes.func
  }

  const { isVisible, onCancel, handleUpdatingIdentificationLevel } = props

  return (
    <StyledModal
      title='Поиск клиента'
      width='80%'
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Search isUpdateIdentity handleUpdatingIdentificationLevel={handleUpdatingIdentificationLevel} />
    </StyledModal>)
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`
