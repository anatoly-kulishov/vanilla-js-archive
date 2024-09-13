/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { REGION_MODAL } from 'constants/logModalNames'

function RegionModal ({
  isVisible,
  onClose
}) {
  RegionModal.propTypes = {
    isVisible: PropTypes.func,
    onClose: PropTypes.func
  }

  const handleCloseModal = () => {
    onClose()
    logIfEnabled({ type: MODAL_CLOSE, log: REGION_MODAL })
  }

  useEffect(() => {
    if (isVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: REGION_MODAL })
    }
  }, [isVisible])

  return (
    <Modal visible={isVisible} onCancel={handleCloseModal} footer={null}>
      <ContainerHolder>
        <TitleHolder>
          <b>Выберите биллинговый филиал для перехода в Базу Знаний</b>
        </TitleHolder>
      </ContainerHolder>
    </Modal>
  )
}

export default RegionModal

const ContainerHolder = styled.div`
  width: 100%;
`
const TitleHolder = styled.div`
  margin: 5px;
`
