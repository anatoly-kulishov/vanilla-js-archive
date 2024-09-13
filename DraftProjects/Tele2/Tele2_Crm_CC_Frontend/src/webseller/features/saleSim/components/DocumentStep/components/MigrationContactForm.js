import React, { useEffect, useMemo, Fragment } from 'react'
import * as WebSellerKit from 'webseller/components'
import styled from 'styled-components'
import { Form, Row, Col, Divider } from 'antd'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import api from 'utils/api'
import { getDocumentValidationRules } from 'webseller/helpers/form'
import { ERROR_MESSAGE, FORM_FIELDS, NOTHING_FOUND_OPTION } from 'webseller/constants/form'
import { DateFormat } from 'webseller/constants'
import { isDisabledDatesAfterToday } from 'webseller/helpers/formatDate'

const { Input, Select, DatePicker, Button, Loader } = WebSellerKit

export default function MigrationContactForm ({
  isApprovedStayingDocsFieldLoading,
  getApprovedStayingDocsField,
  approvedStayingDocsFields,
  approvedStayingDocs,
  toPrevStep,
  isHidden,
  form
}) {
  const optionsDocumentTypes = useMemo(
    () =>
      approvedStayingDocs?.map(doc => ({
        label: doc.name,
        value: doc.name
      })),
    [approvedStayingDocs]
  )

  const onChangeApprovedStayingDocuments = value => {
    getApprovedStayingDocsField({ id: getDocumentId(value) })
  }

  useEffect(() => {
    const currentDocumentName = form.getFieldValue(FORM_FIELDS.APPROVED_STAYING_DOCUMENT)

    if (currentDocumentName) {
      getApprovedStayingDocsField({ id: getDocumentId(currentDocumentName) })
      return
    }

    const [firstDocument] = optionsDocumentTypes || []
    if (firstDocument) {
      const firstDocumentName = firstDocument.value
      const currentFields = form.getFieldsValue()

      form.setFieldsValue({
        ...currentFields,
        [FORM_FIELDS.APPROVED_STAYING_DOCUMENT]: firstDocumentName
      })

      getApprovedStayingDocsField({ id: getDocumentId(firstDocumentName) })
    }
  }, [optionsDocumentTypes])

  const isShowFormItem = fieldName => {
    return approvedStayingDocsFields?.some(field => field.nameEn === fieldName) || false
  }

  const ruleValidationDate = form => ({
    message: ERROR_MESSAGE.INVALID_STAYING_DOCUMENT,
    async validator () {
      const docId = getDocumentId(form.getFieldValue(FORM_FIELDS.APPROVED_STAYING_DOCUMENT))
      const departureDate = form.getFieldValue(FORM_FIELDS.DEPARTURE_DATE)

      if (docId && departureDate) {
        const responseValidation = await api.fetchValidityStayingDocPeriod({
          id: docId,
          documentenddate: moment(departureDate).format(DateFormat.TRANSPORT_DATE),
          currentdate: moment().format(DateFormat.TRANSPORT_DATE)
        })

        const isInvalidDate = responseValidation?.data.isDocumentValid === false
        if (isInvalidDate) {
          return Promise.reject(new Error())
        } else {
          return Promise.resolve()
        }
      } else {
        return Promise.resolve()
      }
    }
  })

  const getDocumentId = docName => approvedStayingDocs?.find(({ name }) => name === docName)?.id

  if (isApprovedStayingDocsFieldLoading) {
    return <Loader title='Загрузка необходимых полей' />
  }

  return (
    <Wrapper isHidden={isHidden}>
      <FormStyled>
        <Fragment>
          <Row>
            <Col span={8} />
            <Col span={8}>
              <FormItem name={FORM_FIELDS.APPROVED_STAYING_DOCUMENT}>
                <Select
                  defaultActiveFirstOption
                  size='large'
                  options={optionsDocumentTypes || NOTHING_FOUND_OPTION}
                  onChange={onChangeApprovedStayingDocuments}
                />
              </FormItem>
            </Col>
            <Col span={8} />
          </Row>
          <Divider />
          {isShowFormItem(FORM_FIELDS.MIGRATION_CARD_NUMBER) && (
            <FormItem
              name={FORM_FIELDS.MIGRATION_CARD_NUMBER}
              rules={getDocumentValidationRules(approvedStayingDocsFields, FORM_FIELDS.MIGRATION_CARD_NUMBER)}
            >
              <Input placeholder='Номер миграционной карты' />
            </FormItem>
          )}
          <Row justify='space-between' gutter={8}>
            {isShowFormItem(FORM_FIELDS.ARRIVING_DATE) && (
              <Col span={12}>
                <FormItem
                  name={FORM_FIELDS.ARRIVING_DATE}
                  rules={getDocumentValidationRules(approvedStayingDocsFields, FORM_FIELDS.ARRIVING_DATE)}
                >
                  <DatePickerStyled placeholder='Дата начала пребывания' disabledDate={isDisabledDatesAfterToday} />
                </FormItem>
              </Col>
            )}
            {isShowFormItem(FORM_FIELDS.DEPARTURE_DATE) && (
              <Col span={12}>
                <FormItem
                  name={FORM_FIELDS.DEPARTURE_DATE}
                  rules={[
                    ...getDocumentValidationRules(approvedStayingDocsFields, FORM_FIELDS.DEPARTURE_DATE),
                    ruleValidationDate
                  ]}
                >
                  <DatePickerStyled placeholder='Дата окончания пребывания' />
                </FormItem>
              </Col>
            )}
          </Row>
        </Fragment>
        <Controls>
          <Button onClick={toPrevStep}>Назад</Button>
          <Button type='primary' htmlType='submit'>
            Далее
          </Button>
        </Controls>
      </FormStyled>
    </Wrapper>
  )
}

MigrationContactForm.propTypes = {
  isApprovedStayingDocsFieldLoading: PropTypes.bool,
  getApprovedStayingDocsField: PropTypes.func,
  approvedStayingDocsFields: PropTypes.array,
  approvedStayingDocs: PropTypes.object,
  toPrevStep: PropTypes.func,
  isHidden: PropTypes.bool,
  form: PropTypes.object
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

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`

const FormItem = styled(Form.Item)`
  margin-bottom: 10px;
`
