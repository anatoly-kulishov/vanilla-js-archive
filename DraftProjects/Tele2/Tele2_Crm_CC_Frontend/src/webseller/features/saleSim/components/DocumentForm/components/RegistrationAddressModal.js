import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'webseller/components'

export const RegistrationAddressModal = ({ onClose, children }) => {
  return (
    <Modal
      title='Адрес регистрации'
      width={'393px'}
      zIndex={1001}
      onCancel={onClose}
      closable>
      {children}
    </Modal>
  )
}

RegistrationAddressModal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element

}
