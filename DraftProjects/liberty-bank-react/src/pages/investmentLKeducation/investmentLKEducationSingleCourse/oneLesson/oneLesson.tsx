import styles from './oneLesson.module.scss';
import { BackButton, Text, Button, PATH_PAGE, Image, setCourse } from '@/shared';
import { SUCCESS_TEST, ONE_LESSON_TEXT, SUCCESS_LESSON } from '../../constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { getDataCourses } from '../../lib/utils';

const OneLesson = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackButtonClick = () =>
    navigate(generatePath(PATH_PAGE.investmentLK.education.singleCourse, { id: oneCourse.id }));
  const { id = '', lessonId = '' } = useParams<{ id: string; lessonId: string }>();

  useEffect(() => {
    window.scrollTo(0, 200);
  }, [lessonId]);

  const { oneCourse, oneLesson } = getDataCourses(id, lessonId);

  const handleButtonClick = (lessonTitle: string) => {
    dispatch(setCourse({ courseId: oneCourse.id, lessonTitle, isDone: true }));
    if (lessonId && lessonId < String(oneCourse.lessons.length)) {
      navigate(
        generatePath(PATH_PAGE.investmentLK.education.singleLesson, {
          id: oneCourse.id,
          lessonId: String(Number(lessonId) + 1),
        }),
      );
    } else if (lessonId == String(oneCourse.lessons.length)) {
      navigate(generatePath(PATH_PAGE.investmentLK.education.exam, { id: oneCourse.id }));
    }
  };

  return (
    <>
      <BackButton
        text='Назад'
        theme='blue'
        name='arrow-left-blue'
        className={styles.backBtn}
        click={handleBackButtonClick}
      />
      <div className={styles.container}>
        <div className={styles.lesson}>
          <div
            className={styles.lessonImg}
            style={{ backgroundColor: `${oneCourse?.backgroundColor}` }}
          />
          <div className={styles.lessonText}>
            <Text tag='h1' size='xl' weight='bold'>
              {oneLesson?.title}
            </Text>
            <div className={styles.descriptionWrapper}>
              <Text tag='p' size='s' className={styles.description}>
                Урок {Number(lessonId)}
              </Text>
            </div>
          </div>
        </div>
        <div className={styles.textWrapper}>
          <Text tag='h3' size='m' className={styles.descriptionLesson} weight='bold'>
            {ONE_LESSON_TEXT.description}
          </Text>
          {ONE_LESSON_TEXT.text.map((text) => (
            <>
              <Text tag='h4' size='s' weight='bold'>
                {text.title}
              </Text>
              <Text tag='p' size='s'>
                {text.text}
              </Text>
            </>
          ))}
        </div>
      </div>
      {oneCourse.lessons.length === oneLesson.id ? (
        <div className={styles.success}>
          <div className={styles.successBlock}>
            <Image image='education-lesson' />
            <Text tag='p' size='s'>
              {SUCCESS_TEST.support}
            </Text>
            <Text tag='p' size='s'>
              {SUCCESS_TEST.success}
            </Text>
            <Button onClick={() => handleButtonClick(oneLesson.title)}>{SUCCESS_TEST.next}</Button>
          </div>
        </div>
      ) : (
        <div className={styles.success}>
          <div className={styles.successBlock}>
            <Image image='education-lesson' />
            <Text tag='p' size='s'>
              {SUCCESS_LESSON.support}
            </Text>
            <Text tag='p' size='s'>
              {SUCCESS_LESSON.success}
            </Text>
            <Button onClick={() => handleButtonClick(oneLesson.title)}>
              {SUCCESS_LESSON.next}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default OneLesson;
