import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Text, DeleteButton, Input, Icon } from '@/shared';
import {
  HC_PROPERTY,
  HC_TYPE_OF_PROPERTY,
  REQUIRED_FIELD_ERROR,
  VALIDATION_RULES,
} from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FC } from 'react';
import { FormFrameProps } from '../../model/types';
import { ErrorMessage } from './errorMessage/errorMessage';

const PropertyFrame: FC<FormFrameProps> = ({ stepper, prevButton, nextButton }) => {
  const { control } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: 'things',
  });

  return (
    <>
      {fields.map((field, index, arr) => (
        <div className={styles['form__container']} key={field.id}>
          <div className={styles['form__header']}>
            <div className={styles['form__heading']}>
              <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
                {HC_PROPERTY.title}
              </Text>
              {arr.length > 1 && <DeleteButton onClick={() => remove(index)} />}
            </div>
            {!index ? stepper : null}
          </div>
          <div className={styles['form__body']}>
            <div className={styles['form__row']}>
              <div className={styles['form__field']}>
                <Controller
                  control={control}
                  name={`things.${index}.name`}
                  rules={VALIDATION_RULES.thingsName}
                  render={({ field, fieldState: { error } }) => (
                    <div className={styles['width-100']}>
                      <Input.Text
                        white
                        size='m'
                        label={HC_PROPERTY.objectName}
                        isError={Boolean(error)}
                        required
                        {...field}
                      />
                      <ErrorMessage error={error} />
                    </div>
                  )}
                />
              </div>
              <div className={styles['form__field']}>
                <Controller
                  control={control}
                  name={`things.${index}.cost`}
                  rules={VALIDATION_RULES.thingsCost}
                  render={({ field: { name, onChange, onBlur, value }, fieldState: { error } }) => (
                    <div className={styles['width-100']}>
                      <Input.Number
                        white
                        size='m'
                        label={HC_PROPERTY.price}
                        isError={Boolean(error)}
                        required
                        contentRight={<Icon icon={'ruble-small'} />}
                        {...{ name, onChange, onBlur, value }}
                      />
                      <ErrorMessage error={error} />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className={styles['form__row']}>
              <Controller
                control={control}
                name={`things.${index}.type`}
                rules={{
                  required: REQUIRED_FIELD_ERROR,
                }}
                render={({ field: { name, onChange, onBlur, value }, fieldState: { error } }) => (
                  <div className={styles['width-100']}>
                    <Input.Select
                      name={name}
                      options={Object.keys(HC_TYPE_OF_PROPERTY)}
                      id='documentSelect'
                      white
                      label={HC_PROPERTY.type}
                      required
                      isError={Boolean(error)}
                      onMySelect={onChange}
                      onBlur={onBlur}
                      value={value}
                      size='m'
                    />
                    <ErrorMessage error={error} />
                  </div>
                )}
              />
            </div>
          </div>
          {index === arr.length - 1 && (
            <div className={styles['form__footer']}>
              <div>{prevButton}</div>
              <div>{nextButton}</div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default PropertyFrame;
