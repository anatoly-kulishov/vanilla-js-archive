import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Form } from 'antd'

import { selectAccountClientCodeword, selectAccountPassword } from 'webseller/features/changeCodeWord/selectors'
import { CHANGE_CODE_WORD_PROCESS_STEPS } from 'webseller/features/changeCodeWord/constants'
import { selectSearchParams, selectSessionParams } from 'webseller/features/webSellerSearch/reducer/selectors'
import { CLIENT_ENVIRONMENTS } from 'webseller/constants/clientCategory'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { clientCategories } from 'constants/personalAccountStrings'
import { Button, Input, Title } from 'webseller/components'
import {
  getB2bClientMinimalInfo,
  getSubscriberPersonalData,
  setChangeCodeWordProcessStep,
  setDocumentData
} from 'webseller/features/changeCodeWord/reducer'

import { FORM_VALUES, INITIAL_VALUES } from './constants/form'

export default function CodeWordStep () {
  const dispatch = useDispatch()

  const clientCodeword = useSelector(selectAccountClientCodeword)
  const clientPassword = useSelector(selectAccountPassword)
  const sessionParams = useSelector(selectSessionParams)
  const searchParams = useSelector(selectSearchParams)

  const isUnionEnv = searchParams?.enviroment !== CLIENT_ENVIRONMENTS.UNION
  const isB2b = searchParams?.clientCategory === clientCategories.B2B
  const isB2c = searchParams?.clientCategory === clientCategories.B2C

  const [form] = Form.useForm()

  useLayoutEffect(() => {
    let fieldValue = ''
    const isCodeWord = isB2b && isUnionEnv
    const isPassword = isB2b && isUnionEnv && isB2c
    if (isCodeWord) fieldValue = clientCodeword
    if (isPassword) fieldValue = clientPassword
    form.setFieldsValue({ [FORM_VALUES.CODE_WORD]: fieldValue })
  }, [searchParams])

  const onSubmitForm = (formData) => {
    if (isB2b) {
      dispatch(getB2bClientMinimalInfo({ branchId: sessionParams?.branchId, clientId: sessionParams?.clientId }))
    }
    if (isB2c) {
      dispatch(getSubscriberPersonalData({ msisdn: sessionParams?.msisdn }))
    }
    dispatch(setDocumentData(formData))
    dispatch(setChangeCodeWordProcessStep(CHANGE_CODE_WORD_PROCESS_STEPS.SIGNING))
  }

  return (
    <Container>
      <Title marginBottom={15} bold fontSize={16} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Введите кодовое слово
      </Title>
      <Form form={form} initialValues={INITIAL_VALUES} onFinish={onSubmitForm}>
        <Form.Item
          name={FORM_VALUES.CODE_WORD}
          rules={[
            { required: true, message: 'Параметр должен содержать от 2 до 50 кириллических символов' },
            { pattern: /^[а-яА-Я]{2,50}$/gm, message: 'Параметр должен содержать от 2 до 50 кириллических символов\'' }
          ]}
        >
          <Input />
        </Form.Item>
        <Footer>
          <Button
            style={{ width: 110 }}
            type='primary'
            htmlType='submit'
          >
            Далее
          </Button>
        </Footer>
      </Form>
    </Container>
  )
}

const Container = styled.div`
    width: 60%;
    max-width: 600px;
`
const Footer = styled.div`
    margin-top: 24px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    align-items: center;
`
