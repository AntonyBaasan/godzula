import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';

@Component({
    selector: 'jhi-course-update',
    templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
    isSaving: boolean;

    editForm = this.fb.group({
        id: [],
        name: [null, [Validators.required]],
        description: [],
        imageUrl: [],
        status: []
    });

    constructor(protected courseService: CourseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ course }) => {
            this.updateForm(course);
        });
    }

    updateForm(course: ICourse) {
        this.editForm.patchValue({
            id: course.id,
            name: course.name,
            description: course.description,
            imageUrl: course.imageUrl,
            status: course.status
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const course = this.createFromForm();
        if (course.id !== undefined) {
            this.subscribeToSaveResponse(this.courseService.update(course));
        } else {
            this.subscribeToSaveResponse(this.courseService.create(course));
        }
    }

    private createFromForm(): ICourse {
        return {
            ...new Course(),
            id: this.editForm.get(['id']).value,
            name: this.editForm.get(['name']).value,
            description: this.editForm.get(['description']).value,
            imageUrl: this.editForm.get(['imageUrl']).value,
            status: this.editForm.get(['status']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
