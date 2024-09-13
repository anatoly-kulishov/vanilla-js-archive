import { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from 'uiKit';
import Steps from 'common/steps/components/Steps';
import actions from 'features/salesOffice/actions';
import selectors from 'features/salesOffice/selectors';
import {
  StepChangingActiveSalesOffice,
  stepsChangingActiveSalesOffice
} from 'features/salesOffice/helpers';

import styledSalesOffice from './styled';

const { ButtonSalesOffice } = styledSalesOffice;

const SalesOffice: FC = () => {
  const officeId = useSelector(selectors.selectActiveSalesOfficeId);
  const stepChangingOffice = useSelector(selectors.selectStepChangingSalesOffice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getActiveSalesOffice());
  }, []);

  const isShowChangingOffice = stepChangingOffice !== StepChangingActiveSalesOffice.NONE;

  const initChangingOffice = () => {
    dispatch(actions.initChangingOffice());
  };
  const resetChangingOffice = () => {
    dispatch(actions.resetState());
  };

  return (
    <Fragment>
      <ButtonSalesOffice onClick={initChangingOffice}>
        <Title fontSize={18}>
          {officeId || '-'}
        </Title>
        <Title>Торговая точка</Title>
      </ButtonSalesOffice>
      {isShowChangingOffice && (
        <Steps
          title="Изменение торговой точки"
          size='small'
          activeStepKey={stepChangingOffice}
          steps={stepsChangingActiveSalesOffice}
          resetProcess={resetChangingOffice}
        />
      )}
    </Fragment>
  );
};

export default SalesOffice;
