import {
  FC, useCallback, useMemo, useState,
} from 'react';
import { Switch, Popconfirm } from 'antd';
import { enabledTwoFactorAuth, disabledTwoFactorAuth } from 'utils/api/auth';

type Props = {
  enabled: boolean;
  userId: number;
  afterStateChange: () => void;
};

const TwoFactorAuthorization: FC<Props> = ({
  enabled,
  userId,
  afterStateChange,
}) => {
  const [processUpdateStatus, setProcessUpdateStatus] = useState(false);

  const confirmTitle = useMemo(() => (`
    Уверены, что хотите ${enabled ? 'отключить' : 'включить'} двухфакторную авторизацию?
  `), [enabled]);

  const handleStateChange = useCallback(() => {
    setProcessUpdateStatus(true);
    const request = enabled ? disabledTwoFactorAuth : enabledTwoFactorAuth;

    request(userId)
      .finally(() => {
        afterStateChange();
        setProcessUpdateStatus(false);
      });
  }, [enabled, userId, afterStateChange]);

  return (
    <Popconfirm
      onConfirm={handleStateChange}
      title={confirmTitle}
      okText="Да"
      cancelText="Нет"
    >
      <Switch
        checked={enabled}
        disabled={processUpdateStatus}
      />
    </Popconfirm>
  );
};

export default TwoFactorAuthorization;
