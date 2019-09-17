import { ISection, MachineType } from 'app/shared/model/section.model';
import { CourseStatus } from 'app/shared/enum/course-status';

export interface ICourse {
    id?: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    status?: CourseStatus;
    sections?: ISection[];
    targetMachine?: MachineType;
}

export class Course implements ICourse {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public imageUrl?: string,
        public status?: CourseStatus,
        public sections?: ISection[],
        public targetMachine?: MachineType
    ) {}
}
