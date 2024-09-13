import { useEffect, useMemo, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider, FormInstance, SelectProps } from 'antd';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import moment from 'moment';

import api from 'api';
import { Button, FormItem, Input, Loader, Select } from 'uiKit';
import selectorsDocumentIdentity from 'common/documentIdentity/selectors';
import { DateFormat } from 'helpers/date';
import actionDocumentIdentity from 'common/documentIdentity/actions';
import { FieldsDocumentIdentity, getValidationRules } from 'common/documentIdentity/helpers';
import { ValidationMessage } from 'helpers/form';

import styledDocumentIdentity from '../styled';

const { DatePickerStyled, FormStepWrapper } = styledDocumentIdentity;

type Props = {
  isActive: boolean;
  form: FormInstance;
  handleSubmit: VoidFunction;
  handleGoBack: VoidFunction;
};

const MigrationCardForm: FC<Props> = ({ isActive, form, handleSubmit, handleGoBack }) => {
  const residenceDocumentTypes = useSelector(
    selectorsDocumentIdentity.selectResidenceDocumentTypes
  );
  const residenceDocumentFields = useSelector(
    selectorsDocumentIdentity.selectResidenceDocumentFields
  );

  const isLoadingResidenceDocumentFields = useSelector(
    selectorsDocumentIdentity.selectIsLoadingGetResidenceDocumentFields
  );

  const dispatch = useDispatch();

  const optionsDocumentTypes = useMemo(
    () =>
      residenceDocumentTypes?.map((doc) => ({
        label: doc.name,
        value: doc.name
      })),
    [residenceDocumentTypes]
  );

  const onChangeResidenceDocumentType: SelectProps<string>['onChange'] = (value) => {
    dispatch(
      actionDocumentIdentity.getResidenceDocumentFields({ typeId: getDocumentTypeId(value)! })
    );
  };

  useEffect(() => {
    const currentDocumentName = form.getFieldValue(
      FieldsDocumentIdentity.MigrationCardFields.APPROVED_STAYING_DOCUMENT
    );

    if (currentDocumentName) {
      dispatch(
        actionDocumentIdentity.getResidenceDocumentFields({
          typeId: getDocumentTypeId(currentDocumentName)!
        })
      );
      return;
    }

    const [firstDocument] = optionsDocumentTypes || [];
    if (firstDocument) {
      const firstDocumentName = firstDocument.value;
      const currentFields = form.getFieldsValue();

      form.setFieldsValue({
        ...currentFields,
        [FieldsDocumentIdentity.MigrationCardFields.APPROVED_STAYING_DOCUMENT]: firstDocumentName
      });

      dispatch(
        actionDocumentIdentity.getResidenceDocumentFields({
          typeId: getDocumentTypeId(firstDocumentName)!
        })
      );
    }
  }, [optionsDocumentTypes]);

  const isShowFormItem = (fieldName: NamePath) => {
    return residenceDocumentFields?.some((field) => field.nameEn === fieldName) || false;
  };

  const ruleValidationDate: Rule = (form) => ({
    async validator() {
      const documentTypeId = getDocumentTypeId(
        form.getFieldValue(FieldsDocumentIdentity.MigrationCardFields.APPROVED_STAYING_DOCUMENT)
      );
      const departureDate = form.getFieldValue(
        FieldsDocumentIdentity.MigrationCardFields.DEPARTURE_DATE
      );
      const arrivingDate = form.getFieldValue(
        FieldsDocumentIdentity.MigrationCardFields.ARRIVING_DATE
      );
      const today = moment().endOf('day');

      if (arrivingDate && arrivingDate.isAfter(today)) {
        return Promise.reject(new Error(ValidationMessage.INVALID_MIGRATION_DATES));
      } 
      
      if (documentTypeId && departureDate) {
        const responseValidation = await api.identityDocuments.getResidenceDocumentValidityPeriod({
          typeId: documentTypeId,
          documentEndDate: moment(departureDate).format(DateFormat.YYYYMMDD),
          currentDate: moment().format(DateFormat.YYYYMMDD)
        });

        const isInvalidDate = responseValidation?.data.isDocumentValid === false;
        if (isInvalidDate) {
          return Promise.reject(new Error(ValidationMessage.INVALID_STAYING_DOCUMENT));
        } else {
          return Promise.resolve();
        }      
      } else {
        return Promise.resolve();
      }
    }
  });

  const getDocumentTypeId = (documentTypeName: string) =>
    residenceDocumentTypes?.find(({ name }) => name === documentTypeName)?.id;

  if (isLoadingResidenceDocumentFields) {
    return <Loader title="Загрузка необходимых полей" />;
  }

  return (
    <FormStepWrapper isActive={isActive}>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <FormItem name={FieldsDocumentIdentity.MigrationCardFields.APPROVED_STAYING_DOCUMENT}>
            <Select
              defaultActiveFirstOption
              size="large"
              options={optionsDocumentTypes}
              onChange={onChangeResidenceDocumentType}
            />
          </FormItem>
        </Col>
        <Col span={8} />
      </Row>
      <Divider />
      {isShowFormItem(FieldsDocumentIdentity.MigrationCardFields.MIGRATION_CARD_NUMBER) && (
        <FormItem
          name={FieldsDocumentIdentity.MigrationCardFields.MIGRATION_CARD_NUMBER}
          rules={getValidationRules({
            documentFields: residenceDocumentFields!,
            fieldName: FieldsDocumentIdentity.MigrationCardFields.MIGRATION_CARD_NUMBER,
            additionalRule: ruleValidationDate
          })}
        >
          <Input placeholder="Номер миграционной карты" />
        </FormItem>
      )}
      <Row justify="space-between" gutter={8}>
        {isShowFormItem(FieldsDocumentIdentity.MigrationCardFields.ARRIVING_DATE) && (
          <Col span={12}>
            <FormItem
              name={FieldsDocumentIdentity.MigrationCardFields.ARRIVING_DATE}
              rules={getValidationRules({
                documentFields: residenceDocumentFields!,
                fieldName: FieldsDocumentIdentity.MigrationCardFields.ARRIVING_DATE,
                additionalRule: ruleValidationDate,
                isSkipDataTypeValidation: true
              })}
            >
              <DatePickerStyled placeholder="Дата начала пребывания" />
            </FormItem>
          </Col>
        )}
        {isShowFormItem(FieldsDocumentIdentity.MigrationCardFields.DEPARTURE_DATE) && (
          <Col span={12}>
            <FormItem
              name={FieldsDocumentIdentity.MigrationCardFields.DEPARTURE_DATE}
              rules={getValidationRules({
                documentFields: residenceDocumentFields!,
                fieldName: FieldsDocumentIdentity.MigrationCardFields.DEPARTURE_DATE,
                additionalRule: ruleValidationDate,
                isSkipDataTypeValidation: true
              })}
            >
              <DatePickerStyled placeholder="Дата окончания пребывания" />
            </FormItem>
          </Col>
        )}
      </Row>
      <Row align="middle" justify="space-between">
        <Button onClick={handleGoBack}>Назад</Button>
        <Button type="primary" onClick={handleSubmit}>
          Далее
        </Button>
      </Row>
    </FormStepWrapper>
  );
};

export default MigrationCardForm;
