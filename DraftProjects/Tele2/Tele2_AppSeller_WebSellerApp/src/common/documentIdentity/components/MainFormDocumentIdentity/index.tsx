import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Row,
  SelectProps,
  FormInstance,
  Divider,
  Radio as AntdRadio,
  DatePickerProps,
  AutoCompleteProps,
  InputProps
} from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import ReactInputMask from 'react-input-mask';
import moment from 'moment';

import api from 'api';
import {
  Button,
  FormItem,
  Input,
  PhoneMask,
  Radio,
  Select,
  Title,
  TextArea,
  AutoComplete,
  Loader
} from 'uiKit';
import {
  getFormFieldName,
  setFormFieldValues,
  useDebouncedSearch,
  useSearchInputValidation,
  ValidationMessage
} from 'helpers/form';
import {
  FieldsDocumentIdentity,
  RUSSIAN_FEDERATION,
  RUSSIAN_PASSPORT_NAME,
  RUSSIAN_PASSPORT_ID,
  getValidationRules
} from 'common/documentIdentity/helpers';
import { DaDataIntegrationService } from 'api/daDataIntegration/types';
import { IdentityDocumentsService } from 'api/identityDocuments/types';
import selectorsDocumentIdentity from 'common/documentIdentity/selectors';
import actionDocumentIdentity from 'common/documentIdentity/actions';
import { EMAIL_REGEXP } from 'helpers/patterns';
import { DateFormat } from 'helpers/date';
import {
  FieldsRegistartionAddress,
  getFoundAddress,
  hasAllRequiredAddressFields
} from 'helpers/daData';

import styledDocumentIdentity from '../styled';
import RegistrationAddressModal from '../RegistrationAddressModal';
import { useMount, useUpdate } from 'helpers/hooks';

const { Group: RadioGroup } = AntdRadio;
const {
  RequiredLabel,
  DatePickerStyled,
  CardUFMS,
  FormStepWrapper,
  RegistrationAddressButtonWrapper
} = styledDocumentIdentity;

type Props = {
  isActive: boolean;
  form: FormInstance;
  isPrefill?: boolean;
  parentFormName?: string;
  leftAdditional?: JSX.Element;
  rightAdditional?: JSX.Element;
  textSubmit?: string;
  textGoBack?: string;
  isLoadingSubmit?: boolean;
  isLoadingGoBack?: boolean;
  isDisabledSubmit?: boolean;
  isDisabledGoBack?: boolean;
  storeRegistrationAddress: (address: DaDataIntegrationService.Model.Address) => void;
  storeDocumentType: (documentType: IdentityDocumentsService.Model.DocumentType) => void;
  handleSubmit: VoidFunction;
  handleGoBack?: VoidFunction;
};

