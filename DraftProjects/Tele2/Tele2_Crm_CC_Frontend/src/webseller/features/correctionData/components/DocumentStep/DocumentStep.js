import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { Title } from 'webseller/components'
import { SCROLL_CSS, T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import LoadingSpinner from 'components/LoadingSpinner'
import {
  RUSSIAN_PASSPORT_ID,
  RUSSIAN_FEDERATION,
  FIRST_STEP_FIELDS,
  FORM_FIELDS,
  FORM_IDS
} from 'webseller/constants/form'
import DocumentDataForm from 'webseller/features/saleSim/components/DocumentForm/DocumentDataForm'
import MigrationContactForm from 'webseller/features/saleSim/components/DocumentStep/components/MigrationContactForm'
import { getTypeCard } from 'webseller/helpers'

function DocumentStep (props) {
  const {
    getDocIdentityTypes,
    getDocIdentityFields,
    getApprovedStayingDocs,
    isDocIdentityFieldsError,
    isDocIdentityFieldsLoading,
    documentData,
    setDocumentData,
    user,
    toNextStep
  } = props

  const [form] = Form.useForm()
  const [formScreenId, setFormScreenId] = useState(FORM_IDS.DOCUMENT_DATA_FORM)
  const { isASSeller } = user
  const { isAnonymousCard } = getTypeCard(isASSeller)

  const isDocumentDataForm = formScreenId === FORM_IDS.DOCUMENT_DATA_FORM
  const isMigrationContactForm = formScreenId === FORM_IDS.MIGRATION_CONTACT_FORM
  const docTypeId = documentData?.[FORM_FIELDS.DOCUMENT_TYPE] || RUSSIAN_PASSPORT_ID

  useEffect(() => {
    getDocIdentityFields({ id: docTypeId })
    getDocIdentityTypes()
  }, [])

  const onSubmitForm = async values => {
    await form.validateFields()

    setDocumentData(values)
    toNextStep()
  }

  const onNextFormStep = async () => {
    await form.validateFields([...Object.values(FIRST_STEP_FIELDS)])
    const formValues = form.getFieldsValue()

    getApprovedStayingDocs({
      identityDocumentId: formValues[FORM_FIELDS.DOCUMENT_TYPE],
      countryId:
        formValues[FORM_FIELDS.CITIZENSHIP] === RUSSIAN_FEDERATION
          ? RUSSIAN_PASSPORT_ID
          : formValues[FORM_FIELDS.CITIZENSHIP_ID],
      onSubmitForm: () => onSubmitForm(formValues),
      onChangeFormStepId: () => setFormScreenId(FORM_IDS.MIGRATION_CONTACT_FORM)
    })
  }

  const onPrevFormStep = () => {
    setFormScreenId(FORM_IDS.DOCUMENT_DATA_FORM)
  }

  return (
    <Container>
      {isDocIdentityFieldsLoading && (
        <LoaderWrapper>
          <LoadingSpinner />
        </LoaderWrapper>
      )}
      {!isDocIdentityFieldsLoading && isDocIdentityFieldsError && (
        <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
          Произошла ошибка. Попробуйте обновить страницу браузера или повторить попытку через несколько минут.
        </Title>
      )}
      {!isDocIdentityFieldsLoading && !isDocIdentityFieldsError && (
        <Main>
          <FormStyled initialValues={!isAnonymousCard ? documentData : undefined} form={form} onFinish={onSubmitForm}>
            <DocumentDataForm form={form} isHidden={!isDocumentDataForm} onNextFormStep={onNextFormStep} {...props} />
            <MigrationContactForm
              form={form}
              isHidden={!isMigrationContactForm}
              {...props}
              toPrevStep={onPrevFormStep}
            />
          </FormStyled>
        </Main>
      )}
    </Container>
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

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormStyled = styled(Form)`
  flex: 1;
`

DocumentStep.propTypes = {
  foundAddresses: PropTypes.array,
  branchId: PropTypes.number,
  clientId: PropTypes.number,
  Msisdn: PropTypes.string,
  setPersonalData: PropTypes.func,
  getDocIdentityTypes: PropTypes.func,
  getDocIdentityFields: PropTypes.func,
  isDocIdentityFieldsError: PropTypes.bool,
  isDocIdentityFieldsLoading: PropTypes.bool,
  minimalInfo: PropTypes.object,
  toNextStep: PropTypes.func,
  setDocumentData: PropTypes.func,
  documentData: PropTypes.object,
  user: PropTypes.object
}

export default DocumentStep
