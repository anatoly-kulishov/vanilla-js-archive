import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { COURIER_DELIVERY_STEP_PAGE_TEXT, orderCardFormLSApi } from '@/entities/cardForm/model';
import { useCourierDeliveryStepPageForm } from '@/entities/cardForm/hooks/useCourierDeliveryStepPageForm';
import { Text, Input, InputErrorMessage } from '@/shared';
import { DeliveryPage } from '@/entities/cardForm';
import styles from './CourierDeliveryStepPage.module.scss';

export const CourierDeliveryStepPage: DeliveryPage = ({ setCanGoNext, setIsFormLoading }) => {
  const { control, isValid, errors } = useCourierDeliveryStepPageForm(orderCardFormLSApi);

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  useEffect(() => {
    setCanGoNext(isValid);
  }, [isValid]);

  return (
    <div className={styles['courier-delivery-step-page']}>
      <div className={styles['courier-delivery-step-page__form-wrapper']}>
        <Text tag='p'>{COURIER_DELIVERY_STEP_PAGE_TEXT.ADDRESS_TITLE}</Text>
        <div className={styles['courier-delivery-step-page__inputs-wrapper']}>
          <div className={styles['courier-delivery-step-page__input-wrapper']}>
            <Controller
              control={control}
              name='deliveryCity'
              render={({ field, fieldState: { invalid } }) => (
                <Input.Text
                  white
                  size='m'
                  label={COURIER_DELIVERY_STEP_PAGE_TEXT.CITY_LABEL}
                  required
                  isError={invalid}
                  {...field}
                />
              )}
            />
            {errors.deliveryCity?.message && (
              <InputErrorMessage message={errors.deliveryCity?.message} />
            )}
          </div>
          <div className={styles['courier-delivery-step-page__input-wrapper']}>
            <Controller
              control={control}
              name='deliveryStreet'
              render={({ field, fieldState: { invalid } }) => (
                <Input.Text
                  white
                  size='m'
                  label={COURIER_DELIVERY_STEP_PAGE_TEXT.STREET_LABEL}
                  required
                  isError={invalid}
                  {...field}
                />
              )}
            />
            {errors.deliveryStreet?.message && (
              <InputErrorMessage message={errors.deliveryStreet?.message} />
            )}
          </div>
          <div className={styles['courier-delivery-step-page__input-wrapper']}>
            <Controller
              control={control}
              name='deliveryBuilding'
              render={({ field, fieldState: { invalid } }) => (
                <Input.Text
                  white
                  size='m'
                  label={COURIER_DELIVERY_STEP_PAGE_TEXT.HOUSE_LABEL}
                  required
                  isError={invalid}
                  {...field}
                />
              )}
            />
            {errors.deliveryBuilding?.message && (
              <InputErrorMessage message={errors.deliveryBuilding?.message} />
            )}
          </div>
          <Controller
            control={control}
            name='deliveryApartment'
            render={({ field }) => (
              <Input.Text
                white
                size='m'
                label={COURIER_DELIVERY_STEP_PAGE_TEXT.APARTMENT_LABEL}
                required={false}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='deliveryFloor'
            render={({ field }) => (
              <Input.Text
                white
                size='m'
                label={COURIER_DELIVERY_STEP_PAGE_TEXT.FLOOR_LABEL}
                required={false}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='deliveryEntrance'
            render={({ field }) => (
              <Input.Text
                white
                size='m'
                label={COURIER_DELIVERY_STEP_PAGE_TEXT.ENTRANCE_LABEL}
                required={false}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className={styles['courier-delivery-step-page__form-wrapper']}>
        <Text tag='p'>{COURIER_DELIVERY_STEP_PAGE_TEXT.DATE_AND_TIME_TITLE}</Text>
        <div className={styles['courier-delivery-step-page__inputs-wrapper']}>
          <div className={styles['courier-delivery-step-page__input-wrapper']}>
            <Controller
              control={control}
              name='deliveryDate'
              render={({ field: { name, onChange, value }, fieldState: { invalid } }) => (
                <Input.Date
                  white
                  size='m'
                  label={COURIER_DELIVERY_STEP_PAGE_TEXT.DELIVERY_DATE_LABEL}
                  required
                  isError={invalid}
                  {...{ name, onChange, value }}
                />
              )}
            />
            {errors.deliveryDate?.message && (
              <InputErrorMessage message={errors.deliveryDate?.message} />
            )}
          </div>
          <div className={styles['courier-delivery-step-page__input-wrapper']}>
            <Controller
              control={control}
              name='deliveryTime'
              render={({ field, fieldState: { invalid } }) => (
                <Input.Text
                  white
                  size='m'
                  label={COURIER_DELIVERY_STEP_PAGE_TEXT.DELIVERY_TIME_LABEL}
                  required
                  isError={invalid}
                  {...field}
                />
              )}
            />
            {errors.deliveryTime?.message && (
              <InputErrorMessage message={errors.deliveryTime?.message} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
