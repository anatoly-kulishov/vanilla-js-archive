import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react'
import { isNull } from 'lodash'
import * as WebSellerKit from 'webseller/components'
import styled from 'styled-components'
import { Form, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import { getDocumentValidationRules, onMapApprovedStayingDocs } from 'webseller/helpers/form'
import { ERROR_MESSAGE, FORM_FIELDS, NOTHING_FOUND_OPTION } from 'webseller/constants/form'
import { isDisabledDatesAfterToday } from 'webseller/helpers/formatDate'
import LoadingSpinner from 'components/LoadingSpinner'

const { Title, Input, Select, DatePicker, Button } = WebSellerKit

const dateFormat = 'YYYY-MM-DD'

export default function MigrationContactForm ({
  isApprovedStayingDocsFieldLoading,
  getApprovedStayingDocsField,
  approvedStayingDocsFields,
  approvedStayingDocs,
  isValidStayingDoc,
  isValidStayingDocLoading,
  getValidityStayingDoc,
  toPrevStep,
  isHidden,
  form
}) {
  const [departureDate, setDepartureDate] = useState(undefined)

  const approvedStayingDocsOptions = useMemo(() => onMapApprovedStayingDocs(approvedStayingDocs), [approvedStayingDocs])

  const onChangeApprovedStayingDocuments = useCallback(value => {
    getApprovedStayingDocsField({ id: value })
  }, [])

  useEffect(() => {
    if (approvedStayingDocsOptions?.[0]) {
      const currentFields = form.getFieldsValue()
      form.setFieldsValue({
        ...currentFields,
        [FORM_FIELDS.APPROVED_STAYING_DOCUMENT]: approvedStayingDocsOptions[0]?.label
      })
      getApprovedStayingDocsField({ id: approvedStayingDocsOptions[0]?.value })
    }
  }, [approvedStayingDocsOptions])

  useEffect(() => {
    if (departureDate) {
      getValidityStayingDoc({
        id: approvedStayingDocs?.[0]?.id,
        documentenddate: moment(departureDate).format(dateFormat),
        currentdate: moment().format(dateFormat)
      })
    }
  }, [departureDate])

  const isValidDocumentRule = () => ({
    message: ERROR_MESSAGE.INVALID_STAYING_DOCUMENT,
    validator () {
      if (!isNull(isValidStayingDoc) && !isValidStayingDocLoading && !isValidStayingDoc) {
        return Promise.reject(new Error())
      }
      return Promise.resolve()
    }
  })

  useEffect(() => {
    if (departureDate) {
      form.validateFields([FORM_FIELDS.DEPARTURE_DATE])
    }
  }, [isValidStayingDoc, isValidStayingDoc])

  return (
    <Wrapper isHidden={isHidden}>
      <FormStyled>
        {isApprovedStayingDocsFieldLoading ? (
          <LoaderWrapper>
            <LoadingSpinner />
          </LoaderWrapper>
        ) : (
          <Fragment>
            <Title fontSize={12} marginBottom={10}>
              Мигр.карта или иной документ на право пребывания в РФ
            </Title>
            <FormItem
              name={FORM_FIELDS.APPROVED_STAYING_DOCUMENT}
              rules={[{ required: !isHidden, message: ERROR_MESSAGE.REQUIRED }]}
            >
              <Select
                options={approvedStayingDocsOptions || NOTHING_FOUND_OPTION}
                onChange={onChangeApprovedStayingDocuments}
                defaultActiveFirstOption
              />
            </FormItem>
            <FormItem
              name={FORM_FIELDS.MIGRATION_CARD_NUMBER}
              rules={
                !isHidden && getDocumentValidationRules(approvedStayingDocsFields, FORM_FIELDS.MIGRATION_CARD_NUMBER)
              }
            >
              <Input placeholder='Номер миграционной карты' />
            </FormItem>
            <Row justify='space-between' gutter={8}>
              <Col span={12}>
                <FormItem
                  name={FORM_FIELDS.ARRIVING_DATE}
                  rules={!isHidden && getDocumentValidationRules(approvedStayingDocsFields, FORM_FIELDS.ARRIVING_DATE)}
                >
                  <DatePickerStyled placeholder='Дата начала пребывания' disabledDate={isDisabledDatesAfterToday} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  name={FORM_FIELDS.DEPARTURE_DATE}
                  rules={!isHidden && [
                    ...getDocumentValidationRules(approvedStayingDocsFields, FORM_FIELDS.DEPARTURE_DATE),
                    isValidDocumentRule
                  ]}
                >
                  <DatePickerStyled
                    placeholder='Дата окончания пребывания'
                    onChange={(value) => setDepartureDate(value)}
                  />
                </FormItem>
              </Col>
            </Row>
          </Fragment>
        )}
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
  isValidStayingDoc: PropTypes.bool | PropTypes.null,
  isValidStayingDocLoading: PropTypes.bool,
  getValidityStayingDoc: PropTypes.func,
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

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25vh;
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
