import React, { useEffect, useState, Fragment, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Form } from 'antd'

import { Title, Loader } from 'webseller/components'
import { SCROLL_CSS, T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import {
  FIRST_STEP_FIELDS,
  FORM_FIELDS,
  FORM_IDS,
  RUSSIAN_FEDERATION,
  RUSSIAN_PASSPORT_ID
} from 'webseller/constants/form'
import MigrationContactForm from 'webseller/features/saleSim/components/DocumentStep/components/MigrationContactForm'
import DocumentDataForm from 'webseller/features/saleSim/components/DocumentForm/DocumentDataForm'
import {
  // searchCountries as searchCountriesAction,
  clearCodeUFMS as clearCodeUFMSAction,
  searchAddresses as searchAddressesAction,
  searchCodeUFMS as searchCodeUFMSAction,
  setRegistrationAddressManually as setRegistrationAddressManuallyAction,
  setRegistrationAddressData as setRegistrationAddressDataAction
} from 'reducers/saleSim/saleSimReducer'
import {
  getApprovedStayingDocumentField,
  getApprovedStayingDocuments,
  getDocumentIdentityCountries,
  getDocumentIdentityFields,
  getDocumentIdentityFieldsClear,
  getDocumentIdentityTypes,
  getValidityIdentityDocumentPeriod,
  getValidityStayingDocumentPeriod
} from 'reducers/documentIdentity/documentIdentityReducer'

// TODO refactor
export default function PersonalDataForm ({
  parentForm,
  formName = 'personalData',
  initialPersonalData: documentData,
  isPrefill = false,
  handleSubmit: toNextStep,
  goBack: toPrevStep,
  isSkipMigrationCardStep
}) {
  // const countries = useSelector(state => state.saleSim.countries)
  const foundAddresses = useSelector(state => state.saleSim.foundAddresses)
  const isSearchAddressLoading = useSelector(state => state.saleSim.isSearchAddressLoading)
  const isSearchAddressError = useSelector(state => state.saleSim.isSearchAddressError)
  const isManualAddressSearch = useSelector(state => state.saleSim.isManualAddressSearch)
  const registrationAddressData = useSelector(state => state.saleSim.registrationAddressData)

  const docIdentityTypes = useSelector(state => state.documentIdentity.documentIdentityTypes)
  const isDocTypesLoading = useSelector(state => state.documentIdentity.isDocumentIdentityTypesLoading)
  // const isDocTypesError = useSelector(state => state.documentIdentity.isDocumentIdentityTypesError)

  const docIdentityFields = useSelector(state => state.documentIdentity.documentIdentityFields?.fields)
  const isDocIdentityFieldsLoading = useSelector(state => state.documentIdentity.isDocumentIdentityFieldsLoading)
  const isDocIdentityFieldsError = useSelector(state => state.documentIdentity.isDocumentIdentityFieldsError)

  const docIdentityCountries = useSelector(state => state.documentIdentity.documentIdentityCountries)
  const isDocIdentityCountriesLoading = useSelector(state => state.documentIdentity.isDocumentIdentityCountriesLoading)
  // const isDocIdentityCountriesError = useSelector(state => state.documentIdentity.isDocumentIdentityCountriesError)

  const approvedStayingDocs = useSelector(
    state => state.documentIdentity.approvedStayingDocuments?.approvedResidenceDocuments
  )
  const isApprovedStayingDocsLoading = useSelector(state => state.documentIdentity.isApprovedStayingDocumentsLoading)
  // const isApprovedStayingDocsError = useSelector(state => state.documentIdentity.isApprovedStayingDocumentsError)

  const approvedStayingDocsFields = useSelector(state => state.documentIdentity.approvedStayingDocumentField?.fields)
  const isApprovedStayingDocsFieldLoading = useSelector(
    state => state.documentIdentity.isApprovedStayingDocumentsLoading
  )
  // const isApprovedStayingDocsFieldError = useSelector(
  //   state => state.documentIdentity.isApprovedStayingDocumentFieldError
  // )

  const codeUFMS = useSelector(state => state.saleSim.codeUFMS)
  // const isSearchCodeUFMSLoading = useSelector(state => state.saleSim.isSearchCodeUFMSLoading)
  // const isSearchCodeUFMSError = useSelector(state => state.saleSim.isSearchCodeUFMSError)

  const isValidPeriod = useSelector(state => state.documentIdentity.isValidIdentityDocumentPeriod)
  const isValidPeriodLoading = useSelector(state => state.documentIdentity.isValidIdentityDocumentPeriodLoading)
  // const isValidPeriodError = useSelector(state => state.documentIdentity.isValidIdentityDocumentPeriodError)

  const isValidStayingDoc = useSelector(state => state.documentIdentity.isValidStayingDocumentPeriod)
  const isValidStayingDocLoading = useSelector(state => state.documentIdentity.isValidStayingDocumentPeriodLoading)

  const dispatch = useDispatch()

  const searchCodeUFMS = payload => dispatch(searchCodeUFMSAction(payload))
  const clearCodeUFMS = () => dispatch(clearCodeUFMSAction())
  // const searchCountries = payload => dispatch(searchCountriesAction(payload))
  const searchAddresses = payload => dispatch(searchAddressesAction(payload))
  const setRegistrationAddressManually = payload => dispatch(setRegistrationAddressManuallyAction(payload))
  const setRegistrationAddressData = payload => dispatch(setRegistrationAddressDataAction(payload))
  const getApprovedStayingDocsField = payload => dispatch(getApprovedStayingDocumentField(payload))
  const getDocIdentityCountries = payload => dispatch(getDocumentIdentityCountries(payload))
  const getDocsIdentityFieldsClear = payload => dispatch(getDocumentIdentityFieldsClear(payload))
  const getApprovedStayingDocs = payload => dispatch(getApprovedStayingDocuments(payload))
  const getDocIdentityFields = payload => dispatch(getDocumentIdentityFields(payload))
  const getDocIdentityTypes = payload => dispatch(getDocumentIdentityTypes(payload))
  const getValidityPeriod = payload => dispatch(getValidityIdentityDocumentPeriod(payload))
  const getValidityStayingDoc = payload => dispatch(getValidityStayingDocumentPeriod(payload))

  const [form] = Form.useForm()
  const [formScreenId, setFormScreenId] = useState(FORM_IDS.DOCUMENT_DATA_FORM)

  const isDocumentDataForm = formScreenId === FORM_IDS.DOCUMENT_DATA_FORM
  const isMigrationContactForm = formScreenId === FORM_IDS.MIGRATION_CONTACT_FORM
  const docTypeId = documentData?.[FORM_FIELDS.DOCUMENT_TYPE] || RUSSIAN_PASSPORT_ID

  useEffect(() => {
    getDocIdentityFields({ id: docTypeId })
    getDocIdentityTypes()
  }, [])

  useLayoutEffect(() => {
    if (docIdentityFields && isPrefill) {
      form.validateFields()
    }
  }, [docIdentityFields])

  const onNextFormStep = async () => {
    const formValues = form.getFieldsValue()
    await form.validateFields([...Object.values(FIRST_STEP_FIELDS)])

    getApprovedStayingDocs({
      identityDocumentId: formValues[FORM_FIELDS.DOCUMENT_TYPE],
      countryId:
        formValues[FORM_FIELDS.CITIZENSHIP] === RUSSIAN_FEDERATION
          ? RUSSIAN_PASSPORT_ID
          : formValues[FORM_FIELDS.CITIZENSHIP_ID],
      onSubmitForm: form.submit,
      onChangeFormStepId: () => setFormScreenId(FORM_IDS.MIGRATION_CONTACT_FORM)
    })
  }

  const onPrevFormStep = () => {
    setFormScreenId(FORM_IDS.DOCUMENT_DATA_FORM)
  }

  return (
    <Container>
      <Main>
        <FormWrapper parentForm={parentForm} initialValues={documentData || undefined} form={form} onFinish={toNextStep}>
          {isDocIdentityFieldsLoading && (
            <Loader title='Загрузка формы ввода персональных данных' />
          )}
          {!isDocIdentityFieldsLoading && isDocIdentityFieldsError && (
            <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
              Произошла ошибка. Попробуйте обновить страницу браузера или повторить попытку через несколько минут.
            </Title>
          )}
          {!isDocIdentityFieldsLoading && !isDocIdentityFieldsError && (
            <Fragment>
              <DocumentDataForm
                isPrefill={isPrefill}
                form={parentForm || form}
                isHidden={!isDocumentDataForm}
                parentFormName={parentForm ? formName : undefined}
                onNextFormStep={isSkipMigrationCardStep ? form.submit : !parentForm ? onNextFormStep : undefined}
                toPrevStep={!parentForm ? toPrevStep : undefined}
                getDocIdentityCountries={getDocIdentityCountries}
                docIdentityCountries={docIdentityCountries}
                isDocIdentityCountriesLoading={isDocIdentityCountriesLoading}
                getDocsIdentityFieldsClear={getDocsIdentityFieldsClear}
                getDocIdentityFields={getDocIdentityFields}
                docIdentityFields={docIdentityFields}
                docIdentityTypes={docIdentityTypes}
                searchAddresses={searchAddresses}
                foundAddresses={foundAddresses}
                isSearchAddressLoading={isSearchAddressLoading}
                isSearchAddressError={isSearchAddressError}
                isManualAddressSearch={isManualAddressSearch}
                setRegistrationAddressManually={setRegistrationAddressManually}
                setRegistrationAddressData={setRegistrationAddressData}
                registrationAddressData={registrationAddressData}
                isValidPeriod={isValidPeriod}
                getValidityPeriod={getValidityPeriod}
                isValidPeriodLoading={isValidPeriodLoading}
                isApprovedStayingDocsLoading={isApprovedStayingDocsLoading}
                isDocTypesLoading={isDocTypesLoading}
                searchCodeUFMS={searchCodeUFMS}
                codeUFMS={codeUFMS}
                clearCodeUFMS={clearCodeUFMS}
              />
              {!parentForm && (
                <MigrationContactForm
                  form={form}
                  isHidden={!isMigrationContactForm}
                  isApprovedStayingDocsFieldLoading={isApprovedStayingDocsFieldLoading}
                  getApprovedStayingDocsField={getApprovedStayingDocsField}
                  approvedStayingDocsFields={approvedStayingDocsFields}
                  approvedStayingDocs={approvedStayingDocs}
                  isValidStayingDoc={isValidStayingDoc}
                  isValidStayingDocLoading={isValidStayingDocLoading}
                  getValidityStayingDoc={getValidityStayingDoc}
                  toPrevStep={onPrevFormStep}
                />
              )}
            </Fragment>
          )}
        </FormWrapper>
      </Main>
    </Container>
  )
}

const FormWrapper = ({ parentForm, children, ...formProps }) => {
  return parentForm ? (
    <Fragment>{children}</Fragment>
  ) : (
    <FormStyled {...formProps}>
      {children}
    </FormStyled>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  text-align: center;
`

const Main = styled.div`
  margin: 24px 0 0;
  flex: 1;
  display: flex;

  ${SCROLL_CSS}
`

const FormStyled = styled(Form)`
  flex: 1;
`
