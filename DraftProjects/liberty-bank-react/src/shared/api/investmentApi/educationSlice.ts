import { COURSES, ICourses } from '@/pages/investmentLKeducation/constants';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/appStore';

interface IEducationCourseState {
  courses: ICourses[];
}

const initialState: IEducationCourseState = {
  courses: COURSES,
};

export const educationCourseSlice = createSlice({
  name: 'educationCourseSlice',
  initialState,
  reducers: {
    setCourse: (state, action) => {
      const { courseId, lessonTitle, isDone } = action.payload;
      const courseIndex = state.courses.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        const lessonIndex = state.courses[courseIndex].lessons.findIndex(
          (lesson) => lesson.title === lessonTitle,
        );
        if (lessonIndex !== -1) {
          state.courses[courseIndex].lessons[lessonIndex].isDone = isDone;
        }
      }
    },
    setTest: (state, action) => {
      const { courseId, test } = action.payload;
      const courseIndex = state.courses.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        state.courses[courseIndex].test = test;
      }
    },
  },
});

export const { setCourse, setTest } = educationCourseSlice.actions;
export const educationCourse = educationCourseSlice.reducer;

export const getCourses = (state: RootState) => state.educationCourse.courses;
