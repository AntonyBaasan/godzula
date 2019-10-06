import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISection } from 'app/shared/model/section.model';

export interface SectionListItem {
    section: ISection;
    passed: boolean;
}

@Component({
    selector: 'jhi-section-list',
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
    @Input() selectedItem: SectionListItem;
    @Input() sectionListItem: SectionListItem[];
    @Output() SectionSelect: EventEmitter<SectionListItem> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    selectSection(section: SectionListItem) {
        this.SectionSelect.emit(section);
    }

    isSelectedItem(item: SectionListItem) {
        return item.section.id.localeCompare(this.selectedItem.section.id) === 0;
    }
}
