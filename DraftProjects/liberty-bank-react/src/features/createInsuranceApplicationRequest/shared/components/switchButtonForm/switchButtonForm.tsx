import { Controller, useFormContext } from 'react-hook-form';
import { Switch } from '@/shared';
import styles from '../../styles/styles.module.scss';
import classNames from 'classnames';
import { FC } from 'react';

type PropsType = {
  name: string;
  title: string;
};

export const SwitchButtonForm: FC<PropsType> = ({ name, title }) => {
  const { control } = useFormContext();

  return (
    <div className={classNames(styles['form__field'], styles['switch_button'])}>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ field: { name, onChange, value } }) => (
          <Switch name={name} label={title} checked={value} onChange={onChange} />
        )}
      />
    </div>
  );
};
