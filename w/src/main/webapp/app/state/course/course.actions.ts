import { Action } from '@ngrx/store';
import { ICourse } from '../../shared/model/course.model';
import { ISection } from 'app/shared/model/section.model';
import { ITask } from 'app/shared/model/task.model';

export enum CourseActionTypes {
    CourseLoad = '[Course Component] Load',
    CourseLoaded = '[Course Component] Loaded',
    CourseLoadFailed = '[Course Component] Loaded Failed',
    CourseDetailsLoad = '[Course Details Component] Load',
    CourseDetailsLoaded = '[Course Details Component] Loaded'
}

export class CourseLoad implements Action {
    readonly type = CourseActionTypes.CourseLoad;
}

export class CourseLoaded implements Action {
    readonly type = CourseActionTypes.CourseLoaded;
    constructor(public payload: ICourse[]) {}
}

export class CourseLoadFailed implements Action {
    readonly type = CourseActionTypes.CourseLoadFailed;
    constructor(public payload: any) {}
}

export class CourseDetailsLoad implements Action {
    readonly type = CourseActionTypes.CourseDetailsLoad;
    constructor(public payload: string) {}
}

export class CourseDetailsLoaded implements Action {
    readonly type = CourseActionTypes.CourseDetailsLoaded;
    constructor(public payload: ICourseDetails) {}
}

export type CourseActions = CourseLoad | CourseLoaded | CourseLoadFailed | CourseDetailsLoad | CourseDetailsLoaded;

export interface ICourseDetails {
    course: ICourse;
    sections: ISection[];
    tasks: ITask[];
}
