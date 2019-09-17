import { CourseActionTypes, CourseActions } from './course.actions';
import { ICourse } from '../../shared/model/course.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export function courseDetailsReducer(state = initialState, action: CourseActions) {
    switch (action.type) {
        case CourseActionTypes.CourseDetailsLoaded:
            const newState = courseDetailsAdapter.addOne(action.payload.course, state);
            // clear error
            newState.error = null;
            return newState;
        case CourseActionTypes.CourseLoadFailed:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export interface CourseDetailsState extends EntityState<ICourse> {
    // additional entities state properties
    error: any | null;
}

export const courseDetailsAdapter: EntityAdapter<ICourse> = createEntityAdapter<ICourse>({});

export const initialState: CourseDetailsState = courseDetailsAdapter.getInitialState({
    // additional entity state properties
    error: null
});
