import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISection } from 'app/shared/model/section.model';
import { CourseService } from '../course/course.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ICourse } from 'app/shared/model/course.model';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-section-detail',
    templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent implements OnInit {
    section: ISection;
    course: ICourse;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        protected courseService: CourseService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ section }) => {
            this.section = section;
            this.courseService
                .find(this.section.courseId)
                .pipe(
                    filter((res: HttpResponse<ICourse>) => res.ok),
                    map((res: HttpResponse<ICourse>) => res.body)
                )
                .subscribe(
                    (res: ICourse) => {
                        this.course = res;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        });
    }

    previousState() {
        window.history.back();
    }

    getCourseNameById(courseId: string) {
        return this.course ? this.course.name : courseId;
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
