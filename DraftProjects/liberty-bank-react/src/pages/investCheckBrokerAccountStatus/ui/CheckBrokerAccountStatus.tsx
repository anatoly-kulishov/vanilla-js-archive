import {
  PATH_PAGE,
  Spinner,
  setBrokerAccStatus,
  setBrokerAccountStatusToLS,
  usePostCustomerAuthMutation,
} from '@/shared';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckBrokerAccountStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trigger, { isLoading }] = usePostCustomerAuthMutation();

  useEffect(() => {
    trigger()
      .unwrap()
      .then((responce) => {
        const respStatus = responce.userHaveActiveBrokerAccount;
        const redirectPath = respStatus
          ? PATH_PAGE.investmentLK.briefcase.start
          : PATH_PAGE.investmentLK.startNonRegistered;
        dispatch(setBrokerAccStatus(responce.userHaveActiveBrokerAccount));
        setBrokerAccountStatusToLS(respStatus);
        navigate(redirectPath, { replace: true });
      });
  }, [trigger, dispatch]);

  if (isLoading) return <Spinner />;
  return null;
};

export default CheckBrokerAccountStatus;
