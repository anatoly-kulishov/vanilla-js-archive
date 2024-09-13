import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'
import { Input, Button, Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

export default function PepCode ({
  isAllowToSendAnotherCode = false,
  isLoadingGetCode,
  isLoadingCheckCode,
  placeholder = 'Код',
  getCode,
  checkCode,
  goBack
}) {
  const [form] = Form.useForm()

  useLayoutEffect(() => {
    getCode()
  }, [])

  const onSubmitCode = ({ code }) => {
    checkCode(code)
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Введи код подтверждения
      </Title>
      <Main>
        <Form form={form} onFinish={onSubmitCode}>
          <Form.Item name='code'>
            <Input placeholder={placeholder} disabled={isLoadingGetCode || isLoadingCheckCode} />
          </Form.Item>
          <Footer>
            <Button disabled={isLoadingCheckCode || isLoadingGetCode} onClick={goBack}>
              Назад
            </Button>
            <CodeButtons>
              {isAllowToSendAnotherCode && (
                <Button type='primary' loading={isLoadingGetCode} disabled={isLoadingCheckCode} onClick={getCode}>
                  Отправить повторно
                </Button>
              )}
              <Button type='primary' htmlType='submit' loading={isLoadingGetCode || isLoadingCheckCode}>
                Отправить
              </Button>
            </CodeButtons>
          </Footer>
        </Form>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  max-width: 600px;
`

const Main = styled.div`
  margin: 24px 0 0;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 0;
`

const CodeButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`
