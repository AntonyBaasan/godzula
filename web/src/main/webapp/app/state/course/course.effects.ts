import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CourseActionTypes, CourseDetailsLoad, CourseLoadFailed } from './course.actions';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PublicCourseService } from 'app/entities/course/pubilc-course.service';

@Injectable()
export class CourseEffects {
    @Effect()
    loadCourses$ = this.actions$.pipe(
        ofType(CourseActionTypes.CourseLoad),
        mergeMap(() =>
            this.publicCourseSerivce.getAllCourses().pipe(
                map(res => ({
                    type: CourseActionTypes.CourseLoaded,
                    payload: res.body
                })),
                catchError((err: HttpErrorResponse) =>
                    of({
                        type: CourseActionTypes.CourseLoadFailed,
                        payload: err
                    })
                )
            )
        )
    );

    @Effect()
    loadCourseDetail$ = this.actions$.pipe(
        ofType<CourseDetailsLoad>(CourseActionTypes.CourseDetailsLoad),
        mergeMap(action =>
            this.publicCourseSerivce.getCourse(action.payload).pipe(
                map(res => ({
                    type: CourseActionTypes.CourseDetailsLoaded,
                    payload: {
                        course: res.body.course,
                        sections: res.body.sections
                    }
                })),
                catchError((err: HttpErrorResponse) =>
                    of({
                        type: CourseActionTypes.CourseLoadFailed,
                        payload: err
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private publicCourseSerivce: PublicCourseService,
        private deviceDetectorService: DeviceDetectorService
    ) {}
}
