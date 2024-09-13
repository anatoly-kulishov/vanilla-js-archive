import { useNavigate } from 'react-router-dom';
import {
  Text,
  Wrapper,
  PATH_PAGE,
  getCustomerId,
  getAccessToken,
  useGetAllAccountsQuery,
} from '@/shared';
import { AccountOfferCard } from '@/entities';
import { UserAccounts } from '@/widgets';
import { UserAccountsSkeleton } from './ui/userAccountsSkeleton/UserAccountsSkeleton';
import { OFFERS, RESPONSE_SIZE, TEXT } from './model/constants';
import s from './UserAccountsPage.module.scss';

const UserAccountsPage = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const {
    data: userAccounts,
    isError,
    error,
    isLoading,
  } = useGetAllAccountsQuery({
    customerId: customerId,
    /**
     * TODO: Параметр size нужно убрать после рефакторинга EP который
     * увеличит количество счетов отображаемых по умолчанию
     */
    size: RESPONSE_SIZE,
  });

  if (isError && 'status' in error && error.status !== 404) {
    navigate(PATH_PAGE.error, {
      state: { error: error, path: PATH_PAGE.myBills },
    });
  }

  return (
    <Wrapper size='l'>
      <Text tag='h2' size='m' weight='medium' className={s.title}>
        {TEXT.openAccount}
      </Text>
      <ul className={s.list}>
        {OFFERS.map((offer) => (
          <AccountOfferCard testId={'bill_offer_' + offer.id} key={offer.id} {...offer} />
        ))}
      </ul>
      <Text tag='h2' size='m' weight='medium' className={s.subtitle}>
        {TEXT.myAccounts}
      </Text>
      {isLoading ? <UserAccountsSkeleton /> : <UserAccounts userAccounts={userAccounts} />}
    </Wrapper>
  );
};

export default UserAccountsPage;
