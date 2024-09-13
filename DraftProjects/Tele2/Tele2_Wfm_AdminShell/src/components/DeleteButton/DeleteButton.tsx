import { FC } from 'react';
import { Button, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  onDelete: () => void;
};

const DeleteButton: FC<Props> = ({ onDelete }) => (
  <Popconfirm
    onConfirm={onDelete}
    title="Уверены, что хотите удалить?"
    okText="Да"
    cancelText="Нет"
  >
    <Button
      title="Удалить"
      type="text"
      icon={<CloseOutlined id="delete" size={40} />}
    />
  </Popconfirm>
);

export default DeleteButton;
