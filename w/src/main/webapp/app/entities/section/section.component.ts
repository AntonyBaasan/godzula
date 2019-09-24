import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISection } from 'app/shared/model/section.model';
import { AccountService } from 'app/core/auth/account.service';
import { SectionService } from './section.service';

@Component({
    selector: 'jhi-section',
    templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit, OnDestroy {
    sections: ISection[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sectionService: SectionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
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
        this.registerChangeInSections();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISection) {
        return item.id;
    }

    registerChangeInSections() {
        this.eventSubscriber = this.eventManager.subscribe('sectionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
