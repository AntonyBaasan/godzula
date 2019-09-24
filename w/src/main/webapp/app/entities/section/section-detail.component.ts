import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISection } from 'app/shared/model/section.model';

@Component({
    selector: 'jhi-section-detail',
    templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent implements OnInit {
    section: ISection;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ section }) => {
            this.section = section;
        });
    }

    previousState() {
        window.history.back();
    }
}
