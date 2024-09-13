import {
  FC,
  useState,
  useCallback,
} from 'react';
import { Modal } from 'antd';
import isNil from 'lodash.isnil';

import cn from '@t2crm/wfm-utils/lib/utils/cn';

import ModalAddPatterns from 'types/modalAddPatterns';
import StepSelectPattern from './StepSelectPattern';
import StepCreatePattern from './StepCreatePattern';

import './styles.less';

const className = cn('modal-add-patterns');

const steps: ModalAddPatterns.Steps = {
  save: {
    name: 'save',
    title: 'Шаблоны режима работ',
    component: StepSelectPattern,
  },
  create: {
    name: 'create',
    title: 'Добавление нового шаблона',
    component: StepCreatePattern,
  },
};

type ModalAddPatternsProps = {
  isVisible: boolean;
  officeId: number;
  update?: () => void;
  onClose: () => void;
};

const AddPatternsModal: FC<ModalAddPatternsProps> = ({
  update,
  officeId,
  isVisible,
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState(steps.save);

  const changeActiveStep = useCallback((stepName: ModalAddPatterns.StepNames) => (
    setActiveStep(steps[stepName] || steps.save)
  ), [setActiveStep]);

  const onCloseModal = useCallback((newPatternId?: number) => {
    setActiveStep(steps.save);

    if (!isNil(newPatternId) && update) {
      update();
    }

    onClose();
  }, [update, onClose]);

  return (
    <div className={className()}>
      <Modal
        open={isVisible}
        onCancel={() => onCloseModal()}
        width={960}
        title={activeStep.title}
        className={className('modal')}
        footer={null}
      >
        <activeStep.component
          onClose={onCloseModal}
          onChangeStep={changeActiveStep}
          officeId={officeId}
        />
      </Modal>
    </div>
  );
};

AddPatternsModal.defaultProps = {
  update: undefined,
};

export default AddPatternsModal;
