import { useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Input,
  InputErrorMessage,
  PATH_PAGE,
  Text,
  changePINSchema,
  getLinkWithParams,
} from '@/shared';
import { TEXT } from './constants';
import { IFormInputs, PINs } from './model/types';
import styles from './ChangePINForm.module.scss';

interface Props {
  pinValidation: (val: boolean) => void;
  setPINs: React.Dispatch<React.SetStateAction<PINs>>;
}

export const ChangePINForm = ({ pinValidation, setPINs }: Props) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      oldPin: '',
      newPin: '',
      approvedPin: '',
    },
    resolver: yupResolver(changePINSchema),
    mode: 'all',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancelButtonClick = () => {
    navigate(getLinkWithParams(PATH_PAGE.myCardInfo, { id }));
  };

  const handleSubmitForm: SubmitHandler<IFormInputs> = (pin): void => {
    if (pin.oldPin && pin.newPin) {
      setPINs({ oldPin: pin.oldPin, newPin: pin.newPin });
    }
    pinValidation(isValid);
  };

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles['pins-container']}>
          <div className={styles['pin-container']}>
            <Text tag='h4' weight='regular' className={styles['pin-title']}>
              {TEXT.oldPin}
            </Text>
            <div className={styles['pin-input']}>
              <Controller
                control={control}
                name='oldPin'
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { isTouched, invalid } }) => (
                  <Input.Password
                    {...field}
                    placeholder='****'
                    white={true}
                    maxLength={4}
                    required
                    isError={invalid}
                    className={!invalid && isTouched ? styles['success-input'] : ''}
                  />
                )}
              />
              {errors.oldPin?.message && <InputErrorMessage message={errors.oldPin.message} />}
            </div>
          </div>
          <div className={styles['pin-container']}>
            <Text tag='h4' weight='regular' className={styles['pin-title']}>
              {TEXT.newPin}
            </Text>
            <div className={styles['pin-input']}>
              <Controller
                control={control}
                name='newPin'
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { isTouched, invalid } }) => (
                  <Input.Password
                    {...field}
                    placeholder='****'
                    white={true}
                    maxLength={4}
                    required
                    isError={invalid}
                    className={!invalid && isTouched ? styles['success-input'] : ''}
                  />
                )}
              />
              {errors.newPin?.message && <InputErrorMessage message={errors.newPin.message} />}
            </div>
          </div>
          <div className={styles['pin-container']}>
            <Text tag='h4' weight='regular' className={styles['pin-title']}>
              {TEXT.approvedPin}
            </Text>
            <div className={styles['pin-input']}>
              <Controller
                control={control}
                name='approvedPin'
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { isTouched, invalid } }) => (
                  <Input.Password
                    {...field}
                    placeholder='****'
                    white={true}
                    maxLength={4}
                    required
                    isError={invalid}
                    className={!invalid && isTouched ? styles['success-input'] : ''}
                  />
                )}
              />
              {errors.approvedPin?.message && (
                <InputErrorMessage message={errors.approvedPin.message} />
              )}
            </div>
          </div>
        </div>
        <div className={styles['buttons-container']}>
          <Button
            onClick={() => handleCancelButtonClick()}
            type='reset'
            className={styles['cancel-button']}
            theme='tertiary'
          >
            {TEXT.cancelForm}
          </Button>
          <Button type='submit' className={styles['submit-button']} disabled={!isValid}>
            {TEXT.submitForm}
          </Button>
        </div>
      </form>
    </div>
  );
};
