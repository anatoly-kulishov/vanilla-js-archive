import { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

type Props = {
  classNameButton?: string;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
};

const DeleteLimitButton: FC<Props> = ({ classNameButton, onConfirm, onCancel }) => (
  <Popconfirm
    title="Вы действительно хотите удалить ограничение у операции?"
    okText="Да"
    cancelText="Нет"
    zIndex={1051}
    onConfirm={onConfirm}
    onCancel={onCancel}
  >
    <Button
      className={classNameButton}
      title="Удалить"
      type="text"
      icon={<CloseOutlined rev={null} size={40} />}
    />
  </Popconfirm>
);

export default DeleteLimitButton;
