import * as _ from 'lodash';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { ISection } from 'app/shared/model/section.model';
import { IdGeneratorService } from 'app/shared/util/id-generator.service';
import { ITask } from 'app/shared/model/task.model';

@Component({
    selector: 'jhi-section-update',
    templateUrl: './section-update.component.html',
    styleUrls: ['./section-update.component.scss']
})
export class SectionUpdateComponent implements OnInit {
    @Input() sections: ISection[];
    @Output() onRemoveSection: EventEmitter<ISection> = new EventEmitter();
    @Output() onDuplicateSection: EventEmitter<ISection> = new EventEmitter();
    showTasks: boolean;
    currentSection: ISection = { name: '' };

    constructor(private idGeneratorService: IdGeneratorService) {}

    ngOnInit(): void {
        this.sections = this.applyOrderIntoArray(this.sections);
        // add missing order numbers if any
        _.forEach(this.sections, (s: ISection, i: number) => {
            s.order = i;
        });
        this.sections = this.applyOrderIntoArray(this.sections);
    }

    duplicate(section: ISection) {
        this.onDuplicateSection.emit(section);
    }

    toggleTasks() {
        this.showTasks = !this.showTasks;
    }

    remove(section: ISection) {
        this.onRemoveSection.emit(section);
    }

    addNewTask(section: ISection) {
        if (!section.tasks) {
            section.tasks = [];
        }
        section.tasks.push({
            id: this.idGeneratorService.generateNewId()
        } as ITask);
    }

    getTaskCount(section: ISection) {
        if (section && section.tasks) {
            return section.tasks.length;
        }
        return 0;
    }

    getTasks(section: ISection) {
        if (section) {
            return section.tasks;
        }
        return [];
    }

    openTasks(section: ISection) {
        this.currentSection = section;
    }

    removeTask(task: ITask) {
        const index = this.currentSection.tasks.indexOf(task);
        if (index !== -1) {
            this.currentSection.tasks.splice(index, 1);
        }
    }

    public orderUp(section: ISection) {
        if (section.order < this.sections.length - 1) {
            section.order++;
            this.sections[section.order].order--;
            this.sections = this.applyOrderIntoArray(this.sections);
        }
    }

    public orderDown(section: ISection) {
        if (section.order > 0) {
            section.order--;
            this.sections[section.order].order++;
            this.sections = this.applyOrderIntoArray(this.sections);
        }
    }

    private applyOrderIntoArray(sections: ISection[]) {
        return _.orderBy(sections, ['order'], ['asc'], null);
    }
}
