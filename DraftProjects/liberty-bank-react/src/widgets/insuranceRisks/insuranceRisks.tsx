import { Fragment } from 'react';
import { Icon, Text, TSvgIconNames } from '@/shared';
import styles from './insuranceRisks.module.scss';

interface IRisks {
  id: string;
  title: string;
  description: string;
  icon: TSvgIconNames;
}

export const InsuranceRisks = ({ risks }: { risks: IRisks[] }) => {
  return (
    <section className={styles['body-block']}>
      <Text tag='h4' size='xl' weight='bold'>
        Какие риски включены в стоимость
      </Text>
      <ul className={styles['risks']}>
        {risks.map((el) => (
          <li className={styles['risks-card']} key={el.id}>
            <Icon icon={el.icon} widthAndHeight={'48px'} className={'risks-card-icon'} />
            <Text tag='h2' size='m' className={styles['risks-card-title']}>
              {el.title}
            </Text>
            {el.description && (
              <Text tag='p' size='s' weight='regular' className={styles['risks-card-description']}>
                {el.description.split('\n').map((line) => (
                  <Fragment key={line}>
                    {line.split(/(\*\*.+?\*\*)/g).map((part, partIndex) =>
                      part.startsWith('**') && part.endsWith('**') ? (
                        <Text key={partIndex} tag='span' className={styles['tooltip-bold-span']}>
                          {part.substring(2, part.length - 2)}
                        </Text>
                      ) : (
                        part
                      ),
                    )}
                    <br />
                  </Fragment>
                ))}
              </Text>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
