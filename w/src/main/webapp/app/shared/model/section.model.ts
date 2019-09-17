import { ITask } from './task.model';

export const enum MachineType {
    ANY = 'ANY',
    WIN = 'WIN',
    MAC = 'MAC'
}

export const enum SectionStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED'
}

export interface ISection {
    id?: string;
    name?: string;
    description?: string;
    status?: SectionStatus;
    targetMachine?: MachineType;
    tasks?: ITask[];
    order?: number;
}

export class Section implements ISection {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public status?: SectionStatus,
        public targetMachine?: MachineType,
        public tasks?: ITask[],
        public order?: number
    ) {}
}
