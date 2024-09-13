import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

import { Title } from 'webseller/components'

const MessageModal = ({ visible, onClose, messageText, footer }) => {
  return (
    <Modal
      losable
      zIndex={1001}
      visible={visible}
      onCancel={onClose}
      footer={footer}>
      <Title>{messageText}</Title>
    </Modal>
  )
}

MessageModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  messageText: PropTypes.string,
  footer: PropTypes.array
}

export default MessageModal
