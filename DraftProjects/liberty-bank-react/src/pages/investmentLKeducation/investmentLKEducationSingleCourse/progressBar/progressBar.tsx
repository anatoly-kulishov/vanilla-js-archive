import { FC } from 'react';
import styles from './progressBar.module.scss';
import { Text } from '@/shared';

export interface IProgressBarProps {
  progress: number;
  text: string;
  allData: number;
  completedData: number;
  progressLesson?: number;
}

const ProgressBar: FC<IProgressBarProps> = ({
  progress,
  text,
  allData,
  completedData,
  progressLesson,
}) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.text}>
          <Text tag='h4'>{text}</Text>
          {text === 'Экзамен' ? (
            <div>
              {progressLesson !== undefined && progressLesson < 100 ? (
                <Text tag='h4'>Скоро</Text>
              ) : progressLesson === 100 && completedData === allData ? (
                <Text tag='h4'>Пройден</Text>
              ) : (
                <Text tag='h4'>
                  {completedData} из {allData}
                </Text>
              )}
            </div>
          ) : (
            <Text tag='h4'>
              {completedData} из {allData}
            </Text>
          )}
        </div>
        <div className={styles.containerStyles}>
          <div className={styles.fillerStyles} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