const MainFormDocumentIdentity: FC<Props> = ({
  isActive,
  form,
  isPrefill,
  parentFormName,
  leftAdditional,
  rightAdditional,
  textSubmit = 'Далее',
  textGoBack = 'Назад',
  isLoadingSubmit,
  isLoadingGoBack,
  isDisabledSubmit,
  isDisabledGoBack,
  storeRegistrationAddress,
  storeDocumentType,
  handleSubmit,
  handleGoBack
}) => {
  const documentTypeFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_TYPE,
    parentFormName
  });
  const firstNameFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.FIRST_NAME,
    parentFormName
  });
  const lastNameFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.LAST_NAME,
    parentFormName
  });
  const middleNameFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.MIDDLE_NAME,
    parentFormName
  });
  const birthDateFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.BIRTH_DATE,
    parentFormName
  });
  const sexFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.SEX,
    parentFormName
  });
  const birthPlaceFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.BIRTH_PLACE,
    parentFormName
  });
  const citizenshipFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.CITIZENSHIP,
    parentFormName
  });
  const citizenshipIdFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.CITIZENSHIP_ID,
    parentFormName
  });
  const documentSeriesFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_SERIES,
    parentFormName
  });
  const documentNumberFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_NUMBER,
    parentFormName
  });
  const documentDateFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_DATE,
    parentFormName
  });
  const documentCodeFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_CODE,
    parentFormName
  });
  const documentAddressFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_ADDRESS,
    parentFormName
  });
  const registrationAddressFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.REGISTRATION_ADDRESS,
    parentFormName
  });
  const contactNumberFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.CONTACT_NUMBER,
    parentFormName
  });
  const emailFieldName = getFormFieldName({
    fieldName: FieldsDocumentIdentity.MainFields.EMAIL,
    parentFormName
  });

  const documentTypes = useSelector(selectorsDocumentIdentity.selectDocumentTypes);
  const isLoadingDocumentTypes = useSelector(
    selectorsDocumentIdentity.selectIsLoadingGetDocumentTypes
  );

  const documentFields = useSelector(selectorsDocumentIdentity.selectDocumentFields);
  const isLoadingDocumentFields = useSelector(
    selectorsDocumentIdentity.selectIsLoadingGetDocumentFields
  );

  const countries = useSelector(selectorsDocumentIdentity.selectCountries);
  const isLoadingCountries = useSelector(selectorsDocumentIdentity.selectIsLoadingGetCountries);

  const ufmsDivisions = useSelector(selectorsDocumentIdentity.selectUfmsDivisions);
  const isLoadingUfmsDivisions = useSelector(
    selectorsDocumentIdentity.selectIsLoadingGetUfmsDivisions
  );

  const addresses = useSelector(selectorsDocumentIdentity.selectAddresses);
  const isLoadingAdresses = useSelector(selectorsDocumentIdentity.selectIsLoadingGetAddresses);

  const dispatch = useDispatch();

  const [documentType, setDocumentType] = useState<number>(
    () => form.getFieldValue(documentTypeFieldName) || RUSSIAN_PASSPORT_ID
  );
  const [isShowUfmsDivisions, setIsShowUfmsDivisions] = useState(false);

  const [isShowRegistrationAddressButton, setIsShowRegistrationAddressButton] = useState(false);
  const [isShowRegistrationAddressModal, setIsShowRegistrationAddressModal] = useState(false);

  useMount(() => {
    dispatch(actionDocumentIdentity.getDocumentTypes());

    const citizenship =
      form.getFieldValue(citizenshipFieldName) ||
      (documentType === RUSSIAN_PASSPORT_ID ? RUSSIAN_FEDERATION : undefined);
    handleDocumentType(documentType, citizenship);
  });

  useUpdate(() => {
    const citizenship = documentType === RUSSIAN_PASSPORT_ID ? RUSSIAN_FEDERATION : undefined;
    handleDocumentType(documentType, citizenship);
  }, [documentType]);

  const isRussianPassport = form.getFieldValue(documentTypeFieldName) === RUSSIAN_PASSPORT_ID;

  const { onChangeQuery: onChangeSearchCitizenship } = useSearchInputValidation({
    form,
    fieldName: citizenshipFieldName,
    results: countries,
    isLoading: isLoadingCountries
  });

  const { onChangeQuery: onChangeSearchRegistrationAddress } = useSearchInputValidation({
    form,
    fieldName: registrationAddressFieldName,
    results: addresses,
    isLoading: isLoadingAdresses
  });

  const ruleValidationCitizenship: Rule = () => ({
    validateTrigger: '',
    validator(_, queryCitizenship) {
      const returnError = (message: string) => Promise.reject(new Error(message));

      if (!queryCitizenship) {
        return returnError('Гражданство не введено');
      }

      const hasFoundCitizenships = countries && countries?.length > 0;
      if (!hasFoundCitizenships) {
        return returnError('Гражданство не найдено');
      }
      const foundCitizenship =
        countries && countries?.find(({ nameRu }) => nameRu === queryCitizenship);
      if (!foundCitizenship) {
        return returnError('Выберите гражданство из списка');
      }

      return Promise.resolve();
    }
  });

  const ruleValidationAddress: Rule = () => ({
    validateTrigger: '',
    validator(_, queryAddress) {
      const returnError = (message: string) => {
        setIsShowRegistrationAddressButton(true);

        return Promise.reject(new Error(message));
      };

      if (!queryAddress) {
        return returnError('Адрес не введен');
      }

      const hasFoundAddresses = addresses && addresses?.length > 0;
      if (!hasFoundAddresses) {
        return returnError('Адрес не найден');
      }

      const foundAddress = getFoundAddress({ queryAddress, addresses });
      if (!foundAddress) {
        return returnError('Выберите адрес из списка');
      }

      const hasAllRequiredFields = hasAllRequiredAddressFields({
        address: foundAddress,
        // TODO isGenerated logic
        isGenerated: false
      });
      if (!hasAllRequiredFields) {
        return returnError('Адрес введен не полностью');
      }

      return Promise.resolve();
    }
  });

  const isShowFormItem = (fieldName: NamePath) => {
    return documentFields?.some((field) => field.nameEn === fieldName) || false;
  };
  const isDisabled = (fieldName: NamePath) => {
    if (isPrefill) {
      const errors = form.getFieldError(fieldName);
      return errors.length === 0;
    }

    return false;
  };
  const isRequired = (fieldName: NamePath): boolean => {
    const { isRequired } = documentFields?.find((field) => field.nameEn === fieldName) || {};

    return Boolean(isRequired);
  };

  const optionsDocumentType = useMemo(() => {
    const hasDocumentTypes = Boolean(documentTypes?.length);
    if (hasDocumentTypes) {
      return documentTypes?.map(({ name, id }) => ({
        value: id,
        label: name
      }));
    }

    const defaultOptions = [
      {
        value: RUSSIAN_PASSPORT_ID,
        label: RUSSIAN_PASSPORT_NAME
      }
    ];
    return defaultOptions;
  }, [documentTypes]);

  const optionsCountries = useMemo(() => {
    const hasCountries = Boolean(countries?.length);
    if (hasCountries) {
      return countries?.map(({ id, nameRu }) => ({
        key: id,
        value: nameRu
      }));
    }

    const defaultOptions = [];
    return defaultOptions;
  }, [countries]);

  const optionsRegistrationAddress = useMemo(() => {
    const hasAddresses = Boolean(addresses?.length);
    if (hasAddresses) {
      return addresses!.map(({ FullAddress }) => ({
        key: FullAddress!,
        value: FullAddress!
      }));
    }

    const defaultOptions = [];
    return defaultOptions;
  }, [addresses]);

  const disabledBirthDate: DatePickerProps['disabledDate'] = (date) => {
    const minDate = moment('01.01.1900');
    const maxDate = moment().add(-14, 'y');

    return date.isBefore(minDate) || date.isAfter(maxDate);
  };

  const disabledDocumentDate: DatePickerProps['disabledDate'] = (date) => {
    const today = moment();
    const birthDate = form.getFieldValue(birthDateFieldName);

    if (birthDate) {
      return date.isAfter(today) || date.isBefore(birthDate);
    }
    return date.isAfter(today);
  };

  const ruleValidationDocumentDate: Rule = (form: FormInstance) => ({
    message: ValidationMessage.INVALID_IDENTITY_DOCUMENT,
    async validator(_, documentDate) {
      const birthDate = form.getFieldValue(birthDateFieldName);

      if (birthDate) {
        try {
          const responseValidation = await api.identityDocuments.getDocumentValidityPeriod({
            id: documentType,
            currentDate: moment().format(DateFormat.YYYYMMDD),
            birthDate: moment(birthDate).format(DateFormat.YYYYMMDD),
            issueDate: moment(documentDate).format(DateFormat.YYYYMMDD)
          });

          const isInvalidDocumentDate = responseValidation?.data?.isDocumentValid === false;
          if (isInvalidDocumentDate) {
            return Promise.reject();
          }
        } catch {
          return Promise.resolve();
        }
      }

      return Promise.resolve();
    }
  });

  const handleDocumentType = (documentType: number, citizenship: string) => {
    const fieldsForUpdate: Array<[string, unknown]> = [
      [FieldsDocumentIdentity.MainFields.DOCUMENT_TYPE, documentType],
      [FieldsDocumentIdentity.MainFields.CITIZENSHIP, citizenship]
    ];
    setFormFieldValues({
      form,
      fields: fieldsForUpdate,
      parentFormName
    });

    dispatch(
      actionDocumentIdentity.getDocumentFields({
        docTypeId: documentType
      })
    );
  };

  const showRegistrationAddresModal = () => {
    setIsShowRegistrationAddressModal(true);
  };

  const closeRegistartionAddressModal = () => {
    setIsShowRegistrationAddressModal(false);
  };

  const submitRegistartionAddressForm = (address) => {
    dispatch(actionDocumentIdentity.setAddressesManual([address]));
    setFormFieldValues({
      form,
      parentFormName,
      fields: [
        [
          FieldsDocumentIdentity.MainFields.REGISTRATION_ADDRESS,
          address[FieldsRegistartionAddress.FULL_ADDRESS]
        ]
      ]
    });
    closeRegistartionAddressModal();
  };

  const onChangeDocumentType: SelectProps<number>['onChange'] = (newDocumentType) => {
    setDocumentType(newDocumentType);

    const fieldsForUpdate: Array<[string, unknown]> = [
      [FieldsDocumentIdentity.MainFields.DOCUMENT_SERIES, ''],
      [FieldsDocumentIdentity.MainFields.DOCUMENT_NUMBER, ''],
      [FieldsDocumentIdentity.MainFields.DOCUMENT_DATE, ''],
      [FieldsDocumentIdentity.MainFields.DOCUMENT_CODE, ''],
      [FieldsDocumentIdentity.MainFields.DOCUMENT_ADDRESS, '']
    ];
    setFormFieldValues({
      form,
      fields: fieldsForUpdate,
      parentFormName
    });

    dispatch(actionDocumentIdentity.clearUfmsDivisions());
  };

  const onSearchCitizenship = useDebouncedSearch({
    search: (query) =>
      dispatch(
        actionDocumentIdentity.getCountries({
          identityDocumentType: documentType,
          countryName: query
        })
      ),
    deps: [documentType]
  });

  const onSearchRegistrationAddress = useDebouncedSearch({
    search: (query) => dispatch(actionDocumentIdentity.getAddresses({ Query: query }))
  });

  const onChangeCitizenship: AutoCompleteProps['onChange'] = (val, option) => {
    const fieldsForUpdate: Array<[string, unknown]> = [
      [FieldsDocumentIdentity.MainFields.CITIZENSHIP_ID, option['key']]
    ];
    setFormFieldValues({
      form,
      fields: fieldsForUpdate,
      parentFormName
    });
    onChangeSearchCitizenship(val);
  };

  const isDisabledDocumentCode = isDisabled(documentCodeFieldName);

  const onSearchUfmsDivisions: InputProps['onBlur'] = (event) => {
    const code = event.target.value;

    dispatch(actionDocumentIdentity.getUfmsDivisions({ code }));
    setIsShowUfmsDivisions(true);
  };

  const onClickDivison: React.DOMAttributes<HTMLDivElement>['onClick'] = (event) => {
    const divisionName = event.currentTarget.dataset.divisionName;

    const fieldsForUpdate: Array<[string, unknown]> = [
      [FieldsDocumentIdentity.MainFields.DOCUMENT_ADDRESS, divisionName]
    ];
    setFormFieldValues({
      form,
      fields: fieldsForUpdate,
      parentFormName
    });
    setIsShowUfmsDivisions(false);
  };

  const onClickSubmit = async () => {
    try {
      await form.validateFields();

      const foundAddress = getFoundAddress({
        queryAddress: form.getFieldValue(registrationAddressFieldName),
        addresses: addresses!
      });
      storeRegistrationAddress?.(foundAddress!);

      const documentTypeId = form.getFieldValue(documentTypeFieldName);
      const documentType = documentTypes!.find(
        (document) => document.id === Number(documentTypeId)
      )!;
      storeDocumentType?.(documentType);

      handleSubmit();
    } catch {}
  };

  return (
    <FormStepWrapper isActive={isActive}>
      <Row gutter={16}>
        <Col span={8}>{leftAdditional}</Col>
        <Col span={8}>
          <FormItem name={documentTypeFieldName}>
            <Select
              size="large"
              style={{ textAlign: 'center' }}
              placeholder="Выберите тип документа"
              loading={isLoadingDocumentTypes}
              disabled={isPrefill || isLoadingDocumentTypes}
              options={optionsDocumentType}
              onChange={onChangeDocumentType}
            />
          </FormItem>
        </Col>
        <Col span={8}>{rightAdditional}</Col>
      </Row>
      <Divider />
      <div>
        {isLoadingDocumentFields ? (
          <Loader title="Идет подготовка формы ДУЛ" />
        ) : (
          <Row gutter={16}>
            <Col span={8}>
              {isShowFormItem(FieldsDocumentIdentity.MainFields.LAST_NAME) && (
                <FormItem
                  name={lastNameFieldName}
                  validateTrigger=""
                  rules={getValidationRules({
                    documentFields: documentFields!,
                    fieldName: FieldsDocumentIdentity.MainFields.LAST_NAME
                  })}
                  isRequired={isRequired(FieldsDocumentIdentity.MainFields.LAST_NAME)}
                >
                  <Input placeholder="Фамилия" disabled={isDisabled(lastNameFieldName)} />
                </FormItem>
              )}
              {isShowFormItem(FieldsDocumentIdentity.MainFields.FIRST_NAME) && (
                <FormItem
                  name={firstNameFieldName}
                  rules={getValidationRules({
                    documentFields: documentFields!,
                    fieldName: FieldsDocumentIdentity.MainFields.FIRST_NAME
                  })}
                  isRequired={isRequired(FieldsDocumentIdentity.MainFields.FIRST_NAME)}
                >
                  <Input placeholder="Имя" disabled={isDisabled(firstNameFieldName)} />
                </FormItem>
              )}
              {isShowFormItem(FieldsDocumentIdentity.MainFields.MIDDLE_NAME) && (
                <FormItem
                  name={middleNameFieldName}
                  rules={getValidationRules({
                    documentFields: documentFields!,
                    fieldName: FieldsDocumentIdentity.MainFields.MIDDLE_NAME
                  })}
                  isRequired={isRequired(FieldsDocumentIdentity.MainFields.MIDDLE_NAME)}
                >
                  <Input placeholder="Отчество" disabled={isDisabled(middleNameFieldName)} />
                </FormItem>
              )}
              <Row justify="space-between" align="middle">
                {isShowFormItem(FieldsDocumentIdentity.MainFields.BIRTH_DATE) && (
                  <Col span={10}>
                    <FormItem
                      name={birthDateFieldName}
                      rules={getValidationRules({
                        documentFields: documentFields!,
                        fieldName: FieldsDocumentIdentity.MainFields.BIRTH_DATE,
                        isSkipDataTypeValidation: true
                      })}
                      isRequired={isRequired(FieldsDocumentIdentity.MainFields.BIRTH_DATE)}
                    >
                      <DatePickerStyled
                        id="birthDate"
                        placeholder="Дата рождения"
                        disabledDate={disabledBirthDate}
                        disabled={isDisabled(birthDateFieldName)}
                      />
                    </FormItem>
                  </Col>
                )}
                {isShowFormItem(FieldsDocumentIdentity.MainFields.SEX) && (
                  <Col span={13}>
                    <Row justify="start" align="bottom">
                      {Boolean(isRequired(FieldsDocumentIdentity.MainFields.SEX)) && (
                        <RequiredLabel>*</RequiredLabel>
                      )}
                      <Title>Пол</Title>
                    </Row>
                    <Row justify="start">
                      <FormItem
                        name={sexFieldName}
                        rules={getValidationRules({
                          documentFields: documentFields!,
                          fieldName: FieldsDocumentIdentity.MainFields.SEX
                        })}
                      >
                        <RadioGroup
                          style={{ textAlign: 'left' }}
                          disabled={isDisabled(sexFieldName)}
                        >
                          <Radio value={'0'}>Мужской</Radio>
                          <Radio value={'1'}>Женский</Radio>
                        </RadioGroup>
                      </FormItem>
                    </Row>
                  </Col>
                )}
              </Row>
              {isShowFormItem(FieldsDocumentIdentity.MainFields.BIRTH_PLACE) && (
                <FormItem
                  name={birthPlaceFieldName}
                  rules={getValidationRules({
                    documentFields: documentFields!,
                    fieldName: FieldsDocumentIdentity.MainFields.BIRTH_PLACE
                  })}
                  isRequired={isRequired(FieldsDocumentIdentity.MainFields.BIRTH_PLACE)}
                >
                  <Input placeholder="Место рождения" disabled={isDisabled(birthPlaceFieldName)} />
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              {isShowFormItem(FieldsDocumentIdentity.MainFields.CITIZENSHIP) && (
                <FormItem
                  name={citizenshipFieldName}
                  rules={getValidationRules({
                    documentFields: documentFields!,
                    fieldName: FieldsDocumentIdentity.MainFields.CITIZENSHIP,
                    additionalRule: !isRussianPassport ? ruleValidationCitizenship : undefined
                  })}
                  isRequired={isRequired(FieldsDocumentIdentity.MainFields.CITIZENSHIP)}
                >
                  <AutoComplete
                    options={optionsCountries}
                    disabled={isRussianPassport || isDisabled(citizenshipFieldName)}
                    onSearch={onSearchCitizenship}
                    onChange={onChangeCitizenship}
                  >
                    <Input size="large" placeholder="Гражданство" />
                  </AutoComplete>
                </FormItem>
              )}
              <FormItem name={citizenshipIdFieldName} hidden>
                <Input />
              </FormItem>
              <Row justify="space-between" gutter={8}>
                {isShowFormItem(FieldsDocumentIdentity.MainFields.DOCUMENT_SERIES) && (
                  <Col flex="1">
                    <FormItem
                      name={documentSeriesFieldName}
                      rules={getValidationRules({
                        documentFields: documentFields!,
                        fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_SERIES
                      })}
                      isRequired={isRequired(FieldsDocumentIdentity.MainFields.DOCUMENT_SERIES)}
                    >
                      <Input
                        placeholder="Серия документа"
                        disabled={isDisabled(documentSeriesFieldName)}
                      />
                    </FormItem>
                  </Col>
                )}
                {isShowFormItem(FieldsDocumentIdentity.MainFields.DOCUMENT_NUMBER) && (
                  <Col flex="1">
                    <FormItem
                      name={documentNumberFieldName}
                      rules={getValidationRules({
                        documentFields: documentFields!,
                        fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_NUMBER
                      })}
                      isRequired={isRequired(FieldsDocumentIdentity.MainFields.DOCUMENT_NUMBER)}
                    >
                      <Input
                        placeholder="Номер документа"
                        disabled={isDisabled(documentNumberFieldName)}
                      />
                    </FormItem>
                  </Col>
                )}
              </Row>
              <Row justify="space-between" gutter={8}>
                {isShowFormItem(FieldsDocumentIdentity.MainFields.DOCUMENT_DATE) && (
                  <Col flex="1">
                    <FormItem
                      name={documentDateFieldName}
                      dependencies={[birthDateFieldName]}
                      rules={getValidationRules({
                        documentFields: documentFields!,
                        fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_DATE,
                        isSkipDataTypeValidation: true,
                        additionalRule: ruleValidationDocumentDate
                      })}
                      isRequired={isRequired(FieldsDocumentIdentity.MainFields.DOCUMENT_DATE)}
                    >
                      <DatePickerStyled
                        id="docDate"
                        placeholder="Дата выдачи"
                        disabled={isDisabled(documentDateFieldName)}
                        disabledDate={disabledDocumentDate}
                      />
                    </FormItem>
                  </Col>
                )}
                {isShowFormItem(FieldsDocumentIdentity.MainFields.DOCUMENT_CODE) && (
                  <Col flex="1">
                    <FormItem
                      name={documentCodeFieldName}
                      rules={getValidationRules({
                        documentFields: documentFields!,
                        fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_CODE
                      })}
                      isRequired={isRequired(FieldsDocumentIdentity.MainFields.DOCUMENT_CODE)}
                    >
                      <ReactInputMask
                        mask="999-999"
                        onBlur={onSearchUfmsDivisions}
                        disabled={isDisabledDocumentCode}
                      >
                        {(inputProps: InputProps) => (
                          <Input
                            {...inputProps}
                            placeholder="Код подразделения"
                            disabled={isDisabledDocumentCode}
                          />
                        )}
                      </ReactInputMask>
                    </FormItem>
                  </Col>
                )}
              </Row>
              {Boolean(ufmsDivisions && isShowUfmsDivisions) && (
                <Row style={{ marginBottom: 10 }} className="mb-4">
                  <Col style={{ marginBottom: 10, color: '#aeafb1' }} span={24}>
                    Выбери подразделение, выдавшее документ:
                  </Col>
                  {ufmsDivisions!.map(({ name: divisionName }) => (
                    <Col span={24} key={divisionName}>
                      <CardUFMS data-division-name={divisionName} onClick={onClickDivison}>
                        {divisionName}
                      </CardUFMS>
                    </Col>
                  ))}
                </Row>
              )}
              {isShowFormItem(FieldsDocumentIdentity.MainFields.DOCUMENT_ADDRESS) && (
                <FormItem
                  name={documentAddressFieldName}
                  rules={getValidationRules({
                    documentFields: documentFields!,
                    fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_ADDRESS
                  })}
                  isRequired={isRequired(FieldsDocumentIdentity.MainFields.DOCUMENT_ADDRESS)}
                >
                  <TextArea
                    rows={4}
                    placeholder="Кем выдан"
                    disabled={isDisabled(documentAddressFieldName)}
                  />
                </FormItem>
              )}
              {isShowFormItem(FieldsDocumentIdentity.MainFields.REGISTRATION_ADDRESS) && (
                <FormItem
                  name={registrationAddressFieldName}
                  rules={getValidationRules({
                    documentFields: documentFields!,
                    fieldName: FieldsDocumentIdentity.MainFields.REGISTRATION_ADDRESS,
                    additionalRule: ruleValidationAddress
                  })}
                  isRequired={isRequired(FieldsDocumentIdentity.MainFields.REGISTRATION_ADDRESS)}
                >
                  <AutoComplete
                    disabled={isDisabled(registrationAddressFieldName)}
                    options={optionsRegistrationAddress}
                    onSearch={onSearchRegistrationAddress}
                    onChange={onChangeSearchRegistrationAddress}
                    notFoundContent={isLoadingAdresses ? <Loader /> : null}
                  >
                    <TextArea rows={3} placeholder="Адрес регистрации" />
                  </AutoComplete>
                </FormItem>
              )}
              {isShowRegistrationAddressButton && (
                <RegistrationAddressButtonWrapper>
                  <Button type="text" onClick={showRegistrationAddresModal}>
                    Ввести адрес без проверки в справочнике
                  </Button>
                </RegistrationAddressButtonWrapper>
              )}
              {isShowRegistrationAddressModal && (
                <RegistrationAddressModal
                  handleSubmit={submitRegistartionAddressForm}
                  handleClose={closeRegistartionAddressModal}
                />
              )}
            </Col>
            <Col span={8}>
              <FormItem name={contactNumberFieldName}>
                <PhoneMask disabled={isDisabled(contactNumberFieldName)}>
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      placeholder="Контактный номер"
                      disabled={isDisabled(contactNumberFieldName)}
                    />
                  )}
                </PhoneMask>
              </FormItem>
              <FormItem
                name={emailFieldName}
                rules={[{ pattern: EMAIL_REGEXP, message: ValidationMessage.PATTERN }]}
              >
                <Input type="email" placeholder="Email" disabled={isDisabled(emailFieldName)} />
              </FormItem>
            </Col>
          </Row>
        )}
        <Row align="middle" justify="space-between">
          <Button
            style={{ visibility: handleGoBack ? 'inherit' : 'hidden' }}
            loading={isLoadingGoBack}
            disabled={isDisabledGoBack}
            onClick={handleGoBack}
          >
            {textGoBack}
          </Button>
          <Button
            type="primary"
            loading={isLoadingSubmit}
            disabled={isDisabledSubmit}
            onClick={onClickSubmit}
          >
            {textSubmit}
          </Button>
        </Row>
      </div>
    </FormStepWrapper>
  );
};

export default MainFormDocumentIdentity;
