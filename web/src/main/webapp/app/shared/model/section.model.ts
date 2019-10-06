import { ITask } from 'app/shared/model/task.model';
import { SectionStatus } from 'app/shared/model/enumerations/section-status.model';
import { MachineType } from 'app/shared/model/enumerations/machine-type.model';

export interface ISection {
    id?: string;
    name?: string;
    description?: string;
    status?: SectionStatus;
    targetMachine?: MachineType;
    order?: number;
    tasks?: ITask[];
    courseId?: string;
}

export class Section implements ISection {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public status?: SectionStatus,
        public targetMachine?: MachineType,
        public order?: number,
        public tasks?: ITask[],
        public courseId?: string
    ) {}
}
