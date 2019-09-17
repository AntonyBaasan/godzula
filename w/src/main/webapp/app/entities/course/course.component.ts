import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICourse } from 'app/shared/model/course.model';
import { AccountService } from 'app/core';
import { CourseService } from './course.service';

@Component({
    selector: 'jhi-course',
    templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit, OnDestroy {
    courses: ICourse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected courseService: CourseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.courseService.query().subscribe(
            (res: HttpResponse<ICourse[]>) => {
                this.courses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.sendGA('/entity/course.html');
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCourses();
    }

    private sendGA(pageUrl: string) {
        const w = <any>window;
        if (w && w.ga) {
            w.ga('set', 'page', pageUrl);
            w.ga('send', 'pageview');
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICourse) {
        return item.id;
    }

    registerChangeInCourses() {
        this.eventSubscriber = this.eventManager.subscribe('courseListModification', response => this.loadAll());
    }

    clone(course: ICourse) {
        const clone = _.cloneDeep(course);
        clone.id = undefined;
        clone.name = clone.name + ' (copy)';
        this.courseService.create(clone).subscribe(response => {
            this.courses.push(response.body);
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
