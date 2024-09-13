import { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

type Props = {
  onConfirm: VoidFunction;
};

const DeleteRoleButton: FC<Props> = ({ onConfirm }) => (
  <Popconfirm
    title="Вы действительно хотите удалить роль у пользователя?"
    okButtonProps={{ type: "primary" }}
    okText="Да"
    cancelButtonProps={{ type: "default" }}
    cancelText="Нет"
    zIndex={1051}
    onConfirm={onConfirm}
  >
    <Button
      title="Удалить"
      type="text"
      icon={<CloseOutlined rev={null} size={40} />}
    />
  </Popconfirm>
);

export default DeleteRoleButton;
