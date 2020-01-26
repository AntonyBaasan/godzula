import { Action } from '@ngrx/store';
import { ISection } from 'app/shared/model/section.model';

export enum SectionActionTypes {
    SelectSection = '[Course Component] SelectSection',
    SectionsLoad = '[Course Component] SectionsLoad',
    SectionsLoaded = '[Course Component] SectionsLoaded'
}

export class SectionSelect implements Action {
    readonly type = SectionActionTypes.SelectSection;
    constructor(public payload: ISection[]) {}
}

export class SectionsLoad implements Action {
    readonly type = SectionActionTypes.SectionsLoad;
    constructor(public payload: number) {}
}

export class SectionsLoaded implements Action {
    readonly type = SectionActionTypes.SectionsLoaded;
    constructor(public payload: ISection[]) {}
}

export type SectionActions = SectionSelect | SectionsLoad | SectionsLoaded;
