import { FC } from 'react';
import styles from './lessonCard.module.scss';
import { Text, Icon } from '@/shared';
import { ILesson, LESSON_EXAM } from '../../constants';

export interface ILessonCardProps {
  item: ILesson;
  bg: string;
  id?: number;
  progressLesson?: number;
  progressExam?: number;
}

const LessonCard: FC<ILessonCardProps> = ({ item, bg, progressLesson, progressExam }) => {
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonImg} style={{ backgroundColor: `${bg}` }} />
      <div className={styles.lessonText}>
        <Text tag='h4' weight='bold'>
          {item.title}
        </Text>
        <div className={styles.descriptionWrapper}>
          <Text tag='p' size='s' className={styles.description}>
            {item.type === 'lesson' && item.id ? `Урок ${item.id}` : LESSON_EXAM}
          </Text>
        </div>
      </div>
      {item.type === 'lesson' ? (
        <div className={styles.lock}>
          {item.isDone && <Icon icon={'success-circle'} width='30px' height='30px' />}
        </div>
      ) : (
        <div className={styles.lock}>
          {progressLesson !== undefined && progressLesson < 100 && (
            <Icon icon={'security'} width='30px' height='30px' />
          )}
          {progressLesson === 100 && progressExam === 100 && (
            <Icon icon={'success-circle'} width='30px' height='30px' color='#ffffff' />
          )}
        </div>
      )}
    </div>
  );
};

export default LessonCard;
