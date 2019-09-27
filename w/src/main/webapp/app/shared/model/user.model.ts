export const enum TaskType {
    SHORTCUT = 'SHORTCUT',
    TEXT = 'TEXT'
}

export interface IUser {
    id?: string;
}

export class User implements IUser {
    constructor(public id?: string) {}
}
