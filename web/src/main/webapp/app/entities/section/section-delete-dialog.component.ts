import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISection } from 'app/shared/model/section.model';
import { SectionService } from './section.service';

@Component({
    selector: 'jhi-section-delete-dialog',
    templateUrl: './section-delete-dialog.component.html'
})
export class SectionDeleteDialogComponent {
    section: ISection;

    constructor(protected sectionService: SectionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.sectionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sectionListModification',
                content: 'Deleted an section'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-section-delete-popup',
    template: ''
})
export class SectionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ section }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SectionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.section = section;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/section', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/section', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
