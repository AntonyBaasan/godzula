import { MachineType } from './section.model';

export const enum TaskType {
    SHORTCUT = 'SHORTCUT',
    TEXT = 'TEXT'
}

export interface ITask {
    id?: string;
    question?: string;
    description?: string;
    answer?: string;
    type?: TaskType;
    targetMachine?: MachineType;
}

export class Task implements ITask {
    constructor(
        public id?: string,
        public question?: string,
        public description?: string,
        public answer?: string,
        public type?: TaskType,
        public targetMachine?: MachineType
    ) {}
}
