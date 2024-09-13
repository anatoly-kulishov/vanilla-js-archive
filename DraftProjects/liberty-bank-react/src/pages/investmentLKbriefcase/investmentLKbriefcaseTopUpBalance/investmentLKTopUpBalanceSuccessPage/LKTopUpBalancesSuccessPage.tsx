import { useNavigate, useOutletContext } from 'react-router-dom';
import { CardType, InfoFrame, PATH_PAGE } from '@/shared';

export default function LKTopUpBalancesSuccessPage() {
  const navigate = useNavigate();
  const { funds } = useOutletContext<{ funds: string }>();

  return (
    <InfoFrame
      icon={{
        image: 'character',
        width: '330',
        height: '330',
      }}
      primaryBtnText='Вернуться в кабинет'
      secondaryBtnText='Сохранить чек'
      title={`Брокерский счет на сумму ${funds} RUB успешно пополнен`}
      cardType={CardType.checkbox}
      onPrimaryButtonClick={() => navigate(PATH_PAGE.investmentLK.start)}
      onSecondaryButtonClick={() => {}}
    />
  );
}
