/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Button } from 'antd'

export const UpdateIdentificationLevelModal = (props) => {
  UpdateIdentificationLevelModal.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    onUpdate: PropTypes.func,
    identificationLevels: PropTypes.arrayOf(PropTypes.objectOf({
      IdentificationLevelId: PropTypes.number,
      IdentificationLevelName: PropTypes.string
    }))
  }
  const { identificationLevels, isVisible, onCancel, onUpdate } = props

  return (
    <Modal
      width={330}
      title='Изменить уровень идентификации'
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <ModalWrapper>
        {identificationLevels?.map((identificationlevel, index) => {
          return (
            <UpdateButton
              key={index}
              onClick={() => onUpdate(identificationlevel.IdentificationLevelId)}
            >
              {identificationlevel.IdentificationLevelName}
            </UpdateButton>
          )
        })}
      </ModalWrapper>
    </Modal>
  )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const UpdateButton = styled(Button)`
  margin-top: 8px;
`
