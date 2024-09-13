import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Modal, Spin } from 'antd'

import { getScanFiles } from 'reducers/mnp/mnpVerifyReducer'
import ScanViewer from 'components/ScanViewer/ScanViewer'

const modalStyle = { marginTop: '50px' }
const scanWidth = 800
const scanHeight = 600

const ScanModal = ({ visible, npId, setModalVisible }) => {
  const dispatch = useDispatch()
  const mnpScanFiles = useSelector(state => state.mnp.mnpVerifyState.mnpScanFiles)
  const isMnpScanFilesLoading = useSelector(state => state.mnp.mnpVerifyState.isMnpScanFilesLoading)
  const isMnpScanFilesError = useSelector(state => state.mnp.mnpVerifyState.isMnpScanFilesError)

  useEffect(() => {
    if (npId) {
      dispatch(getScanFiles(npId))
    }
  }, [])

  const handleCancel = useCallback(() => {
    setModalVisible()
  }, [setModalVisible])

  return (
    <Modal
      title='Скан заявления'
      visible={visible}
      zIndex='1000'
      width='850px'
      style={modalStyle}
      footer={null}
      onCancel={handleCancel}
    >
      <Spin spinning={isMnpScanFilesLoading}>
        {!isMnpScanFilesError && <ScanViewer pages={mnpScanFiles} width={scanWidth} height={scanHeight} />}
        {isMnpScanFilesError && (<ErrorContainer><p>Ошибка при загрузке скана</p></ErrorContainer>)}
      </Spin>
    </Modal>
  )
}

export default ScanModal

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${scanWidth}px;
  height: ${scanHeight}px;
`
