import React, { useMemo, useState, Fragment } from 'react'
import { Steps } from 'antd'
import styled from 'styled-components'
import { Modal, Title, Button } from 'webseller/components'
import { getSteps } from 'webseller/features/saleSim/helpers'

function SaleSimModal ({ sallingProcessType, sallingProcessStep, resetSaleSimProcess }) {
  const [isShowCancelSaleSimModal, setIsShowCancelSaleSimModal] = useState(false)

  const steps = getSteps(sallingProcessType)

  const currentStep = useMemo(() => {
    const foundStepIdx = steps.findIndex(({ key }) => key === sallingProcessStep)

    return {
      idx: foundStepIdx,
      render: steps[foundStepIdx].render
    }
  }, [sallingProcessType, sallingProcessStep])

  const onCloseSaleSimModal = () => {
    setIsShowCancelSaleSimModal(true)
  }

  return (
    <Fragment>
      {isShowCancelSaleSimModal && (
        <Modal
          width={430}
          zIndex={1002}
          footer={
            <Fragment>
              <Button onClick={resetSaleSimProcess}>Да</Button>
              <Button type='primary' onClick={() => setIsShowCancelSaleSimModal(false)}>
                Нет
              </Button>
            </Fragment>
          }
        >
          <Title>Вы уверены, что хотите прекратить оформление SIM-карты?</Title>
        </Modal>
      )}
      <Modal title='Продажа SIM' closable width={'70%'} height={'90vh'} zIndex={1001} onCancel={onCloseSaleSimModal}>
        <ModalContent>
          <StepsWrapper>
            <Steps labelPlacement='vertical' current={currentStep.idx} direction='horizontal'>
              {steps.map(({ key, title }) => (
                <Steps.Step key={key} title={title} />
              ))}
            </Steps>
          </StepsWrapper>
          <StepWrapper>{currentStep?.render()}</StepWrapper>
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

const StepsWrapper = styled.div`
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

const StepWrapper = styled.div`
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

export default SaleSimModal
