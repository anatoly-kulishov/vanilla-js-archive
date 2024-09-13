import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormFrameProps } from '../../model/types';
import { Button, DeleteButton, Text } from '@/shared';
import { HC_CLIENT, HC_FORM_APPEND_PERSON } from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import classNames from 'classnames';
import { ClientInfoField } from '../../ui/components/clientInfoField/clientInfoField';
import { RegistrationAddressField } from '../../ui/components/registrationAddressField/registrationAddressField';

export const InsuredPersonsFrame: FC<FormFrameProps> = ({ stepper, prevButton, nextButton }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'insuredPerson',
  });

  const handleAddThing = () => {
    append({ objectName: '', price: '' });
  };

  return (
    <>
      {fields.map((field, index, arr) => (
        <div className={styles['form__container']} key={field.id}>
          <div className={styles['form__header']}>
            <div className={styles['form__heading']}>
              <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
                {!index ? HC_CLIENT.title : `Данные попутчика №${index}`}
              </Text>
              {index ? <DeleteButton onClick={() => remove(index)} /> : null}
            </div>
            {!index ? stepper : null}
          </div>
          <div className={styles['form__body']}>
            <ClientInfoField namePrefix={`insuredPerson.${index}`} />
            <RegistrationAddressField namePrefix={`insuredPerson.${index}`} />
          </div>
          {index === arr.length - 1 && (
            <div className={styles['form__footer']}>
              <div>{prevButton}</div>
              <div>
                <Button
                  onClick={handleAddThing}
                  theme='secondary'
                  size='s'
                  className={classNames(styles['next-btn'], styles['add-item-btn'])}
                >
                  {HC_FORM_APPEND_PERSON}
                </Button>
                {nextButton}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
