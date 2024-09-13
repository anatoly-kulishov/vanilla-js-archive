import { useState, Fragment, FC } from 'react';
import { Steps as AntdSteps } from 'antd';

import { Modal, Title, Button } from 'uiKit';
import { Step } from 'common/steps/helpers';

import styledSteps from './styled';

const { ModalContent, StepWrapper, StepContent } = styledSteps;

const Sizes = {
  large: { width: '1440px' },
  middle: { width: '1280px' },
  small: { width: '720px' }
};

type Props = {
  title: string;
  size?: keyof typeof Sizes;
  activeStepKey: string;
  steps: Array<Step>;
  resetProcess: () => void;
};

const Steps: FC<Props> = ({ title, size = 'large', activeStepKey, steps, resetProcess }) => {
  const [isShowFinishProcessModal, setIsShowFinishProcessModal] = useState(false);

  const activeStepIdx = steps.findIndex(({ key }) => key === activeStepKey);
  const activeStep = steps[activeStepIdx];

  const showFinishProcessModal = () => {
    setIsShowFinishProcessModal(true);
  };

  const closeFinishProcessModal = () => {
    setIsShowFinishProcessModal(false);
  };

  const submitFinishProcess = () => {
    resetProcess();
    closeFinishProcessModal();
  };

  return (
    <Fragment>
      {isShowFinishProcessModal && (
        <Modal
          width={430}
          zIndex={1002}
          footer={
            <Fragment>
              <Button onClick={submitFinishProcess}>Да</Button>
              <Button type="primary" onClick={closeFinishProcessModal}>
                Нет
              </Button>
            </Fragment>
          }>
          <Title>Вы уверены, что хотите прекратить процесс?</Title>
        </Modal>
      )}
      <Modal
        title={title}
        width={Sizes[size].width}
        zIndex={1001}
        centered={false}
        closable
        onCancel={showFinishProcessModal}>
        <ModalContent>
          <AntdSteps
            size="small"
            labelPlacement="vertical"
            current={activeStepIdx}
            direction="horizontal">
            {steps.map(({ key, title }) => (
              <AntdSteps.Step key={key} title={title} />
            ))}
          </AntdSteps>
          <StepWrapper>
            <StepContent width={activeStep?.width}>{activeStep?.render()}</StepContent>
          </StepWrapper>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default Steps;
