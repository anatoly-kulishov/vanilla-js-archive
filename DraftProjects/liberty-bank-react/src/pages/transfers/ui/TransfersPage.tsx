import { Wrapper, Text } from '../../../shared';
import { TransfersActionsList } from '../../../widgets/transfersActionsList';
import { TEXT, BETWEEN_YOUR_OWN_ACTIONS, TO_ANOTHER_PERSON_ACTIONS } from '../model/constants';
import s from './TransfersPage.module.scss';

const TransfersPage = () => {
  return (
    <Wrapper size='l' className={s.wrapper}>
      <div className={s.firstRow}>
        <Text tag='h2' weight='bold' className={s.title}>
          {TEXT.betweenYourOwn}
        </Text>
        <TransfersActionsList actionItems={BETWEEN_YOUR_OWN_ACTIONS} />
      </div>
      <div className={s.lastRow}>
        <Text tag='h2' weight='bold' className={s.title}>
          {TEXT.toAnotherPerson}
        </Text>
        <TransfersActionsList actionItems={TO_ANOTHER_PERSON_ACTIONS} />
      </div>
    </Wrapper>
  );
};

export default TransfersPage;
