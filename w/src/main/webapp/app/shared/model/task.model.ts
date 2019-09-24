import { TaskType } from 'app/shared/model/enumerations/task-type.model';
import { MachineType } from 'app/shared/model/enumerations/machine-type.model';

export interface ITask {
    id?: string;
    question?: string;
    description?: string;
    answer?: string;
    type?: TaskType;
    targetMachine?: MachineType;
    sectionId?: string;
}

export class Task implements ITask {
    constructor(
        public id?: string,
        public question?: string,
        public description?: string,
        public answer?: string,
        public type?: TaskType,
        public targetMachine?: MachineType,
        public sectionId?: string
    ) {}
}
