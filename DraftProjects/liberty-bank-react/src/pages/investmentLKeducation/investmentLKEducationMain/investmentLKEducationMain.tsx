import { Text, Image, getCourses } from '@/shared';
import { MAIN_TITLE, MAIN_DESCRIPTION, ICourses, MAIN_COURSE } from '../constants';
import styles from './investmentLKEducationMain.module.scss';
import { useSelector } from 'react-redux';
import CourseCard from './courseCard/courseCard';

const InvestmentLKEducationMain = () => {
  const courses = useSelector(getCourses);
  return (
    <>
      <div className={styles.containerInfo}>
        <div className={styles.info}>
          <Text tag='h1' size='xl' weight='bold'>
            {MAIN_TITLE}
          </Text>
          <Text tag='p' size='s' className={styles.description}>
            {MAIN_DESCRIPTION}
          </Text>
        </div>
        <Image image={'education-main'} />
      </div>
      <Text tag='h1' size='xl' weight='bold'>
        {MAIN_COURSE}
      </Text>
      <div className={styles.wrapper}>
        {courses.map((item: ICourses) => (
          <CourseCard key={item.id} course={item} />
        ))}
      </div>
    </>
  );
};

export default InvestmentLKEducationMain;
