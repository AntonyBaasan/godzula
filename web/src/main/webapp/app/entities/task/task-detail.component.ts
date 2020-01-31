import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITask } from 'app/shared/model/task.model';
import { SectionService } from '../section/section.service';
import { ISection } from 'app/shared/model/section.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-task-detail',
    templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {
    task: ITask;
    section: ISection;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        private sectionService: SectionService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
            this.sectionService
                .find(this.task.sectionId)
                .pipe(
                    filter((res: HttpResponse<ISection>) => res.ok),
                    map((res: HttpResponse<ISection>) => res.body)
                )
                .subscribe(
                    (res: ISection) => {
                        this.section = res;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        });
    }

    previousState() {
        window.history.back();
    }

    getSectionNameById(sectionId: string) {
        return this.section ? this.section.name : sectionId;
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
