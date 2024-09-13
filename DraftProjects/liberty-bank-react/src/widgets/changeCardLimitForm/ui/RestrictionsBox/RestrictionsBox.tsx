import { Control, Controller } from 'react-hook-form';
import styles from '../ChangeCardLimitForm.module.scss';
import { Button, Checkbox, Switch, Text } from '@/shared';
import { TEXT } from '../../constants/constants';
import { ChangeCardLimitsFormArgs } from '../..';

interface RestrictionsBoxProps {
  showSwitch: boolean;
  control: Control<ChangeCardLimitsFormArgs>;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export const RestrictionsBox = ({
  showSwitch,
  control,
  isActive,
  setIsActive,
}: RestrictionsBoxProps) => {
  return (
    <>
      {showSwitch && (
        <div className={styles['switch-box']}>
          <Controller
            control={control}
            name='internetPurchases'
            render={({ field: { name, value, onChange } }) => (
              <Switch name={name} onChange={onChange} checked={value} />
            )}
          />
          <Text tag={'p'} weight={'bold'} size={'s'} className={styles['switch-text']}>
            {TEXT.SWITCHER_ONLINE_SHOP}
          </Text>
        </div>
      )}
      <div className={styles.checkbox}>
        <Controller
          control={control}
          name='termsAgree'
          render={({ field: { name } }) => (
            <Checkbox
              name={name}
              required
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          )}
        />
        <Text tag={'p'} weight={'regular'} size={'xs'} className={styles['checkbox-text']}>
          {TEXT.CHECKBOX_AGREE}
          <Button theme='tertiary' size={'m'} href={''} className={styles['checkbox-text-link']}>
            {TEXT.CHECKBOX_CONDITIONS}
          </Button>
        </Text>
      </div>
    </>
  );
};
