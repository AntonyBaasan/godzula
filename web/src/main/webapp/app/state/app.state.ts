import { courseReducer } from './course/course.reducer';
import { courseDetailsReducer } from './course/course.details.reducer';
import { sectionReducer } from './section/section.reducer';

export const appReducer = {
    courses: courseReducer,
    courseDetails: courseDetailsReducer,
    sections: sectionReducer
};
