import { ICourses, ILesson } from '../constants';
import { test } from '../testPage/constants';
import { getCourses } from '@/shared/api/investmentApi';
import { useSelector } from 'react-redux';

export const getDataCourses = (id: string, lessonId: string) => {
  const courses: ICourses[] = useSelector(getCourses);
  const oneCourse = courses.find((course: ICourses) => course.id === id)!;

  const correctResults = oneCourse.test.correctResults;
  const completedLessons = oneCourse.lessons.filter((lesson: ILesson) => lesson.isDone).length;

  const oneLesson = oneCourse.lessons.find((el) => String(el.id) == lessonId)!;

  return {
    oneCourse,
    correctResults,
    completedLessons,
    oneLesson,
  };
};

export const updateProgress = (oneCourse: ICourses, callback: (progress: number) => void) => {
  const totalLessons = oneCourse.lessons.length;
  const completedLessons = oneCourse.lessons.filter((lesson: ILesson) => lesson.isDone).length;
  const newProgress = Math.floor((completedLessons / totalLessons) * 100);
  callback(newProgress);
};

export const updateProgressExam = (
  correctResults: number,
  callback: (progress: number) => void,
) => {
  const totalQuestions = test.questions.length;
  const newProgress = Math.floor((correctResults / totalQuestions) * 100);
  callback(newProgress);
};
