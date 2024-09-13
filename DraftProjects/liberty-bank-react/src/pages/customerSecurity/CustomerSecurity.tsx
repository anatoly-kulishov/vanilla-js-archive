import { FC, useEffect, useState } from 'react';
import { Button, Input, PATH_PAGE } from '@/shared';
import styles from './CustomerSecurity.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const CustomerSecurity: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isPasswordChanges, setIsPasswordChanges] = useState(
    pathname === PATH_PAGE.customer.changePassword,
  );

  useEffect(() => {
    setIsPasswordChanges(pathname === PATH_PAGE.customer.changePassword);
  }, [pathname]);

  const handlerClick = () => {
    setIsPasswordChanges(true);
    navigate(PATH_PAGE.customer.changePassword);
  };

  return !isPasswordChanges ? (
    <div className={styles.body}>
      <Input.Password
        className={styles.password}
        label='Пароль'
        defaultValue='11111111111'
        white
        disabled
      />
      <Button theme='tertiary' onClick={handlerClick}>
        Изменить
      </Button>
    </div>
  ) : (
    <Outlet />
  );
};

export default CustomerSecurity;
