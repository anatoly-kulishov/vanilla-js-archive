import { RadioButton, Text } from '@/shared';
import { StepPage } from '@/widgets/stepForm';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  DELIVERY_TYPE_STEP_PAGE_TEXT,
  DeliveryTypeFormPageDeliveryTypeValue,
  OrderCardFormLSKeys,
  StepFormAdditionalData,
  deliveryTypes,
} from '../../../model';
import styles from './DeliveryTypeStepPage.module.scss';

export const DeliveryTypeStepPage: StepPage<StepFormAdditionalData> = ({
  setCanGoNext,
  setIsFormLoading,
  additionalData: { cardFormLSApi },
}) => {
  const [selectedAccountType, setSelectedAccountType] = useState<
    DeliveryTypeFormPageDeliveryTypeValue | undefined
  >(cardFormLSApi.getValue(OrderCardFormLSKeys.DELIVERY_TYPE) ?? undefined);

  const handleDeliveryTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAccountType(e.currentTarget.value as DeliveryTypeFormPageDeliveryTypeValue);
  };

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  useEffect(() => {
    if (selectedAccountType) {
      setCanGoNext(true);
      cardFormLSApi.setValue(OrderCardFormLSKeys.DELIVERY_TYPE, selectedAccountType);
    } else {
      setCanGoNext(false);
    }
  }, [selectedAccountType]);

  return (
    <div className={styles['delivery-type-step-page']}>
      <Text tag={'p'}>{DELIVERY_TYPE_STEP_PAGE_TEXT.PAGE_TITLE}</Text>
      <div className={styles['delivery-type-step-page__options']}>
        {deliveryTypes.map((deliveryType) => (
          <RadioButton
            key={deliveryType.value}
            name={deliveryType.value}
            value={deliveryType.value}
            label={deliveryType.label}
            size='s'
            checked={selectedAccountType === deliveryType.value}
            onChange={handleDeliveryTypeChange}
            // TODO: Значения ниже временное. Введено к MVP, после доработки остальных сценариев доставки должно быть удалено.
            disabled={deliveryType.disabled}
          />
        ))}
      </div>
    </div>
  );
};
