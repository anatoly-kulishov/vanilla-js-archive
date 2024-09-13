import { FC, useLayoutEffect } from 'react';
import { Form } from 'antd';

import { Font } from 'styles';
import { Button, Input, Title } from 'uiKit';
import { CodeButtons, Container, Footer, Main } from './styled';

type Props = {
  isAllowToSendAnotherCode?: boolean;
  isLoadingGetCode: boolean;
  isLoadingCheckCode: boolean;
  placeholder?: string;
  getCode: () => void;
  checkCode: (code: string) => void;
  goBack: () => void;
};

const PepCode: FC<Props> = ({
  isAllowToSendAnotherCode = false,
  isLoadingGetCode,
  isLoadingCheckCode,
  placeholder = 'Код',
  getCode,
  checkCode,
  goBack
}) => {
  const [form] = Form.useForm();

  useLayoutEffect(() => {
    getCode();
  }, []);

  const onSubmitCode = ({ code }) => {
    checkCode(code);
  };

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={Font.T2_BOLD}>
        Введи код подтверждения
      </Title>
      <Main>
        <Form form={form} onFinish={onSubmitCode}>
          <Form.Item name="code">
            <Input placeholder={placeholder} disabled={isLoadingGetCode || isLoadingCheckCode} />
          </Form.Item>
          <Footer>
            <Button disabled={isLoadingCheckCode || isLoadingGetCode} onClick={goBack}>
              Назад
            </Button>
            <CodeButtons>
              {isAllowToSendAnotherCode && (
                <Button
                  type="primary"
                  loading={isLoadingGetCode}
                  disabled={isLoadingCheckCode}
                  onClick={getCode}
                >
                  Отправить повторно
                </Button>
              )}
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingGetCode || isLoadingCheckCode}
              >
                Отправить
              </Button>
            </CodeButtons>
          </Footer>
        </Form>
      </Main>
    </Container>
  );
};

export default PepCode;
