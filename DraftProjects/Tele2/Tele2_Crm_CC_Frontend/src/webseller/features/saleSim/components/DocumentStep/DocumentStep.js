import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Alert } from 'antd'
import { Button, Title } from 'webseller/components'
import { SCROLL_CSS, T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { IconAppSeller } from 'webseller/icons'
import {
  FIRST_STEP_FIELDS,
  FORM_FIELDS,
  FORM_IDS,
  RUSSIAN_FEDERATION,
  RUSSIAN_PASSPORT_ID
} from 'webseller/constants/form'
import MigrationContactForm from './components/MigrationContactForm'
import DocumentDataForm from '../DocumentForm/DocumentDataForm'
import LoadingSpinner from 'components/LoadingSpinner'
import { StatusGetExistingPersonalData } from '../../helpers'
import { checkRightWithOperations } from 'webseller/helpers'

export default function DocumentStep (props) {
  const {
    permissions,
    isDocIdentityFieldsError,
    isDocIdentityFieldsLoading,
    sallingProcessType,
    documentData,
    statusGetExistingPersonalData,
    existingPersonalData,
    setDocumentData,
    getApprovedStayingDocs,
    getDocIdentityTypes,
    getDocIdentityFields,
    getExistingPersonalData,
    toNextStep,
    toPrevStep
  } = props

  const [form] = Form.useForm()
  const [formScreenId, setFormScreenId] = useState(FORM_IDS.DOCUMENT_DATA_FORM)
  const [isShowExistingPersonalDataNotification, setIsShowExistingPersonalDataNotification] = useState(true)

  const isDocumentDataForm = formScreenId === FORM_IDS.DOCUMENT_DATA_FORM
  const isMigrationContactForm = formScreenId === FORM_IDS.MIGRATION_CONTACT_FORM
  const docTypeId = documentData?.[FORM_FIELDS.DOCUMENT_TYPE] || RUSSIAN_PASSPORT_ID

  const isAllowToGetExistingPersonalData = checkRightWithOperations({
    permissions,
    permissionName: 'AS.SimWebSell',
    operationName: 'R'
  })

  useEffect(() => {
    getDocIdentityFields({ id: docTypeId })
    getDocIdentityTypes()
    if (isAllowToGetExistingPersonalData) {
      getExistingPersonalData()
    }
  }, [])

  const fillFormByExistingPersonalData = () => {
    form.setFieldsValue(existingPersonalData)
    setIsShowExistingPersonalDataNotification(false)
  }

  const onSubmitForm = async values => {
    await form.validateFields()

    setDocumentData(values)
    toNextStep()
  }

  const onNextFormStep = async () => {
    const formValues = form.getFieldsValue()
    await form.validateFields([...Object.values(FIRST_STEP_FIELDS)])

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
      <Main>
        <FormStyled initialValues={documentData || undefined} form={form} onFinish={onSubmitForm}>
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
            <>
              <DocumentDataForm
                form={form}
                isHidden={!isDocumentDataForm}
                onNextFormStep={onNextFormStep}
                {...props}
                toPrevStep={() => toPrevStep(sallingProcessType)}
                info={
                  isShowExistingPersonalDataNotification && isAllowToGetExistingPersonalData ? (
                    <ExistingPersonalDataNotification
                      status={statusGetExistingPersonalData}
                      onClickSuccessStatus={fillFormByExistingPersonalData}
                    />
                  ) : null
                }
              />
              <MigrationContactForm
                form={form}
                isHidden={!isMigrationContactForm}
                {...props}
                toPrevStep={onPrevFormStep}
              />
            </>
          )}
        </FormStyled>
      </Main>
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

const AlertStyled = styled(Alert)`
  text-align: left;
`

DocumentStep.propTypes = {
  checkSimSaleAvailability: PropTypes.func,
  checkSimSaleAvailabilityError: PropTypes.func,
  isCheckSimSaleAvailabilityLoading: PropTypes.bool,
  getApprovedStayingDocs: PropTypes.func,
  approvedStayingDocs: PropTypes.array,
  getDocIdentityTypes: PropTypes.func,
  checkPresencePep: PropTypes.func,
  setDocumentData: PropTypes.func,
  toPrevStep: PropTypes.func,
  onClose: PropTypes.func,
  documentData: PropTypes.any,
  getDocIdentityFields: PropTypes.func,
  isDocIdentityFieldsError: PropTypes.bool
}

function ExistingPersonalDataNotification ({ status, onClickSuccessStatus }) {
  switch (status) {
    case StatusGetExistingPersonalData.SUCCESS: {
      return (
        <AlertStyled
          showIcon
          icon={<IconAppSeller />}
          type='success'
          message='Получены данные документа из AppSeller'
          action={
            <Button type='primary' onClick={onClickSuccessStatus}>
              Применить
            </Button>
          }
        />
      )
    }

    case StatusGetExistingPersonalData.ERROR: {
      return (
        <AlertStyled
          showIcon
          icon={<IconAppSeller />}
          type='error'
          message='Не удалось получить данные документа из AppSeller. Заполни паспортные данные вручную'
        />
      )
    }

    case StatusGetExistingPersonalData.NONE:
    default: {
      return (
        <AlertStyled
          showIcon
          icon={<IconAppSeller />}
          type='info'
          message='Заполни паспортные данные вручную или воспользуйся мобильным приложением AppSeller для распознавания данных документа'
        />
      )
    }
  }
}
