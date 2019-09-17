import { Action } from '@ngrx/store';
import { ISection } from 'app/shared/model/section.model';

export enum SectionActionTypes {
    SelectSection = '[Course Component] SelectSection'
}

export class SectionSelect implements Action {
    readonly type = SectionActionTypes.SelectSection;
    constructor(public payload: ISection[]) {}
}

export type SectionActions = SectionSelect;
