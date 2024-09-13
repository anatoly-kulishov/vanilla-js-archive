import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Space } from 'antd'
import styled from 'styled-components'

import { Button, Input, Radio, Title, PhoneMask } from 'webseller/components'
import { SCROLL_CSS, T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import {
  BeneficiaryParam,
  BalanceTransferParam,
  SignatoryParam,
  TerminationClientStep,
  OperationParamsFormFields
} from '../helpers'
import { changeStepTerminationClient, submitOperationParamsTerminationClient } from '../reducer'
import NumberBalanceTransferInfo from './NumberBalanceTransferInfo'
import BankBalanceTransferInfo from './BankBalanceTransferInfo'
import { selectOperationParamsTerminationClient } from '../selectors'
import { EMAIL_REGEXP } from 'webseller/constants/regexp'
import { ERROR_MESSAGE } from 'webseller/constants/form'
import PersonalDataForm from 'webseller/common/personalData/components/PersonalDataForm'
import { normalizeNumber } from 'webseller/helpers'

export default function OperationParams () {
  const initialOperationParams = useSelector(selectOperationParamsTerminationClient)

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const [balanceTransferMode, setBalanceTransferMode] = useState(
    initialOperationParams[OperationParamsFormFields.BALANCE_TRANSFER]
  )
  const [beneficiaryParam, setBeneficiaryParam] = useState(
    initialOperationParams[OperationParamsFormFields.BENEFICIARY]
  )

  const onChangeBalanceTransfer = e => {
    const balanceTransferMode = e.target.value
    setBalanceTransferMode(balanceTransferMode)
  }

  const onChangeBeneficiaryParam = e => {
    const beneficiaryParam = e.target.value
    setBeneficiaryParam(beneficiaryParam)
  }

  const handleSubmit = params => {
    dispatch(submitOperationParamsTerminationClient(params))
  }

  const goBack = () => dispatch(changeStepTerminationClient(TerminationClientStep.INFORM_CLIENT))

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Расторжение договора абонента
      </Title>
      <Main>
        <Form form={form} initialValues={initialOperationParams} onFinish={handleSubmit}>
          <FormItemContainer>
            <FormLabel bold>Подписывающее лицо</FormLabel>
            <Form.Item name={OperationParamsFormFields.SIGNATORY}>
              <Radio.Group>
                <Space direction='vertical'>
                  <Radio value={SignatoryParam.CLIENT}>Абонент</Radio>
                  <Radio disabled value={SignatoryParam.CLIENT_REPRESENTATIVE}>
                    Представитель текущего абонента по нотариальной доверенности
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </FormItemContainer>
          <FormItemContainer>
            <FormLabel bold>Выгодоприобретатель</FormLabel>
            <Form.Item name={OperationParamsFormFields.BENEFICIARY}>
              <Radio.Group onChange={onChangeBeneficiaryParam}>
                <Space direction='vertical'>
                  <Radio value={BeneficiaryParam.SELF_INTEREST}>Абонент действует к собственной выгоде</Radio>
                  <Radio value={BeneficiaryParam.BENEFICIARY_INTEREST}>
                    Абонент действует в интересах выгодоприобретателя
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            {beneficiaryParam === BeneficiaryParam.BENEFICIARY_INTEREST && (
              <PersonalDataForm parentForm={form} formName={OperationParamsFormFields.BENEFICIARY_PERSONAL_DATA} />
            )}
          </FormItemContainer>
          <FormItemContainer>
            <FormLabel bold>Способ перечисления неиспользованного остатка денежных средств</FormLabel>
            <Form.Item name={OperationParamsFormFields.BALANCE_TRANSFER}>
              <Radio.Group onChange={onChangeBalanceTransfer}>
                <Space direction='vertical'>
                  <Radio value={BalanceTransferParam.NUMBER}>На номер телефона</Radio>
                  <Radio value={BalanceTransferParam.BANK_ACCOUNT}>На р/счет в банке</Radio>
                  <Radio value={BalanceTransferParam.WITHOUT_TRANSFER}>Не перечислять</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            {balanceTransferMode === BalanceTransferParam.NUMBER && <NumberBalanceTransferInfo />}
            {balanceTransferMode === BalanceTransferParam.BANK_ACCOUNT && <BankBalanceTransferInfo />}
          </FormItemContainer>
          <FormItemContainer>
            <FormLabel bold>Контактные данные</FormLabel>
            <Form.Item name={OperationParamsFormFields.CONTACT_NUMBER} normalize={normalizeNumber}>
              <PhoneMask>{inputProps => <Input {...inputProps} placeholder='Контактный номер телефона' />}</PhoneMask>
            </Form.Item>
            <Form.Item
              name={OperationParamsFormFields.CONTACT_EMAIL}
              rules={[{ pattern: EMAIL_REGEXP, message: ERROR_MESSAGE.PATTERN }]}
            >
              <Input type='email' placeholder='Адрес электронной почты' />
            </Form.Item>
          </FormItemContainer>
        </Form>
      </Main>
      <Footer>
        <Button onClick={goBack}>Назад</Button>
        <Button type='primary' onClick={form.submit}>
          Сформировать заявление
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 90%;
  height: 100%;
  max-width: 900px;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${SCROLL_CSS}
`

const FormItemContainer = styled.div`
  padding: 10px;
  border-radius: 16px;
  background-color: #eeeeee;
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const FormLabel = styled(Title)`
  padding: 0 10px;
  margin-bottom: 16px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
