import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CourseService } from '../../entities/course/course.service';
import { CourseActionTypes, CourseDetailsLoad, CourseLoadFailed } from './course.actions';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as _ from 'lodash';

@Injectable()
export class CourseEffects {
    @Effect()
    loadCourses$ = this.actions$.pipe(
        ofType(CourseActionTypes.CourseLoad),
        mergeMap(() =>
            this.courseSerivce.queryMetadata().pipe(
                // this.courseSerivce.query().pipe(
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
            this.courseSerivce.find(action.payload).pipe(
                map(res => ({
                    type: CourseActionTypes.CourseDetailsLoaded,
                    payload: {
                        course: res.body
                        // sections: res.body.sections,
                        // tasks: res.body.sections.reduce((acc, obj) => {
                        //     return acc.concat(obj.tasks);
                        // }, [])
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

    constructor(private actions$: Actions, private courseSerivce: CourseService, private deviceDetectorService: DeviceDetectorService) {}
}
