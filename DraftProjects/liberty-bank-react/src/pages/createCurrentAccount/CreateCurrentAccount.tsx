import { useNavigate } from 'react-router-dom';
import {
  BackButton,
  CardType,
  InfoFrame,
  Text,
  Wrapper,
  PATH_PAGE,
  useCreateCurrentAccountMutation,
} from '@/shared';
import { CreateAccount } from '@/features';
import { CreateCurrentAccountSkeleton } from './ui/createCurrentAccountSkeleton/CreateCurrentAccountSkeleton';
import { TEXT, ICON_SUCCESS, ICON_FAIL } from './model/constants';
import s from './CreateCurrentAccount.module.scss';

const CreateCurrentAccount = () => {
  const navigate = useNavigate();
  const [createCurrentAccount, { data, isError, isLoading }] = useCreateCurrentAccountMutation();
  const isFormVisible = !data && !isError && !isLoading;

  const handleClickAllAccount = () => {
    navigate(PATH_PAGE.myBills);
  };

  return (
    <Wrapper size='l'>
      <BackButton
        text={TEXT.backBtn}
        theme='blue'
        height='24'
        width='24'
        name='arrow-left-blue'
        className={s.backBtn}
      />
      {isFormVisible && (
        <Text tag='h2' size='m' weight='medium' className={s.title}>
          {TEXT.title}
        </Text>
      )}
      {isFormVisible ? (
        <CreateAccount onSubmit={createCurrentAccount} />
      ) : isLoading ? (
        <CreateCurrentAccountSkeleton />
      ) : (
        <div className={s.infoWrapper}>
          <InfoFrame
            title={isError ? TEXT.titleFail : TEXT.titleSuccess}
            primaryBtnText={TEXT.goToAllAccounts}
            onPrimaryButtonClick={handleClickAllAccount}
            cardType={isError ? CardType.dontOpen : CardType.openBill}
            icon={isError ? ICON_FAIL : ICON_SUCCESS}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default CreateCurrentAccount;
