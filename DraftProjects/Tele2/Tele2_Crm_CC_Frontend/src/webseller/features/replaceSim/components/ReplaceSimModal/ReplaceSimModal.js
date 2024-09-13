import React, { useMemo, useState, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Steps } from 'antd'

import { Modal, Title, Button } from 'webseller/components'

import { getSteps } from '../../helpers'

function ReplaceSimModal ({ replacingProcessStep, resetReplaceSimProcess }) {
  const [isShowCancelReplaceSimModal, setIsShowCancelReplaceSimModal] = useState(false)

  const steps = getSteps()

  const currentStep = useMemo(() => {
    const foundStepIdx = steps.findIndex(({ key }) => key === replacingProcessStep)

    return {
      idx: foundStepIdx,
      render: steps[foundStepIdx].render
    }
  }, [replacingProcessStep])

  const onCloseSaleSimModal = () => {
    setIsShowCancelReplaceSimModal(prevState => !prevState)
  }

  useEffect(() => {
    return () => {
      resetReplaceSimProcess()
    }
  }, [])

  return (
    <Fragment>
      {isShowCancelReplaceSimModal && (
        <Modal
          width={430}
          zIndex={1002}
          footer={
            <Fragment>
              <Button onClick={resetReplaceSimProcess}>Да</Button>
              <Button type='primary' onClick={() => setIsShowCancelReplaceSimModal(false)}>
                Нет
              </Button>
            </Fragment>
          }
        >
          <Title>Вы уверены, что хотите прекратить замену SIM-карты?</Title>
        </Modal>
      )}
      <Modal title='Замена SIM' closable width={'70%'} height={'90vh'} zIndex={1001} onCancel={onCloseSaleSimModal}>
        <ModalContent>
          <StepsWrapper>
            <Steps labelPlacement='vertical' current={currentStep.idx} direction='horizontal'>
              {steps.map(({ key, title }) => (
                <Steps.Step key={key} title={title} />
              ))}
            </Steps>
          </StepsWrapper>
          <StepWrapper>{currentStep.render()}</StepWrapper>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

ReplaceSimModal.propTypes = {
  replacingProcessStep: PropTypes.string,
  resetReplaceSimProcess: PropTypes.func
}

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 1px dashed #44caff;
`
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

export default ReplaceSimModal
