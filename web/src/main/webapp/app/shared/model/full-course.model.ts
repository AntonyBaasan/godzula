import { ISection } from 'app/shared/model/section.model';
import { CourseStatus } from 'app/shared/model/enumerations/course-status.model';
import { ICourse } from './course.model';

export interface IFullCourse {
    course: ICourse;
    sections: Array<ISection>;
}

export class FullCourse implements IFullCourse {
    course: ICourse;
    sections: ISection[];
}
