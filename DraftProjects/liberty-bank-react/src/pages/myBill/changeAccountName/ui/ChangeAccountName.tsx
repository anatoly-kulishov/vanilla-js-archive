import { ChangeAccountNameModal } from '@/entities/changeBillModal';
import {
  BackButton,
  Button,
  Input,
  InputErrorMessage,
  Text,
  accountNameSchema,
  maskAccountNumber,
  useChangeAccountNameMutation,
} from '@/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MASK, TEXT } from '../consts';
import styles from './ChangeAccountName.module.scss';

interface IChangeAccountName {
  name?: string;
}

interface ILocationState {
  state: string;
}

const ChangeAccountName: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeName] = useChangeAccountNameMutation();
  const { state } = location as ILocationState;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(accountNameSchema),
  });
  const hideModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const onPrimaryButtonClick = () => {
    hideModal();
    navigate(`/my-bills/${id}`, { replace: true });
  };
  const formSubmit = ({ name }: IChangeAccountName) => {
    changeName({ id: id ?? '', accountName: name ?? '' });
    openModal();
  };

  return (
    <div className={styles['my-bill-page']}>
      <div className={styles['my-bill-page__back-btn']}>
        <BackButton
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          className={styles['button-bills']}
        />
        <Text tag='h2' weight='medium' className={styles['title-bills']}>
          {TEXT.titleChange}
        </Text>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(formSubmit)} className={styles.form}>
            <div className={styles['nameBills-container']}>
              <Input.Text
                value={maskAccountNumber(state, MASK)}
                label={TEXT.label}
                white={true}
                readOnly={true}
                disabled={true}
                className={styles.input}
              />
              <div className={styles.inputWrapper}>
                <Controller
                  control={control}
                  name='name'
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input.Text
                      clearable={{ hide: true }}
                      label={TEXT.labelNew}
                      white={true}
                      isError={Boolean(errors.name)}
                      className={styles.input}
                      {...field}
                    />
                  )}
                />
                {errors.name?.message && <InputErrorMessage message={errors.name.message} />}
              </div>
            </div>

            <div className={styles['buttons-container']}>
              <Button onClick={() => navigate(-1)} type='reset' className={styles['cancel-button']}>
                {TEXT.cancelButton}
              </Button>
              <Button type='submit' className={styles['submit-button']}>
                {TEXT.submitButton}
              </Button>
            </div>
          </form>
          <ChangeAccountNameModal
            onPrimaryButtonClick={onPrimaryButtonClick}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            hideModal={hideModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeAccountName;
