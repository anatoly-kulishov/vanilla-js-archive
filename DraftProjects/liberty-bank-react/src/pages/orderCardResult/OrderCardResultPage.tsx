import { useLocation, useNavigate } from 'react-router-dom';
import { BackButton, CardType, InfoFrame } from '@/shared';
import { TEXT, statusText } from './constants';
import { AnswerTypes, newCardResponseImages } from './types';
import s from './OrderCardResultPage.module.scss';

const OrderCardCloseResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const answerType = state.answerType as AnswerTypes;

  const goSend = () => {
    navigate('/cards/my-cards', { replace: true });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={s.container}>
      {answerType !== AnswerTypes.SUCCESS ? (
        <>
          <BackButton
            click={goBack}
            className={s.btnBack}
            text={TEXT.back}
            theme='blue'
            height='24'
            width='24'
          />
          <div className={s.infoFrameWrapper}>
            <InfoFrame
              icon={{
                width: '400',
                height: '400',
                image: newCardResponseImages[answerType],
              }}
              primaryBtnText={TEXT.goBack}
              secondaryBtnText={TEXT.goSend}
              onSecondaryButtonClick={goSend}
              underImageTitle={statusText[answerType]}
              cardType={CardType.openCard}
              onPrimaryButtonClick={goBack}
            />
          </div>
        </>
      ) : (
        <div className={s.infoFrameWrapper}>
          <InfoFrame
            icon={{
              width: '400',
              height: '400',
              image: newCardResponseImages[answerType],
            }}
            primaryBtnText={TEXT.goSend}
            underImageTitle={statusText[answerType]}
            underImageSubTitle={TEXT.successSubtitle}
            cardType={CardType.openCard}
            onPrimaryButtonClick={goSend}
          />
        </div>
      )}
    </div>
  );
};

export default OrderCardCloseResultPage;
