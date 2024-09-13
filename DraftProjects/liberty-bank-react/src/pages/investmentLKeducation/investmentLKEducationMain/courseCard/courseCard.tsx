import { FC } from 'react';
import { ICourses } from '../../constants';
import { Text, Link, Image, PATH_PAGE, Icon } from '@/shared';
import styles from './courseCard.module.scss';
import { generatePath } from 'react-router-dom';

export interface ICourseCardProps {
  course: ICourses;
}

const CourseCard: FC<ICourseCardProps> = ({ course }) => {
  return (
    <Link
      to={generatePath(PATH_PAGE.investmentLK.education.singleCourse, { id: course.id })}
      className={styles.course}
    >
      <div className={styles.img}>
        {course.test.isDone && (
          <Icon
            icon={'success-circle'}
            width='30px'
            height='30px'
            color='#ffffff'
            className={styles.iconClass}
          />
        )}
        <Image image={course.img} widthAndHeight='100px' />
      </div>
      <div className={styles.courseTitle} style={{ backgroundColor: `${course.backgroundColor}` }}>
        <Text tag='h4' weight='bold'>
          {course.title}
        </Text>
        <Text tag='p'>{course.lessons.length} уроков</Text>
      </div>
    </Link>
  );
};

export default CourseCard;
