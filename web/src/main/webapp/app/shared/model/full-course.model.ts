import { ISection } from 'app/shared/model/section.model';
import { CourseStatus } from 'app/shared/model/enumerations/course-status.model';
import { ICourse } from './course.model';
import { ITask } from './task.model';

export interface IFullCourseDTO {
    course: ICourse;
    sections: Array<ISection>;
}

export class FullCourseDTO implements IFullCourseDTO {
    course: ICourse;
    sections: ISection[];
    tasks: ITask[];
}
