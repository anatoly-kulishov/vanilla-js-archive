import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import {
  CardOrderStepFormAdditionalData,
  OrderCardFormLSKeys,
  orderCardFormLSApi,
} from '@/entities/cardForm';
import {
  usePostCardOrderMutation,
  getAccessToken,
  getCustomerId,
  CardTypeName,
  DeliveryType,
  PaymentSystem,
  CurrencyCode,
} from '@/shared';
import { AnswerTypes } from '@/pages/orderCardResult/types';
import { StepForm } from '@/widgets/stepForm';
import { getOrderCardPageFlowByProductType } from '../../utils/getOrderCardPageFlowByProductType';
import { newCardResponseTypeStatuses } from './types';

interface Props {
  productType: string;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export const OrderCard: FC<Props> = ({ productType, currentIndex, setCurrentIndex }) => {
  const [canGoNext, setCanGoNext] = useState(false);
  const navigate = useNavigate();
  const [postCardOrder, { error, isSuccess }] = usePostCardOrderMutation();
  const pageFlow = getOrderCardPageFlowByProductType(productType);
  const pagesCount = pageFlow.length;
  const StepPage = currentIndex < pagesCount ? pageFlow[currentIndex] : null;

  const additionalData: CardOrderStepFormAdditionalData = {
    pageFlow,
    cardFormLSApi: orderCardFormLSApi,
    productType: productType,
  };

  useEffect(() => {
    if (orderCardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE) !== productType) {
      orderCardFormLSApi.clearFormData(Object.values(OrderCardFormLSKeys));
      setCurrentIndex(0);
    }

    if (error) {
      const status = (error as FetchBaseQueryError).status;
      if (typeof status === 'number') {
        const answerType = newCardResponseTypeStatuses[status];
        if (answerType) {
          navigate('/cards/card-order/answers', {
            state: {
              answerType,
            },
          });
        }
      }
    }
    if (isSuccess) {
      orderCardFormLSApi.clearFormData(Object.values(OrderCardFormLSKeys));
      navigate('/cards/card-order/answers', {
        state: {
          answerType: AnswerTypes.SUCCESS,
        },
      });
    }
  }, [error, isSuccess, productType]);

  useEffect(() => {
    orderCardFormLSApi.setValue(OrderCardFormLSKeys.PAGE_INDEX, currentIndex);
  }, [currentIndex]);

  const maximumIndexReachingHandler = async () => {
    const accessToken = getAccessToken();
    const productName = orderCardFormLSApi.getValue<CardTypeName>(OrderCardFormLSKeys.PRODUCT_TYPE);
    const accountId =
      orderCardFormLSApi.getValue<string>(OrderCardFormLSKeys.ACCOUNT_ID) ?? undefined;
    const customerId = getCustomerId(accessToken!);
    const currency = orderCardFormLSApi.getValue<CurrencyCode>(OrderCardFormLSKeys.CURRENCY);
    const paymentSystem = orderCardFormLSApi.getValue<PaymentSystem>(
      OrderCardFormLSKeys.PAYMENT_SYSTEM,
    );
    const deliveryType =
      orderCardFormLSApi.getValue<DeliveryType>(OrderCardFormLSKeys.DELIVERY_TYPE) ?? 'EMAIL';
    const officeNumber =
      orderCardFormLSApi.getValue<string>(OrderCardFormLSKeys.BANK_BRANCH_ID) ?? undefined;
    const region =
      orderCardFormLSApi.getValue<string>(OrderCardFormLSKeys.DELIVERY_REGION) ?? undefined;
    const city = orderCardFormLSApi.getValue<string>(OrderCardFormLSKeys.CITY) ?? undefined;
    const street = orderCardFormLSApi.getValue<string>(OrderCardFormLSKeys.STREET) ?? undefined;
    const houseNumber =
      orderCardFormLSApi.getValue<string>(OrderCardFormLSKeys.BUILDING) ?? undefined;
    const apartmentNumber =
      orderCardFormLSApi.getValue<number>(OrderCardFormLSKeys.APARTMENT) ?? undefined;
    const entrance = orderCardFormLSApi.getValue<number>(OrderCardFormLSKeys.ENTRANCE) ?? undefined;
    const floor = orderCardFormLSApi.getValue<number>(OrderCardFormLSKeys.FLOOR) ?? undefined;
    const postcode =
      orderCardFormLSApi.getValue<number>(OrderCardFormLSKeys.POST_CODE) ?? undefined;

    if (customerId && productName && currency && paymentSystem && deliveryType) {
      await postCardOrder({
        // Таков DTO
        // eslint-disable-next-line camelcase
        type_name: productName,
        accountId,
        customer: customerId,
        currency,
        paymentSystem,
        deliveryType,
        officeNumber,
        region,
        city,
        street,
        houseNumber,
        apartmentNumber,
        entrance,
        floor,
        postcode,
      });
    }
  };

  return (
    <StepForm
      page={StepPage}
      additionalData={additionalData}
      pagesCount={pagesCount}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      canGoNext={canGoNext}
      setCanGoNext={setCanGoNext}
      maximumIndexReachingHandler={maximumIndexReachingHandler}
    />
  );
};
