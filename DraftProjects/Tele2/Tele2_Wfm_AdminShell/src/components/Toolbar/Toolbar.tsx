import { FC, ForwardRefExoticComponent } from 'react';
import Icon, {
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import cn from '@t2crm/wfm-utils/lib/utils/cn';

type ActionType = 'add' | 'edit';

type ButtonItem = {
  title: string;
  actionType: ActionType;
  onClick: () => void;
};

type Props = {
  buttons: ButtonItem[]
};

const className = cn('toolbar');

const getButtonIconByType = (actionType: ActionType) => {
  switch (actionType) {
    case 'add':
      return PlusOutlined;
    case 'edit':
      return EditOutlined;
    default:
      return null;
  }
};

const Toolbar: FC<Props> = ({ buttons }) => (
  <Space className={className()}>
    {buttons.map((btn) => (
      <Space key={btn.title}>
        <Button
          title={btn.title}
          type="text"
          onClick={btn.onClick}
          icon={(
            <Icon
              component={getButtonIconByType(btn.actionType) as ForwardRefExoticComponent<any>}
              size={40}
              id={`${btn.actionType}-icon`}
            />
          )}
        />
      </Space>
    ))}
  </Space>
);

export default Toolbar;
