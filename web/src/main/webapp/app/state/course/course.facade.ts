import { ICourse } from '../../shared/model/course.model';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseLoad, CourseDetailsLoad } from './course.actions';
import { Injectable } from '@angular/core';
import { CourseState, courseAdapter } from './course.reducer';
import { CourseDetailsState, courseDetailsAdapter } from './course.details.reducer';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CourseStateFacade {
    constructor(private store: Store<ICourse[] | ICourse>) {}

    public GetCourseList(): Observable<ICourse[]> {
        return this.store.select(selectAllCourses).pipe(
            // during selection: if course is not loaded yet, do fetch from server
            tap(courses => {
                if (!courses.length) {
                    this.store.dispatch(new CourseLoad());
                }
            })
        );
    }

    public GetCourseInfo(id: string): Observable<ICourse> {
        // return this.store.select(selectCourseInfo, { id });
        return this.store.select(selectCourseInfo, { id }).pipe(
            tap(course => {
                if (course == null) {
                    this.store.dispatch(new CourseDetailsLoad(id));
                }
            })
        );
    }

    public LoadCourseInfo(id: string) {
        this.store.dispatch(new CourseDetailsLoad(id));
    }

    public LoadCourseDetailError(): Observable<any> {
        return this.store.select(selectCourseDetailError);
    }
}

export const selectCourseState = createFeatureSelector<CourseState>('courses');
export const selectCourseInfoState = createFeatureSelector<CourseDetailsState>('courseDetails');

// get the selectors
const { selectAll } = courseAdapter.getSelectors();
const { selectEntities } = courseDetailsAdapter.getSelectors();

export const selectAllCourses = createSelector(
    selectCourseState,
    selectAll
);

// export const selectFeature = createFeatureSelector<AppState, FeatureState>('feature');

export const selectCourseInfo = createSelector(
    selectCourseInfoState,
    (state, props) => (state == null || state.entities == null ? null : state.entities[props.id])
);

export const selectCourseDetailError = createSelector(
    selectCourseInfoState,
    state => state.error
);
