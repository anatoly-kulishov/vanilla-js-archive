import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardsOverview } from '@/widgets';
import {
  CardType,
  FilterButtons,
  InfoFrame,
  PATH_PAGE,
  Tabs,
  getAccessToken,
  getCustomerId,
  useGetUserCardsQuery,
  useGetUserCreditCardsQuery,
} from '@/shared';
import { FILTER_TEXT, NOT_HAVE_CARDS, TEXT } from './constants';
import styles from './MyCardsPage.module.scss';

const MyCardsPage = () => {
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const { data: myDebitCards, isError: debitCardsError } = useGetUserCardsQuery(customerId);
  const { data: myCreditCards, isError: creditCardsError } = useGetUserCreditCardsQuery();
  const [filterCurrency, setFilterCurrency] = useState(FILTER_TEXT[0]);
  const navigate = useNavigate();
  const isDebitCardExist = myDebitCards?.length !== 0 && !debitCardsError;
  const isCreditCardExist = myCreditCards?.length !== 0 && !creditCardsError;
  const isCardsExist = isDebitCardExist || isCreditCardExist;
  const allCards = useMemo(() => {
    const debitCards = myDebitCards ?? [];
    const creditCards = myCreditCards ?? [];

    return [...debitCards, ...creditCards];
  }, [myDebitCards, myCreditCards]);

  const navigateToCardProducts = () => {
    navigate(PATH_PAGE.cardProducts);
  };

  const notHaveCardsInfoFrame = (
    <div className={styles['my-cards__info-frame-wrapper']}>
      <InfoFrame
        icon={NOT_HAVE_CARDS}
        cardType={CardType.dontOpen}
        title={TEXT.notHaveCards}
        primaryBtnText={TEXT.openCard}
        onPrimaryButtonClick={navigateToCardProducts}
      />
    </div>
  );

  const tabs = [
    {
      label: TEXT.allCardsLabel,
      content: isCardsExist ? (
        <CardsOverview cardsData={allCards} filterCurrency={filterCurrency} />
      ) : (
        notHaveCardsInfoFrame
      ),
    },
    {
      label: TEXT.debitCardsLabel,
      content: isDebitCardExist ? (
        <CardsOverview cardsData={myDebitCards} filterCurrency={filterCurrency} />
      ) : (
        notHaveCardsInfoFrame
      ),
    },
    {
      label: TEXT.creditCardsLabel,
      content: isCreditCardExist ? (
        <CardsOverview cardsData={myCreditCards} filterCurrency={filterCurrency} />
      ) : (
        notHaveCardsInfoFrame
      ),
    },
  ];

  return (
    <div className={styles['my-cards']}>
      <Tabs
        tabs={tabs}
        theme='minimalistic'
        filter={<FilterButtons filter={FILTER_TEXT} filterChange={setFilterCurrency} />}
      />
    </div>
  );
};

export default MyCardsPage;
