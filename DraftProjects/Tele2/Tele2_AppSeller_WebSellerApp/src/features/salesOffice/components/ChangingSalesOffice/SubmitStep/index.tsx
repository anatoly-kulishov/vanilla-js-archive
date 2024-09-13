import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from 'uiKit';
import actions from 'features/salesOffice/actions';
import selectors from 'features/salesOffice/selectors';
import Step from 'common/steps/components/Step';
import { StepChangingActiveSalesOffice } from 'features/salesOffice/helpers';

const SubmitStep: FC = () => {
  const potentialOffice = useSelector(selectors.selectPotentialActiveSalesOfficeInfo);
  const isLoadingChangeOffice = useSelector(selectors.selectIsLoadingChangeActiveSalesOffice);

  const dispatch = useDispatch();

  const changeOffice = () => {
    dispatch(
      actions.changeActiveSalesOffice({
        newOfficeId: potentialOffice.officeId
      })
    );
  };
  const goBack = () => {
    dispatch(actions.changeStep(StepChangingActiveSalesOffice.CHECK));
  };

  return (
    <Step
      title="Проверь адрес новой торговой точки"
      textGoForward="Подтвердить изменения"
      textGoBack="Назад"
      isLoadingGoForward={isLoadingChangeOffice}
      handleGoForward={changeOffice}
      handleGoBack={goBack}>
      <Title>
        Адрес торговой точки {potentialOffice.officeId}: {potentialOffice.fullAddress}
      </Title>
    </Step>
  );
};

export default SubmitStep;
