import { FC } from 'react';
import { Text, IRequiredDocument, Icon } from '@/shared';
import styles from './InsuranceNeededDocuments.module.scss';

interface InsuranceNeededDocumentProps {
  neededDocuments: {
    title: string;
    documents?: IRequiredDocument[];
  };
  documentImage: string;
}

export const InsuranceNeededDocument: FC<InsuranceNeededDocumentProps> = ({
  neededDocuments: { title, documents },
  documentImage,
}) => {
  return (
    <div className={styles['needed-documents-block']}>
      <img src={documentImage} className={styles['document-image']} />
      <div className={styles['needed-documents-content']}>
        <Text tag='p' size='xl' weight='bold'>
          {title}
        </Text>
        <div className={styles['needed-documents-list']}>
          {documents &&
            documents.map(({ name, description, id }, i) => (
              <div className={styles['list-item']} key={id || `doc-${i}`}>
                <Icon
                  icon={'check-ellipse'}
                  widthAndHeight={'40px'}
                  className={styles['list-item-icon']}
                />
                <div className={styles['list-item-title-block']}>
                  <Text tag='p' size='m' weight='medium'>
                    {name}
                  </Text>
                  <Text
                    tag='p'
                    size='s'
                    weight='regular'
                    className={styles['list-item-description']}
                  >
                    {description}
                  </Text>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
