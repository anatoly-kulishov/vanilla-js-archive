import React, { Fragment, useState } from 'react'
import { Steps } from 'antd'
import styled from 'styled-components'
import { Modal, Title, Button } from 'webseller/components'
import { getCurrStepRecreateClient, getStepsByRecreateClientType } from 'webseller/features/recreateClient/helpers'

export default function RecreateClientModal ({ currStepType, recreateClientType, resetProcessRecreateClient }) {
  const [isShowCancelModal, setIsShowCancelModal] = useState(false)

  const steps = getStepsByRecreateClientType(recreateClientType)
  const currentStep = getCurrStepRecreateClient({ currStepType, recreateClientType })

  const onCloseRecreateClientModal = () => {
    setIsShowCancelModal(true)
  }

  return (
    <Fragment>
      {isShowCancelModal && (
        <Modal
          width={430}
          zIndex={1002}
          footer={
            <Fragment>
              <Button onClick={resetProcessRecreateClient}>Да</Button>
              <Button type='primary' onClick={() => setIsShowCancelModal(false)}>
                Нет
              </Button>
            </Fragment>
          }
        >
          <Title>Вы уверены, что хотите прекратить переоформление?</Title>
        </Modal>
      )}
      <Modal title='Переоформление' closable width={'70%'} height={'90vh'} zIndex={1001} onCancel={onCloseRecreateClientModal}>
        <ModalContent>
          <StepsNavigation>
            <Steps labelPlacement='vertical' current={currentStep.idx} direction='horizontal'>
              {steps.map(({ key, title }) => (
                <Steps.Step key={key} title={title} />
              ))}
            </Steps>
          </StepsNavigation>
          <StepContent>{currentStep.render()}</StepContent>
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

const StepsNavigation = styled.div`
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }
`

const StepContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0px;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 1px dashed #44caff;
`
