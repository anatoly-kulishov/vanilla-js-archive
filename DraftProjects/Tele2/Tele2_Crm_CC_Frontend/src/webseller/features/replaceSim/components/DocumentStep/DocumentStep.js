import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form } from 'antd'

import { SCROLL_CSS, T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { FORM_FIELDS, RUSSIAN_PASSPORT_ID } from 'webseller/constants/form'
import { Loader, Title } from 'webseller/components'

import DocumentDataForm from '../DocumentDataForm'

// TODO тех долг (перевести на PersonalDataForm)
export default function TEMPORARY_WRAPPER (props) {
  const { isLoadingInitialDocumentData } = props

  if (isLoadingInitialDocumentData) {
    return <Loader title='Загрузка персональных данных клиента' />
  }

  return <DocumentStep {...props} />
}

function DocumentStep (props) {
  const {
    toNextStep,
    toPrevStep,
    documentData,
    getDocIdentityTypes,
    getDocIdentityFields,
    isDocIdentityFieldsError,
    isDocIdentityFieldsLoading,
    isLoadingInitialDocumentData,
    setDocumentData
  } = props

  const [form] = Form.useForm()
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

  return (
    <Container>
      <Main>
        <FormStyled initialValues={documentData || undefined} form={form} onFinish={onSubmitForm}>
          {isDocIdentityFieldsLoading && <Loader title='Загрузка формы ввода персональных данных' />}
          {!isDocIdentityFieldsLoading && !isLoadingInitialDocumentData && isDocIdentityFieldsError && (
            <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
              Произошла ошибка. Попробуйте обновить страницу браузера или повторить попытку через несколько минут.
            </Title>
          )}
          {!isDocIdentityFieldsLoading && !isDocIdentityFieldsLoading && !isDocIdentityFieldsError && (
            <DocumentDataForm isUseValidation={false} form={form} {...props} toPrevStep={toPrevStep} />
          )}
        </FormStyled>
      </Main>
    </Container>
  )
}

DocumentStep.propTypes = {
  getDocIdentityTypes: PropTypes.func,
  setDocumentData: PropTypes.func,
  toPrevStep: PropTypes.func,
  toNextStep: PropTypes.func,
  documentData: PropTypes.object,
  getDocIdentityFields: PropTypes.func,
  isDocIdentityFieldsError: PropTypes.bool,
  isDocIdentityFieldsLoading: PropTypes.bool,
  isLoadingInitialDocumentData: PropTypes.bool
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
