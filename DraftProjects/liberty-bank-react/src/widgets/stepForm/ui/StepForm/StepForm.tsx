import { StepFormAdditionalData } from '@/entities/cardForm';
import { Button, Preloader } from '@/shared';
import { BackButton } from '@/shared/ui/backButton/BackButton';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEXT } from '../../constants';
import { StepPage } from '../../model/types';
import { Stepper } from '../Stepper/Stepper';
import styles from './StepForm.module.scss';

interface Props<T extends StepFormAdditionalData> {
  className?: string;
  page: StepPage<T> | StepPage<StepFormAdditionalData> | null;
  pagesCount: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  canGoNext: boolean;
  setCanGoNext: Dispatch<SetStateAction<boolean>>;
  maximumIndexReachingHandler: () => void;
  additionalData: T;
}

export const StepForm = <T extends StepFormAdditionalData>({
  className,
  page: StepPage,
  additionalData,
  currentIndex,
  setCurrentIndex,
  canGoNext,
  setCanGoNext,
  pagesCount,
  maximumIndexReachingHandler,
}: Props<T>) => {
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(true);

  const handleBackButtonClick = () => {
    if (currentIndex < 1) {
      navigate(-1);
    } else {
      setCanGoNext(false);
      setCurrentIndex((i) => --i);
    }
  };

  const handleNextButtonClick = () => {
    if (canGoNext) {
      if (currentIndex < pagesCount - 1) {
        setCanGoNext(false);
        setCurrentIndex((i) => ++i);
      } else {
        maximumIndexReachingHandler();
      }
    }
  };

  return (
    <div className={classNames(className, styles['step-form'])}>
      <Stepper currentIndex={currentIndex} maxIndex={pagesCount + 1} />
      <div className={styles['step-form__step-page-wrapper']}>
        {isFormLoading && (
          <div className={styles['step-form__preloader']}>
            <Preloader minimized />
          </div>
        )}
        {StepPage && (
          <div style={{ visibility: isFormLoading ? 'hidden' : 'visible' }}>
            <StepPage
              additionalData={additionalData}
              setCanGoNext={setCanGoNext}
              isFormLoading={isFormLoading}
              setIsFormLoading={setIsFormLoading}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        )}
      </div>
      <div className={styles['step-form__buttons-block']}>
        <BackButton
          click={handleBackButtonClick}
          text={TEXT.back}
          theme='blue-no-arrow'
          height='24'
          width='24'
        />
        <div className={styles['step-form__next-button-wrapper']}>
          <Button
            className={styles['step-form__next-button']}
            width='max'
            onClick={handleNextButtonClick}
            disabled={!canGoNext}
          >
            {TEXT.next}
          </Button>
        </div>
      </div>
    </div>
  );
};
