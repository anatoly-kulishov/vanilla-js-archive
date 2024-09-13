import { FC } from 'react';
import { Text } from '../../../shared';
import { ApplicantInfo } from './applicantInfo';
import { InsurantInfo } from './insurantInfo';
import { ContractInfo } from './contractinfo';
import { RequisitesInfo } from './requisitesInfo';
import { PROPERTIES } from '../constants.ts';
import styles from '../../../pages/insuranceClaim/InsuranceClaim.module.scss';
import { IBlocks, IFormProps } from '../lib/types.ts';

export const InsuranceFormInfo: FC<IFormProps> = ({ policyName, content }) => {
  const BlockInfo: IBlocks[] = [
    {
      text: 'Сведения о заявителе',
      element: <ApplicantInfo />,
    },
    {
      text: `${
        PROPERTIES.includes(policyName) ? 'Сведения о владельце' : 'Сведения о застрахованном'
      }`,
      element: <InsurantInfo />,
    },
    {
      text: 'Сведения о договоре',
      element: <ContractInfo />,
    },
    {
      text: 'Реквизиты счета',
      element: <RequisitesInfo />,
    },
    {
      text: 'Подробности',
      element: content,
    },
  ];

  return (
    <>
      {BlockInfo.map((block) => (
        <div key={block.text} className={styles['form__block']}>
          <Text tag='h3' weight='medium' className={styles['form__header']}>
            {block.text}
          </Text>
          {block.element}
        </div>
      ))}
    </>
  );
};
