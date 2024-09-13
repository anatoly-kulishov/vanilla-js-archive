import { useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { Input, Text, useLazyGetBankBranchesInfoQuery } from '@/shared';
import {
  BANK_DELIVERY_STEP_PAGE_TEXT,
  DeliveryPage,
  Position,
  BankBranchSearchArgs,
} from '../../../../model';
import { useBankBranchSelect } from '../../../../hooks/useBankBranchSelect';
import { parseCoordinates } from '../../../../lib';
import { BankBranchItem } from './ui/bankBranchItem/BankBranchItem';
import styles from './BankDeliveryStepPage.module.scss';

export const BankDeliveryStepPage: DeliveryPage = ({ setIsFormLoading, setCanGoNext }) => {
  const [getBankBranchesInfo, { data, isError, isSuccess }] = useLazyGetBankBranchesInfoQuery();
  const { handleSelectBranch, selectedOfficeID, handleClearSelectedBranch } = useBankBranchSelect();
  const { control, handleSubmit } = useForm<BankBranchSearchArgs>();
  const [userPosition, setUserPosition] = useState<Position | null>(null);

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  useEffect(() => {
    setCanGoNext(Boolean(selectedOfficeID && !isError));
  }, [selectedOfficeID, isError]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          getBankBranchesInfo({});
        },
        () => {
          getBankBranchesInfo({});
        },
      );
    } else {
      getBankBranchesInfo({});
    }
  }, [navigator.geolocation]);

  const onSubmit: SubmitHandler<BankBranchSearchArgs> = (data) => {
    // TODO: Временное решение пока не будет осуществлён переезд на новый EP
    const searchQuery = data.searchQuery;
    const isNotNumber = isNaN(Number(searchQuery));

    !searchQuery.length
      ? getBankBranchesInfo({})
      : isNotNumber
      ? getBankBranchesInfo({ city: searchQuery })
      : getBankBranchesInfo({ officeNumber: searchQuery });
  };

  const renderBankBranchItems = () => {
    if (isError) {
      return (
        <Text tag='p' size='s' weight='regular' className={styles.caption}>
          {BANK_DELIVERY_STEP_PAGE_TEXT.SEARCH_ERROR}
        </Text>
      );
    }

    if (!data?.length) {
      if (selectedOfficeID !== null && isSuccess) {
        handleClearSelectedBranch();
      }

      return (
        <Text tag='p' size='s' weight='regular' className={styles.caption}>
          {BANK_DELIVERY_STEP_PAGE_TEXT.NO_FOUND}
        </Text>
      );
    } else {
      if (selectedOfficeID !== null) {
        const isDataIncludesSelectedOfficeID = data.some(
          (branch) => branch.officeUuid === selectedOfficeID,
        );

        if (!isDataIncludesSelectedOfficeID) {
          handleClearSelectedBranch();
        }
      }

      return (
        <ul className={styles.list}>
          {data.map((branch) => (
            <BankBranchItem
              key={branch.officeUuid}
              officeID={branch.officeUuid}
              officeNumber={branch.officeNumber}
              isClosed={branch.isClosed}
              city={branch.address.city}
              street={branch.address.street}
              buildingNumber={branch.address.buildingNumber}
              branchPosition={parseCoordinates(branch.address.coordinates)}
              userPosition={userPosition}
              isSelected={selectedOfficeID === branch.officeUuid}
              onBranchSelect={handleSelectBranch}
              testId='bank-delivery'
            />
          ))}
        </ul>
      );
    }
  };

  return (
    <div className={styles['bank-delivery-step-page']}>
      <Text
        tag='p'
        size='s'
        weight='regular'
        className={styles.pageTitle}
        data-testid='delivery-to-bank-branch-title'
      >
        {BANK_DELIVERY_STEP_PAGE_TEXT.PAGE_TITLE}
      </Text>
      {/*
       * TODO: Ниже временный текстовый блок который нужно будет удалить
       * при переходе поиска на новый EP
       */}
      <Text tag='p' size='xs' weight='regular' className={styles.temp}>
        {BANK_DELIVERY_STEP_PAGE_TEXT.SEARCH_INSTRUCTION}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='searchQuery'
          render={({ field: { name, onChange } }) => (
            <Input.Search
              name={name}
              placeholder={BANK_DELIVERY_STEP_PAGE_TEXT.INPUT_PLACEHOLDER}
              white
              className={styles.inputSearch}
              onChange={onChange}
              dataTestId='search-bank-branch-input'
            />
          )}
        />
      </form>
      <div className={styles.listWrapper}>{renderBankBranchItems()}</div>
    </div>
  );
};
