import { type ReactNode } from 'react';
import styles from './FormTemplate.module.scss';
import classNames from 'classnames';
import { BackButton, Button, Text } from '../..';

interface Props {
  className?: string;
  children: ReactNode;
  handleBackButtonClick?: () => void;
  handleSubmitButtonClick?: () => void;
  formTitle?: string;
  canSubmit?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
}

export const FormTemplate = ({
  children,
  className,
  handleBackButtonClick = () => {},
  handleSubmitButtonClick = () => {},
  formTitle,
  canSubmit = true,
  backButtonText = 'Назад',
  nextButtonText = 'Подтвердить',
}: Props) => {
  return (
    <div className={styles.formTemplate}>
      {formTitle && (
        <Text tag='h2' size='m' weight='medium' className={styles.formTitle}>
          {formTitle}
        </Text>
      )}
      <form className={classNames(styles.formBox, className)}>
        <div className={styles.formWrapper}>{children}</div>
        <div className={styles.buttonsBlock}>
          <BackButton
            click={handleBackButtonClick}
            text={backButtonText}
            theme='blue-no-arrow'
            height='24'
            width='24'
          />
          <div className={styles['step-form__next-button-wrapper']}>
            <Button
              className={styles['step-form__next-button']}
              width='max'
              onClick={handleSubmitButtonClick}
              disabled={!canSubmit}
            >
              {nextButtonText}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
