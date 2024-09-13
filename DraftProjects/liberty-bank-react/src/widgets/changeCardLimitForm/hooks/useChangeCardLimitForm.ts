import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changeCardLimitFormScheme } from '@/shared/validationSchemes/changeCardLimitFormScheme';
import { getDefaultChangeCardLimitValues } from '../helpers/getDefaultChangeCardLimitValues';
import { ChangeCardLimitsDurations, ChangeCardLimitsFormArgs, ChangeCardLimitsTypes } from '..';
import { OPERATION_LIMIT_FIELDS } from '../constants/constants';
import { useReactHookFormWatch } from '@/shared';

export const useChangeCardLimitForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,

    formState: { isValid },
  } = useForm<ChangeCardLimitsFormArgs>({
    defaultValues: getDefaultChangeCardLimitValues(),
    resolver: yupResolver(changeCardLimitFormScheme),
    mode: 'onBlur',
  });
  const [limitType, duration] = watch(['limitType', 'duration']);
  const isInternetSwitch = watch('limitType') !== ChangeCardLimitsTypes.CASH;

  useReactHookFormWatch(
    watch,
    (values, { name }) => {
      if (values.limitType === ChangeCardLimitsTypes.CASH && name === 'limitType') {
        setValue('duration', ChangeCardLimitsDurations.DAY);
      }

      if (name === 'duration' || name === 'limitType') {
        OPERATION_LIMIT_FIELDS.forEach((field) => {
          setValue(field, undefined);
        });
        setValue('internetPurchases', false);
      }
    },
    [limitType, duration],
  );

  return {
    control,
    isValid,
    handleSubmit,
    limitType,
    duration,
    isInternetSwitch,
  };
};
