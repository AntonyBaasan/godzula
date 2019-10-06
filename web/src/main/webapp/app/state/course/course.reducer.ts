import { CourseActionTypes, CourseActions } from './course.actions';
import { ICourse } from '../../shared/model/course.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface CourseState extends EntityState<ICourse> {
    // additional entities state properties
    selectedCourseId: number | null;
    selectedSectionId: number | null;
}

export const courseAdapter: EntityAdapter<ICourse> = createEntityAdapter<ICourse>({});

export const initialState: CourseState = courseAdapter.getInitialState({
    // additional entity state properties
    selectedCourseId: null,
    selectedSectionId: null
});

export function courseReducer(state = initialState, action: CourseActions) {
    switch (action.type) {
        case CourseActionTypes.CourseLoaded:
            return courseAdapter.addMany(action.payload, state);
        default:
            return state;
    }
}
