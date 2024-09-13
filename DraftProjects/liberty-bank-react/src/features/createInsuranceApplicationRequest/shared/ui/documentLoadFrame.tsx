import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Text } from '@/shared';
import {
  DOCUMENTS_TITLE,
  HC_DROPZONE_SUBLABEL,
  VALIDATION_RULES,
  dropzoneOptions,
} from '../../constants';
import { FormFrameProps } from '../../model/types';
import styles from '../../shared/styles/styles.module.scss';
import { FileDropzone } from '../../ui/components';
import { ErrorMessage } from '../../ui/createHomeContentsInsuranceApplication/errorMessage';

const DocumentLoadFrame: FC<FormFrameProps> = ({
  stepper,
  prevButton,
  submitButton,
  documents,
}) => {
  const { control, trigger } = useFormContext();

  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {DOCUMENTS_TITLE}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <div className={styles['form__column']}>
          {documents?.map((document, index) => (
            <Controller
              key={index}
              control={control}
              name={document.name}
              rules={VALIDATION_RULES.homeFiles}
              render={({ field: { onChange, name, value }, fieldState: { error } }) => (
                <>
                  <div className={styles['form__row']} key={document.id}>
                    <FileDropzone
                      label={document.label}
                      subLabel={HC_DROPZONE_SUBLABEL}
                      required
                      options={dropzoneOptions}
                      isError={Boolean(error)}
                      onChange={(value) => {
                        onChange(value);
                        trigger(document.name);
                      }}
                      {...{ name, value }}
                    />
                  </div>
                  <ErrorMessage error={error} />
                </>
              )}
            />
          ))}
        </div>
      </div>
      <div className={styles['form__footer']}>
        <div>{prevButton}</div>
        <div>{submitButton}</div>
      </div>
    </div>
  );
};

export default DocumentLoadFrame;
