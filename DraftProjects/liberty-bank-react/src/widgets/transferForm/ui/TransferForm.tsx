import { Text } from '@/shared';
import { TITLE, TEXT, TRANSFER_FORM_COMPONENTS } from '../model/constants';
import s from './TransferForm.module.scss';

interface Props {
  transferType: string;
}

export const TransferForm = ({ transferType }: Props) => {
  const Form = TRANSFER_FORM_COMPONENTS[transferType];

  return (
    <div className={s.wrapper}>
      <Text tag='h3' weight='medium' size='m'>
        {TITLE[transferType] ? TITLE[transferType] : TITLE.noData}
      </Text>
      <div className={s.formWrapper}>
        {transferType in TRANSFER_FORM_COMPONENTS ? (
          <Form />
        ) : (
          <Text tag='p' weight='regular' size='s'>
            {TEXT.noDataDescription}
          </Text>
        )}
      </div>
    </div>
  );
};
