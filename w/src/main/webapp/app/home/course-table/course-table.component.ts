import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'app/entities/course';
import { ICourse } from '../../shared/model/course.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CourseStateFacade } from '../../state/course/course.facade';

@Component({
    selector: 'jhi-course-table',
    templateUrl: './course-table.component.html',
    styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent implements OnInit {
    showWin = true;
    showMac = true;
    courses$: Observable<ICourse[]>;

    constructor(
        protected courseService: CourseService,
        private deviceDetectorService: DeviceDetectorService,
        protected courseState: CourseStateFacade
    ) {
        this.courses$ = courseState.GetCourseList();
    }

    ngOnInit() {
        this.updateShowButtons(this.deviceDetectorService.os);
    }

    updateShowButtons(os: string) {
        // for Mac OS
        this.showMac = os === 'Mac';
        // any other device than Mac OS
        this.showWin = os !== 'Mac';
    }
}
