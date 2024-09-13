import React from 'react'
import { Button, Modal } from 'antd'
import PropTypes from 'prop-types'

import { Title } from 'webseller/components'

const InfoModal = ({ visible, onClose, footer }) => {
  return (
    <Modal
      losable
      zIndex={1001}
      visible={visible}
      onCancel={onClose}
      footer={footer || [<Button type='default' onClick={onClose}>Отмена</Button>]}>
      <Title>Внимание! Все действия регистрируются системой и должны осуществляться только при личном присутствии клиента. Продолжить?</Title>
    </Modal>
  )
}

InfoModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  footer: PropTypes.array
}

export default InfoModal
