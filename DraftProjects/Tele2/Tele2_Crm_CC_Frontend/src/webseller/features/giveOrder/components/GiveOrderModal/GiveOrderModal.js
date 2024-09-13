import React, { useMemo, useState, Fragment } from 'react'
import { Steps } from 'antd'
import styled from 'styled-components'
import { Modal, Title, Button } from 'webseller/components'
import { steps } from 'webseller/features/giveOrder/helpers'

export default function GiveOrderModal ({ giveOrderProcessStep, resetGiveOrderProcess }) {
  const [isShowCancelModal, setIsShowCancelModal] = useState(false)

  const currentStep = useMemo(() => {
    const foundStepIdx = steps.findIndex(({ key }) => key === giveOrderProcessStep)

    return {
      idx: foundStepIdx,
      render: steps[foundStepIdx].render
    }
  }, [giveOrderProcessStep])

  const onCloseCancelModal = () => setIsShowCancelModal(true)

  return (
    <Fragment>
      {isShowCancelModal && (
        <Modal
          width={430}
          zIndex={1002}
          footer={
            <Fragment>
              <Button onClick={resetGiveOrderProcess}>Да</Button>
              <Button type='primary' onClick={() => setIsShowCancelModal(false)}>
                Нет
              </Button>
            </Fragment>
          }
        >
          <Title>Вы уверены, что хотите прекратить выдачу заказа?</Title>
        </Modal>
      )}
      <Modal width={'70%'} height={'90vh'} zIndex={1001} onCancel={onCloseCancelModal}>
        <ModalContent>
          <Steps labelPlacement='vertical' current={currentStep.idx} direction='horizontal'>
            {steps.map(({ key, title }) => (
              <Steps.Step key={key} title={title} />
            ))}
          </Steps>
          <StepWrapper>{currentStep.render()}</StepWrapper>
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
  font-family: T2_Rooftop_Regular,sans-serif;
  font-weight: 400;
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
