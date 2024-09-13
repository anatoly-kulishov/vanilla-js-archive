import React, { useState, useLayoutEffect } from 'react'
import { Form, Row, Col, Divider } from 'antd'
import * as WebSellerKit from 'webseller/components'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  FORM_FIELDS,
  RUSSIAN_FEDERATION,
  RUSSIAN_FEDERATION_PASSPORT,
  RUSSIAN_PASSPORT_ID
} from 'webseller/constants/form'
import { getDocumentValidationRules } from 'webseller/helpers/form'

const { Input, Button, Select, Radio } = WebSellerKit

const SIGNATORY_OPTIONS = {
  ABONENT: 'Абонент',
  TRUSTED_PERSON: 'Доверенное лицо'
}

export default function DocumentDataForm (props) {
  const {
    isUseValidation,
    form,
    isHidden,
    toPrevStep,
    getDocsIdentityFieldsClear,
    getDocIdentityFields,
    docIdentityFields,
    docIdentityTypes,
    isApprovedStayingDocsLoading,
    isDocTypesLoading,
    documentData
  } = props

  const [documentType, setDocumentType] = useState(
    () => form.getFieldValue(FORM_FIELDS.DOCUMENT_TYPE) || RUSSIAN_PASSPORT_ID
  ) // Паспорт РФ по умолчанию
  const isRussianPassport = documentType === RUSSIAN_PASSPORT_ID

  const identityDocsTypes = docIdentityTypes?.identityDocumentTypes

  useLayoutEffect(() => {
    form.setFieldsValue({
      [FORM_FIELDS.CITIZENSHIP]: isRussianPassport ? RUSSIAN_FEDERATION : undefined,
      [FORM_FIELDS.DOCUMENT_NAME]: form.getFieldValue(FORM_FIELDS.DOCUMENT_NAME) || RUSSIAN_FEDERATION_PASSPORT,
      [FORM_FIELDS.DOCUMENT_TYPE]: documentType
    })
    getDocsIdentityFieldsClear()
  }, [documentType])

  const onChangeDocumentType = (documentTypeId, { label }) => {
    setDocumentType(documentTypeId)
    form.setFieldsValue({
      [FORM_FIELDS.DOCUMENT_TYPE]: documentTypeId,
      [FORM_FIELDS.DOCUMENT_NAME]: label
    })
    getDocIdentityFields({ id: documentTypeId })
  }

  const isShowFormItem = fieldName => {
    return docIdentityFields?.some(field => field.nameEn === fieldName) || false
  }

  const getValidationRules = fieldName => {
    if (isUseValidation) {
      return getDocumentValidationRules(docIdentityFields, fieldName)
    }
  }

  return (
    <>
      <Row justify='center'>
        <Col>
          <FormItem name={FORM_FIELDS.SIGNATORY} label='Подписывающее лицо:' marginBottom={0}>
            <Radio.Group defaultValue={SIGNATORY_OPTIONS.ABONENT}>
              <Radio value={SIGNATORY_OPTIONS.ABONENT}>{SIGNATORY_OPTIONS.ABONENT}</Radio>
              <Radio value={SIGNATORY_OPTIONS.TRUSTED_PERSON} disabled>
                {SIGNATORY_OPTIONS.TRUSTED_PERSON}
              </Radio>
            </Radio.Group>
          </FormItem>
        </Col>
      </Row>
      <Divider />
      <Wrapper isHidden={isHidden}>
        <Row>
          <Col span={8} />
          <Col span={8}>
            <FormItem marginBottom={15}>
              <Select
                disabled={documentData?.[FORM_FIELDS.DOCUMENT_TYPE]}
                placeholder='Выберите тип документа'
                loading={isDocTypesLoading}
                size='large'
                value={documentType}
                options={identityDocsTypes?.map(({ name, id }) => ({
                  value: id,
                  label: name
                }))}
                onSelect={onChangeDocumentType}
              />
            </FormItem>
            <FormItem style={{ display: 'none' }} name={FORM_FIELDS.DOCUMENT_TYPE}>
              <Input />
            </FormItem>
            <FormItem style={{ display: 'none' }} name={FORM_FIELDS.DOCUMENT_NAME}>
              <Input />
            </FormItem>
          </Col>
          <Col span={8} />
        </Row>
        <FormStyled>
          <Row gutter={16}>
            <Col span={8}>
              {isShowFormItem(FORM_FIELDS.LAST_NAME) && (
                <FormItem name={FORM_FIELDS.LAST_NAME} rules={getValidationRules(FORM_FIELDS.LAST_NAME)}>
                  <Input placeholder='Фамилия' disabled={documentData?.[FORM_FIELDS.LAST_NAME]} />
                </FormItem>
              )}
              {isShowFormItem(FORM_FIELDS.DOCUMENT_SERIES) && (
                <FormItem name={FORM_FIELDS.DOCUMENT_SERIES} rules={getValidationRules(FORM_FIELDS.DOCUMENT_SERIES)}>
                  <Input disabled={documentData?.[FORM_FIELDS.DOCUMENT_SERIES]} placeholder='Серия документа' />
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              {isShowFormItem(FORM_FIELDS.FIRST_NAME) && (
                <FormItem name={FORM_FIELDS.FIRST_NAME} rules={getValidationRules(FORM_FIELDS.FIRST_NAME)}>
                  <Input placeholder='Имя' disabled={documentData?.[FORM_FIELDS.FIRST_NAME]} />
                </FormItem>
              )}
              {isShowFormItem(FORM_FIELDS.DOCUMENT_NUMBER) && (
                <FormItem name={FORM_FIELDS.DOCUMENT_NUMBER} rules={getValidationRules(FORM_FIELDS.DOCUMENT_NUMBER)}>
                  <Input placeholder='Номер документа' disabled={documentData?.[FORM_FIELDS.DOCUMENT_NUMBER]} />
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              {isShowFormItem(FORM_FIELDS.MIDDLE_NAME) && (
                <FormItem name={FORM_FIELDS.MIDDLE_NAME} rules={getValidationRules(FORM_FIELDS.MIDDLE_NAME)}>
                  <Input placeholder='Отчество' disabled={documentData?.[FORM_FIELDS.MIDDLE_NAME]} />
                </FormItem>
              )}
            </Col>
          </Row>
          <Controls>
            {toPrevStep && (
              <Button onClick={toPrevStep} disabled={isApprovedStayingDocsLoading}>
                Назад
              </Button>
            )}
            <Button type='primary' htmlType='submit' loading={isApprovedStayingDocsLoading}>
              Далее
            </Button>
          </Controls>
        </FormStyled>
      </Wrapper>
    </>
  )
}

DocumentDataForm.propTypes = {
  form: PropTypes.object,
  isHidden: PropTypes.bool,
  docIdentityTypes: PropTypes.object,
  getDocIdentityFields: PropTypes.func,
  docIdentityFields: PropTypes.array,
  getDocsIdentityFieldsClear: PropTypes.func,
  isDocTypesLoading: PropTypes.bool,
  toPrevStep: PropTypes.func,
  documentData: PropTypes.object,
  isApprovedStayingDocsLoading: PropTypes.bool
}

const Wrapper = styled.div`
  display: ${props => (props?.isHidden ? 'none' : 'block')};
`
const FormStyled = styled.div`
  & .ant-form-item-explain {
    padding: 4px 4px 0;
    font-size: 12px;
    font-family: T2_Rooftop_Regular, sans-serif;
  }
`
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`
const FormItem = styled(Form.Item)`
  margin-bottom: ${props => (props?.marginBottom !== undefined ? props.marginBottom : '10')}px;
  text-align: ${props => (props?.textAlign ? props.textAlign : 'left')};
`
