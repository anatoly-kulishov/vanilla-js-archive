import {
  FC, useCallback, useMemo, useState,
} from 'react';
import {
  Form,
  Button,
  Input,
  FormInstance,
  Alert,
  Space,
  Typography,
} from 'antd';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import isNil from 'lodash.isnil';
import { updatePassword } from 'utils/api/auth';
import useValidatePassword from '../../hooks/useValidatePassword';
import './styles.less';

const { Item, useWatch } = Form;
const { Text } = Typography;

const className = cn('change-password');

type Props = {
  form: FormInstance;
  userId: number | undefined;
};

const prepareCheckPassword = (password: string, repeatPassword: string) => (
  repeatPassword && password && repeatPassword === password
);

const ChangePassword: FC<Props> = ({ form, userId }) => {
  const password = useWatch('password', form);
  const repeatPassword = useWatch('repeatPassword', form);

  const [processUpdatePassword, setProcessUpdatePassword] = useState(false);

  const {
    isValidPassword,
    rulesPasswordResult,
  } = useValidatePassword(password);

  const enabledChangePassword = useMemo(() => (
    prepareCheckPassword(password, repeatPassword)
  ), [password, repeatPassword]);

  const handleUpdatePassword = useCallback(() => {
    if (!enabledChangePassword) return;

    setProcessUpdatePassword(true);

    updatePassword(userId ?? 0, password)
      .finally(() => setProcessUpdatePassword(false));
  }, [enabledChangePassword, userId, password]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleUpdatePassword}
      className={className()}
    >
      <div className={className('line')}>
        <div className={className('passwords')}>
          <Item name="password" label="Пароль">
            <Input.Password />
          </Item>
          <Item name="repeatPassword" label="Повторите пароль">
            <Input.Password />
          </Item>
        </div>
        <div className={className('validates-block')}>
          {rulesPasswordResult.map((rule) => (
            <Space key={`rule_${rule.title}`} className={className('validate-item')}>
              <span className={className('validate', { status: rule.status })} />
              <Text className={className('validate-item-text')}>{rule.title}</Text>
            </Space>
          ))}
        </div>
      </div>
      {!isNil(enabledChangePassword) && !enabledChangePassword && (
        <Alert
          type="error"
          message="Пароли не совпадают"
          banner
        />
      )}
      <div className={className('change-password')}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!isValidPassword || !enabledChangePassword || processUpdatePassword}
        >
          Изменить пароль
        </Button>
      </div>
    </Form>
  );
};

export default ChangePassword;
