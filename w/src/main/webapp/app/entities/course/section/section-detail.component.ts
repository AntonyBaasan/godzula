import { Component, OnInit, Input } from '@angular/core';

import { ISection } from 'app/shared/model/section.model';

@Component({
    selector: 'jhi-section-detail',
    templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent implements OnInit {
    @Input() section: ISection;
    showTasks: boolean;

    ngOnInit() {}

    toggleTasks() {
        this.showTasks = !this.showTasks;
    }

    getTaskCount() {
        if (this.section && this.section.tasks) {
            return this.section.tasks.length;
        }
        return 0;
    }
}
