import { FC, useCallback, useState } from "react";
import { Form, Button, Input, FormInstance, Row, Col } from "antd";
import { useQueryClient } from "react-query";
import ResponsePerson from "types/response/persons";
import ResponseAuth from "types/response/auth";
import { enableUser, disableUser } from "utils/api/auth";
import FormsState from "../../FormsState";
import TwoFactorAuthorization from "./TwoFactorAuthorization";

const { Item } = Form;

type Props = {
  form: FormInstance;
  person: ResponsePerson.Person | undefined;
  user: ResponseAuth.UserInfo | undefined;
  refetchUser: () => void;
};

const UserForm: FC<Props> = ({ form, person, user, refetchUser }) => {
  const queryClient = useQueryClient();

  const [processUpdateStatus, setProcessUpdateStatus] = useState(false);

  const handleChangeStatus = useCallback(() => {
    const action = user?.enabled ? disableUser : enableUser;
    setProcessUpdateStatus(true);

    action(user?.id ?? 0)
      .then(() => {
        form.setFields([
          { name: "enable", value: !form.getFieldValue("enable") },
        ]);

        queryClient.setQueryData<FormsState.FormState | undefined>(
          ["user", person?.login],
          (oldState) =>
            oldState
              ? {
                  ...oldState,
                  enabled: !oldState?.enabled,
                }
              : undefined
        );
      })
      .finally(() => setProcessUpdateStatus(false));
  }, [user, form, queryClient, person]);

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Item name="login" label="Логин">
            <Input disabled />
          </Item>
        </Col>
        <Col span={12}>
          <Item name="email" label="Почта">
            <Input disabled />
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Item name="displayName" label="ФИО">
            <Input disabled />
          </Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {user && (
            <Item label="Двухфакторная авторизация">
              <TwoFactorAuthorization
                enabled={user?.twoFactorEnabled}
                userId={user?.id}
                afterStateChange={refetchUser}
              />
            </Item>
          )}
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          onClick={handleChangeStatus}
          disabled={processUpdateStatus}
        >
          {user?.enabled ? "Заблокировать" : "Активировать"}
        </Button>
      </Row>
    </Form>
  );
};

export default UserForm;
