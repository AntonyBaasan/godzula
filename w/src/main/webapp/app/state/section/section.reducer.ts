import { CourseActionTypes, CourseActions } from './../course/course.actions';
import { SectionActionTypes, SectionActions } from './section.actions';
import { ISection } from '../../shared/model/section.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface SectionState extends EntityState<ISection> {
    selectedSection: ISection;
}

export const sectionAdapter: EntityAdapter<ISection> = createEntityAdapter<ISection>({});

export const initialState: SectionState = sectionAdapter.getInitialState({
    selectedSection: null
});
export function sectionReducer(state = initialState, action: CourseActions | SectionActions) {
    switch (action.type) {
        case CourseActionTypes.CourseDetailsLoaded:
            const sections = action.payload.sections;
            // return sectionAdapter.addMany(sections, state);
            state = sectionAdapter.removeAll(state);
            const newState = sectionAdapter.addMany(sections, state);
            return newState;
        case SectionActionTypes.SelectSection:
            const selectedSection = action.payload;
            return { ...state, selectedSection };
        default:
            return state;
    }
}
