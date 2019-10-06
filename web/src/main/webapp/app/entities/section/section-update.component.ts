import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISection, Section } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

@Component({
    selector: 'jhi-section-update',
    templateUrl: './section-update.component.html'
})
export class SectionUpdateComponent implements OnInit {
    isSaving: boolean;

    courses: ICourse[];

    editForm = this.fb.group({
        id: [],
        name: [null, [Validators.required]],
        description: [],
        status: [],
        targetMachine: [],
        order: [],
        courseId: []
    });

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sectionService: SectionService,
        protected courseService: CourseService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ section }) => {
            this.updateForm(section);
        });
        this.courseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICourse[]>) => response.body)
            )
            .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    updateForm(section: ISection) {
        this.editForm.patchValue({
            id: section.id,
            name: section.name,
            description: section.description,
            status: section.status,
            targetMachine: section.targetMachine,
            order: section.order,
            courseId: section.courseId
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const section = this.createFromForm();
        if (section.id !== undefined) {
            this.subscribeToSaveResponse(this.sectionService.update(section));
        } else {
            this.subscribeToSaveResponse(this.sectionService.create(section));
        }
    }

    private createFromForm(): ISection {
        return {
            ...new Section(),
            id: this.editForm.get(['id']).value,
            name: this.editForm.get(['name']).value,
            description: this.editForm.get(['description']).value,
            status: this.editForm.get(['status']).value,
            targetMachine: this.editForm.get(['targetMachine']).value,
            order: this.editForm.get(['order']).value,
            courseId: this.editForm.get(['courseId']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISection>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCourseById(index: number, item: ICourse) {
        return item.id;
    }
}
