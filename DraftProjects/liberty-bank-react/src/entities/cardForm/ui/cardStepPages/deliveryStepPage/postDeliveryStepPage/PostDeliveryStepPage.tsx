import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Input, InputErrorMessage, Text } from '@/shared';
import { DeliveryPage, POST_DELIVERY_STEP_PAGE_TEXT, orderCardFormLSApi } from '../../../..';
import { usePostDeliveryStepPageForm } from '../../../../hooks/usePostDeliveryStepPageForm';
import s from './PostDeliveryStepPage.module.scss';

export const PostDeliveryStepPage: DeliveryPage = ({ setIsFormLoading, setCanGoNext }) => {
  const { control, isValid, errors } = usePostDeliveryStepPageForm(orderCardFormLSApi);

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  useEffect(() => {
    setCanGoNext(isValid);
  }, [isValid]);

  return (
    <div>
      <Text tag={'p'}>{POST_DELIVERY_STEP_PAGE_TEXT.PAGE_TITLE}</Text>
      <div className={s.form}>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='region'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.REGION_LABEL}
                maxLength={50}
                isError={invalid}
                required
                {...field}
              />
            )}
          />
          {errors.region?.message && <InputErrorMessage message={errors.region?.message} />}
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='postCode'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.POST_CODE_LABEL}
                maxLength={6}
                isError={invalid}
                required
                {...field}
              />
            )}
          />
          {errors.postCode?.message && <InputErrorMessage message={errors.postCode?.message} />}
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='city'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.CITY_LABEL}
                maxLength={50}
                isError={invalid}
                required
                {...field}
              />
            )}
          />
          {errors.city?.message && <InputErrorMessage message={errors.city?.message} />}
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='street'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.STREET_LABEL}
                maxLength={50}
                isError={invalid}
                required
                {...field}
              />
            )}
          />
          {errors.street?.message && <InputErrorMessage message={errors.street?.message} />}
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='building'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.HOUSE_LABEL}
                maxLength={20}
                isError={invalid}
                required
                {...field}
              />
            )}
          />
          {errors.building?.message && <InputErrorMessage message={errors.building?.message} />}
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='apartment'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.APARTMENT_LABEL}
                maxLength={5}
                isError={invalid}
                required={false}
                {...field}
              />
            )}
          />
          {errors.apartment?.message && <InputErrorMessage message={errors.apartment?.message} />}
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='floor'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.FLOOR_LABEL}
                maxLength={3}
                isError={invalid}
                required={false}
                {...field}
              />
            )}
          />
          {errors.floor?.message && <InputErrorMessage message={errors.floor?.message} />}
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name='entrance'
            render={({ field, fieldState: { invalid } }) => (
              <Input.Text
                white
                size='m'
                label={POST_DELIVERY_STEP_PAGE_TEXT.ENTRANCE_LABEL}
                maxLength={2}
                isError={invalid}
                required={false}
                {...field}
              />
            )}
          />
          {errors.entrance?.message && <InputErrorMessage message={errors.entrance?.message} />}
        </div>
      </div>
    </div>
  );
};
