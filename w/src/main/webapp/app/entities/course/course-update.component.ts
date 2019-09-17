import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { ISection } from 'app/shared/model/section.model';
import { IdGeneratorService } from 'app/shared/util/id-generator.service';

@Component({
    selector: 'jhi-course-update',
    templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
    course: ICourse;
    isSaving: boolean;
    showSections = true;

    constructor(
        protected courseService: CourseService,
        protected activatedRoute: ActivatedRoute,
        private idGenService: IdGeneratorService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(this.courseService.create(this.course));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>) {
        result.subscribe((res: HttpResponse<ICourse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    toggleSections() {
        this.showSections = !this.showSections;
    }

    addNewSection() {
        if (!this.course.sections) {
            this.course.sections = [];
        }
        const len = this.course.sections.length;
        this.course.sections.push({
            id: this.idGenService.generateNewId(),
            order: len
        } as ISection);
        // update array in order to detect ng changes
        this.course.sections = [...this.course.sections];
    }
    duplicateSection(section: ISection) {
        const newSection = _.cloneDeep(section);
        newSection.id = this.idGenService.generateNewId();
        this.course.sections.push(newSection);
        this.course.sections = [...this.course.sections];
    }
    removeSection(section: ISection) {
        const index = this.course.sections.indexOf(section);
        if (index !== -1) {
            this.course.sections.splice(index, 1);
        }
    }
    getSectionCount() {
        if (this.course && this.course.sections) {
            return this.course.sections.length;
        }
        return 0;
    }
}
