import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Steps as AntdSteps } from 'antd'

import { Modal, Title, Button } from 'webseller/components'

export default function Steps ({ title, activeStepKey, steps, resetProcess }) {
  const [isShowFinishProcessModal, setIsShowFinishProcessModal] = useState(false)

  const activeStepIdx = steps.findIndex(({ key }) => key === activeStepKey)

  const showFinishProcessModal = () => {
    setIsShowFinishProcessModal(true)
  }

  const closeFinishProcessModal = () => {
    setIsShowFinishProcessModal(false)
  }

  return (
    <Fragment>
      {isShowFinishProcessModal && (
        <Modal
          width={430}
          zIndex={1002}
          footer={
            <Fragment>
              <Button onClick={resetProcess}>Да</Button>
              <Button type='primary' onClick={closeFinishProcessModal}>
                Нет
              </Button>
            </Fragment>
          }
        >
          <Title>Вы уверены, что хотите прекратить процесс?</Title>
        </Modal>
      )}
      <Modal title={title} closable width={'70%'} height={'90vh'} zIndex={1001} onCancel={showFinishProcessModal}>
        <ModalContent>
          <AntdSteps labelPlacement='vertical' current={activeStepIdx} direction='horizontal'>
            {steps.map(({ key, title }) => (
              <AntdSteps.Step key={key} title={title} />
            ))}
          </AntdSteps>
          <StepWrapper>{steps[activeStepIdx]?.render()}</StepWrapper>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  height: 100%;
`

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0px;
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  border: 1px dashed #44caff;
`
