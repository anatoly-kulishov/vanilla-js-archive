import { Controller, useFormContext } from 'react-hook-form';
import { Switch } from '@/shared';
import styles from '../../shared/styles/styles.module.scss';
import classNames from 'classnames';
import { FC } from 'react';
import { CHECKBOX_TITLES } from '../../shared/constants';

type PropsType = {
  name: string;
};

export const SwitchButtonForm: FC<PropsType> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <div className={classNames(styles['form__field'], styles['switch_button'])}>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ field: { name, onChange, value } }) => (
          <Switch name={name} label={CHECKBOX_TITLES[name]} checked={value} onChange={onChange} />
        )}
      />
    </div>
  );
};
