import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'app/entities/course/course.service';
import { ICourse } from '../../shared/model/course.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CourseStateFacade } from '../../state/course/course.facade';

@Component({
    selector: 'jhi-course-table',
    templateUrl: './course-table.component.html',
    styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent implements OnInit {
    courses$: Observable<ICourse[]>;

    constructor(
        protected courseService: CourseService,
        private deviceDetectorService: DeviceDetectorService,
        protected courseState: CourseStateFacade
    ) {
        this.courses$ = courseState.GetCourseList();
    }

    ngOnInit() {
        console.log(this.deviceDetectorService.os);
    }
}
