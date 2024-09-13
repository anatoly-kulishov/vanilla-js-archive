import { StepPage } from '@/widgets/stepForm';
import {
  DeliveryTypeFormPageDeliveryTypeValue,
  OrderCardFormLSKeys,
  StepFormAdditionalData,
  deliveryPages,
} from '../../../model';
import styles from './DeliveryStepPage.module.scss';

export const DeliveryStepPage: StepPage<StepFormAdditionalData> = ({
  setCanGoNext,
  setIsFormLoading,
  setCurrentIndex,
  isFormLoading,
  additionalData: { cardFormLSApi, pageFlow },
}) => {
  const deliveryType = cardFormLSApi.getValue<DeliveryTypeFormPageDeliveryTypeValue>(
    OrderCardFormLSKeys.DELIVERY_TYPE,
  );

  if (!deliveryType) {
    setCurrentIndex(pageFlow.indexOf(DeliveryStepPage) - 1);
  }

  if (!deliveryType) {
    return null;
  }

  const DeliveryPage = deliveryPages[deliveryType];

  return (
    <div className={styles['delivery-page']}>
      <DeliveryPage
        setCanGoNext={setCanGoNext}
        isFormLoading={isFormLoading}
        setIsFormLoading={setIsFormLoading}
      />
    </div>
  );
};
