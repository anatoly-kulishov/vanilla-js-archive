import { Controller } from 'react-hook-form';
import { Button, RadioButton, Switch, Text, getAccessToken, getCustomerId } from '@/shared';
import { useCreateAccountForm } from '../hooks/useCreateAccountForm';
import { CreateAccountFormArgs } from '../model/types';
import { TEXT } from '../model/constants';
import s from './CreateAccount.module.scss';

interface Props {
  onSubmit: (args: CreateAccountFormArgs) => void;
}

export const CreateAccount = ({ onSubmit }: Props) => {
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const { control, handleSubmit, isValid } = useCreateAccountForm(customerId);

  return (
    <form className={s.from} onSubmit={handleSubmit(onSubmit)}>
      <Text tag='h3' size='s' weight='regular'>
        {TEXT.title}
      </Text>
      <div className={s.inputsWrapper}>
        <Controller
          control={control}
          name='currency'
          render={({ field: { name, onChange } }) => (
            <RadioButton
              name={name}
              value={TEXT.rub}
              label={TEXT.rub}
              icon={{ icon: 'ruble' }}
              size='s'
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='currency'
          render={({ field: { name, onChange } }) => (
            <RadioButton
              name={name}
              value={TEXT.usd}
              label={TEXT.usd}
              icon={{ icon: 'dollar' }}
              size='s'
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='currency'
          render={({ field: { name, onChange } }) => (
            <RadioButton
              name={name}
              value={TEXT.eur}
              label={TEXT.eur}
              icon={{ icon: 'euro' }}
              size='s'
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className={s.footer}>
        <div className={s.switcherWrapper}>
          <Text tag='p' size='s'>
            {TEXT.createMainAccount}
          </Text>
          <Controller
            control={control}
            name='isMain'
            render={({ field: { value, name, onChange } }) => (
              <Switch name={name} checked={value} onChange={onChange} />
            )}
          />
        </div>
        <Button type='submit' width='max' disabled={!isValid} className={s.submitBtn}>
          {TEXT.submitBtn}
        </Button>
      </div>
    </form>
  );
};
