import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { AccountService } from 'app/core/auth/account.service';
import { TaskService } from './task.service';
import { KeyboardUtil } from 'app/shared/util/keyboard-util';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SectionService } from '../section/section.service';
import { CourseService } from '../course/course.service';
import { ICourse } from 'app/shared/model/course.model';
import { ISection } from 'app/shared/model/section.model';

@Component({
    selector: 'jhi-task',
    templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit, OnDestroy {
    courses: ICourse[];
    sections: ISection[];
    tasks: ITask[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected taskService: TaskService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected sectionService: SectionService,
        protected courseService: CourseService,
        private keyboardUtil: KeyboardUtil,
        private deviceDetectorService: DeviceDetectorService
    ) {
        this.keyboardUtil.configure({ os: this.deviceDetectorService.getDeviceInfo().os });
    }

    loadAll() {
        this.taskService
            .query()
            .pipe(
                filter((res: HttpResponse<ITask[]>) => res.ok),
                map((res: HttpResponse<ITask[]>) => res.body)
            )
            .subscribe(
                (res: ITask[]) => {
                    this.tasks = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.courseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICourse[]>) => response.body)
            )
            .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.sectionService
            .query()
            .pipe(
                filter((res: HttpResponse<ISection[]>) => res.ok),
                map((res: HttpResponse<ISection[]>) => res.body)
            )
            .subscribe(
                (res: ISection[]) => {
                    this.sections = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITask) {
        return item.id;
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', response => this.loadAll());
    }

    getAnswerAsShortCut(answer: string) {
        if (!answer) {
            return '';
        }
        return this.keyboardUtil.keyToString(JSON.parse(answer));
    }

    getSectionNameById(sectionId: string) {
        return this.sectionService.getSectionNameById(this.sections, sectionId);
    }

    getCourseNameBySectionId(sectionId: string) {
        if (!this.courses || !this.sections) {
            return '';
        }

        const section = this.sections.find(c => c.id === sectionId);
        if (!section && section === sectionId) {
            return '';
        }
        const course = this.courses.find(c => c.id === section);
        return course ? course.name : '';
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
