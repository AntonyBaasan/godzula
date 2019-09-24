import { ISection } from 'app/shared/model/section.model';
import { CourseStatus } from 'app/shared/model/enumerations/course-status.model';

export interface ICourse {
    id?: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    status?: CourseStatus;
    sections?: ISection[];
}

export class Course implements ICourse {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public imageUrl?: string,
        public status?: CourseStatus,
        public sections?: ISection[]
    ) {}
}
