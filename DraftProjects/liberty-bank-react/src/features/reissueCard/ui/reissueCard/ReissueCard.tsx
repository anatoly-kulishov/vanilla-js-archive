import {
  ReissueCardFormLSKeys,
  ReissueCardStepFormAdditionalData,
  reissueCardFormLSApi,
} from '@/entities/cardForm';
import { StepForm } from '@/widgets/stepForm';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { reissueCardPageFlows } from '../../constants/reissueCardPageFlows';

interface Props {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export const ReissueCard: FC<Props> = ({ currentIndex, setCurrentIndex }) => {
  const [canGoNext, setCanGoNext] = useState(false);

  const pageFlow = reissueCardPageFlows.DEFAULT;
  const pagesCount = pageFlow.length;
  const StepPage = currentIndex < pagesCount ? pageFlow[currentIndex] : null;

  const additionalData: ReissueCardStepFormAdditionalData = {
    pageFlow,
    cardFormLSApi: reissueCardFormLSApi,
  };

  const maximumIndexReachingHandler = () => {
    // TODO отправка формы
  };

  useEffect(() => {
    reissueCardFormLSApi.setValue(ReissueCardFormLSKeys.PAGE_INDEX, currentIndex);
  }, [currentIndex]);

  return (
    <StepForm
      page={StepPage}
      additionalData={additionalData}
      pagesCount={pagesCount}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      canGoNext={canGoNext}
      setCanGoNext={setCanGoNext}
      maximumIndexReachingHandler={maximumIndexReachingHandler}
    />
  );
};
