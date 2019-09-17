import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { AccountService } from 'app/core';
import { TaskService } from './task.service';

@Component({
    selector: 'jhi-task',
    templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit, OnDestroy {
    tasks: ITask[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected taskService: TaskService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.taskService.query().subscribe(
            (res: HttpResponse<ITask[]>) => {
                this.tasks = res.body;
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
