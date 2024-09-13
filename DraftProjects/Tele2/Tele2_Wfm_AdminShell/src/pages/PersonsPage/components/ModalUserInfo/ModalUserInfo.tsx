import { FC, useState, useMemo, useCallback } from "react";
import {
  Modal,
  Form,
  Collapse,
  Spin,
  Tag,
  Typography,
  Space,
  Alert,
} from "antd";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import useCheckRoles from "@t2crm/wfm-utils/lib/hooks/useCheckRoles";

import type ResponsePerson from "types/response/persons";
import Roles from "enums/roles";
import { getUserInfo } from "utils/api/auth";
import cn from "@t2crm/wfm-utils/lib/utils/cn";
import FormsState from "./FormsState";
import UserClaims from "./components/UserClaims";
import ChangePassword from "./components/ChangePassword";
import UserForm from "./components/UserForm";
import UserRoles from "./components/UserRoles";
import "./styles.less";

const { useForm } = Form;
const { Panel } = Collapse;
const { Text } = Typography;

const className = cn("persons-modal-user-info");

type ModalUserInfoProps = {
  person: ResponsePerson.Person | undefined;
  onCancel: () => void;
};

const ModalUserInfo: FC<ModalUserInfoProps> = ({ person, onCancel }) => {
  const [activePanelKeys, setActivePanelKeys] = useState<string | string[]>([]);

  const [form] = useForm<FormsState.FormState | undefined>();
  const [formPassword] = useForm<FormsState.PasswordFormState>();
  const [formClaims] = useForm<FormsState.UserClaimState>();

  const isAuthWrite = useCheckRoles(Roles.AuthWrite) || true;
  const isAuthAdmin = useCheckRoles(Roles.AuthAdmin);

  const {
    isFetched: isFetchedUser,
    data: user,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", person?.login],
    queryFn: () =>
      getUserInfo(person?.userId as number).then((response) => {
        const responseData = response?.data ?? undefined;

        form.setFieldsValue(responseData);

        return responseData;
      }),
    enabled: isAuthWrite && !!person,
  });

  const visible = useMemo(() => !!person, [person]);

  const lockoutTime = useMemo(
    () =>
      user?.lockoutEnd
        ? dayjs(user.lockoutEnd).format("DD MMMM в HH:mm:ss Z")
        : "",
    [user]
  );

  const handleClose = useCallback(() => {
    onCancel();
    form.resetFields();
    formPassword.resetFields();
    formClaims.resetFields();
    setActivePanelKeys([]);
  }, [onCancel, form, formPassword, formClaims]);

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      title={
        <Space>
          <Text>{person?.name}</Text>
          <Tag color={user?.enabled ? "green" : "red"}>
            {user?.enabled ? "Активен" : "Не активен"}
          </Tag>
        </Space>
      }
      width={720}
      className={className()}
      destroyOnClose
    >
      <Spin size="large" spinning={!isFetchedUser}>
        {user?.lockedOut && lockoutTime && (
          <Alert
            type="error"
            message={`Пользователь заблокирован. Время разблокировки: ${lockoutTime}`}
            className={className("lockout-alert")}
            showIcon
          />
        )}
        <UserForm
          form={form}
          person={person}
          user={user}
          refetchUser={refetchUser}
        />
        <Collapse
          activeKey={activePanelKeys}
          onChange={setActivePanelKeys}
          ghost
        >
          <Panel key="1" header="Сменить пароль">
            <ChangePassword form={formPassword} userId={user?.id} />
          </Panel>
          <Panel key="2" header="Индивидуальные права">
            <UserClaims form={formClaims} userId={user?.id} visible={visible} />
          </Panel>
          <Panel key="3" header="Роли" style={{display: isAuthAdmin ? 'block' : 'none'}}>
            <UserRoles userId={user?.id} />
          </Panel>
        </Collapse>
      </Spin>
    </Modal>
  );
};

export default ModalUserInfo;
