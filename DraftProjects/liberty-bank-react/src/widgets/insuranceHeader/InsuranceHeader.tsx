import { BackButton, Button, Text } from '@/shared';
import classNames from 'classnames';
import { FC, Fragment } from 'react';
import styles from './InsuranceHeader.module.scss';
import { useNavigate } from 'react-router-dom';

interface InsuranceHeaderProps {
  backBtn: string;
  headerInfo: {
    title?: string;
    subtitle: string;
    calcBtnText: string;
  };
  headerImage: string;
  headerImageSticked?: boolean;
  style?: React.CSSProperties;
  pathToCalculate?: string;
  formHeading?: string;
}

export const InsuranceHeader: FC<InsuranceHeaderProps> = ({
  backBtn,
  headerInfo,
  headerImage,
  headerImageSticked,
  style,
  pathToCalculate,
  formHeading,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles['header-block']} style={{ background: style?.backgroundColor }}>
      <div className={styles['header-content-block']}>
        <div className={styles['back-button-container']}>
          <BackButton
            text={backBtn}
            theme='fourth'
            name='arrow-left-white'
            width='24'
            height='24'
          />
        </div>
        <div className={styles['title-block']}>
          <Text tag='h1' weight='bold' className={styles['title-text']}>
            {headerInfo.title}
          </Text>
          <Text tag='h4' weight='regular'>
            {headerInfo.subtitle.split('\n').map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
          </Text>
        </div>
        <Button
          theme='secondary'
          width='auto'
          className={styles['calculate-button']}
          onClick={() =>
            navigate(pathToCalculate as string, {
              state: formHeading,
            })
          }
        >
          {headerInfo.calcBtnText}
        </Button>
      </div>
      <div className={styles['header-image-block']}>
        <img
          alt='image'
          className={classNames(
            styles['header-image'],
            headerImageSticked && styles['header-image_sticked'],
          )}
          src={headerImage}
        />
      </div>
    </div>
  );
};
