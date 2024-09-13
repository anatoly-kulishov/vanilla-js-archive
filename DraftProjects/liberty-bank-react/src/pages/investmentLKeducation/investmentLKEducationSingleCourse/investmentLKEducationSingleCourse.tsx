import { BUTTONS_COURSE, EXAM } from '../constants';
import styles from './investmentLKEducationSingleCourse.module.scss';
import { Text, BackButton, Link, PATH_PAGE, Image, Button } from '@/shared';
import { useNavigate, useParams, generatePath } from 'react-router-dom';
import ProgressBar from './progressBar/progressBar';
import { useEffect, useState } from 'react';
import LessonCard from './lessonCard/lessonCard';
import { test } from '../testPage/constants';
import { getDataCourses, updateProgress, updateProgressExam } from '../lib/utils';

const InvestmentLKEducationSingleCourse = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const { oneCourse, correctResults, completedLessons } = getDataCourses(id, '');

  useEffect(() => {
    window.scrollTo(0, 200);
  }, [id]);

  useEffect(() => {
    updateProgress(oneCourse, setProgressLesson);
    if (oneCourse.test.isDone) {
      updateProgressExam(correctResults, setProgressExam);
    }
  }, [oneCourse]);

  const [progressLesson, setProgressLesson] = useState(0);
  const [progressExam, setProgressExam] = useState(0);

  const handleBackButtonClick = () => navigate(PATH_PAGE.investmentLK.education.start);
  const handleButtonClick = () => {
    const value = oneCourse.lessons.find((el) => el.isDone === false);
    navigate(
      generatePath(PATH_PAGE.investmentLK.education.singleLesson, {
        id: oneCourse.id,
        lessonId: String(value?.id),
      }),
    );
  };

  return (
    <div>
      <BackButton
        text='Назад'
        theme='blue'
        name='arrow-left-blue'
        className={styles.backBtn}
        click={handleBackButtonClick}
      />
      <div
        className={styles.containerInfo}
        style={{ backgroundColor: `${oneCourse.backgroundColor}` }}
      >
        <div className={styles.info}>
          <Text tag='h1' size='xl' weight='bold'>
            {oneCourse.title}
          </Text>
          <Text tag='h4' className={styles.description}>
            {oneCourse.description}
          </Text>
          <div className={styles.items}>
            <div className={styles.item}>{oneCourse.lessons.length} уроков</div>
          </div>
          <Button theme='third' className={styles.buttonMain} onClick={handleButtonClick}>
            {' '}
            {completedLessons ? BUTTONS_COURSE.continue : BUTTONS_COURSE.start}
          </Button>
        </div>
        <div>
          <Image image={oneCourse.img} widthAndHeight='400px' />
        </div>
      </div>
      <div className={styles.containerLessons}>
        <div className={styles.lessons}>
          {oneCourse.lessons.map((item) => (
            <Link
              to={generatePath(PATH_PAGE.investmentLK.education.singleLesson, {
                id: oneCourse.id,
                lessonId: String(item.id),
              })}
              key={item.id}
              className={styles.link}
            >
              <LessonCard item={item} bg={oneCourse.backgroundColor} />
            </Link>
          ))}
          <Link
            to={
              progressLesson === 100
                ? generatePath(PATH_PAGE.investmentLK.education.exam, { id: oneCourse.id })
                : '#'
            }
            className={styles.link}
          >
            <LessonCard
              item={EXAM}
              bg={oneCourse.backgroundColor}
              progressLesson={progressLesson}
              progressExam={progressExam}
            />
          </Link>
        </div>

        <div className={styles.progressWrapper}>
          <Text tag='h3' weight='bold'>
            Прогресс курса
          </Text>
          <ProgressBar
            progress={progressLesson}
            text='Уроки'
            completedData={completedLessons}
            allData={oneCourse.lessons.length}
          />
          <ProgressBar
            progress={progressExam}
            text='Экзамен'
            completedData={correctResults}
            allData={test.questions.length}
            progressLesson={progressLesson}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentLKEducationSingleCourse;
