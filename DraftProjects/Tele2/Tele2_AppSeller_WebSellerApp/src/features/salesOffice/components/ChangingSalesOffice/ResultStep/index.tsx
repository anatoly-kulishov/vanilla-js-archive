import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from 'uiKit';
import { IconSuccess, IconSmthWentWrong } from 'icons';
import actions from 'features/salesOffice/actions';
import selectors from 'features/salesOffice/selectors';
import Step from 'common/steps/components/Step';
import { StatusChangingActiveSalesOffice } from 'features/salesOffice/helpers';

import styledResultStep from './styled';

const { Container } = styledResultStep;

const ResultStep: FC = () => {
  const statusChangingOffice = useSelector(selectors.selectStatusChangeActiveSalesOffice);
  const errorChangingOffice = useSelector(selectors.selectErrorChangeActiveSalesOffice);

  const dispatch = useDispatch();

  const isSuccess = statusChangingOffice === StatusChangingActiveSalesOffice.SUCCESS;

  const handleOk = () => {
    dispatch(actions.resetState());
  };

  return (
    <Step textGoForward="Готово" handleGoForward={handleOk}>
      <Container>
        {isSuccess ? <IconSuccess /> : <IconSmthWentWrong />}
        <Title bold fontSize={18}>
          {isSuccess ? 'Торговая точка изменена' : 'Не удалось сменить торговую точку'}
        </Title>
        {Boolean(!isSuccess && errorChangingOffice) && <Title>{errorChangingOffice}</Title>}
      </Container>
    </Step>
  );
};

export default ResultStep;
