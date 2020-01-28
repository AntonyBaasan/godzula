import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section/section.service';
import { InputKeyboard } from 'app/shared/util/inputkeyboard.model';

@Component({
    selector: 'jhi-task-update',
    templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
    isSaving: boolean;

    sections: ISection[];

    editForm = this.fb.group({
        id: [],
        question: [null, [Validators.required]],
        description: [],
        answer: [],
        type: [],
        targetMachine: [],
        sectionId: []
    });

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taskService: TaskService,
        protected sectionService: SectionService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.updateForm(task);
        });
        this.sectionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISection[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISection[]>) => response.body)
            )
            .subscribe((res: ISection[]) => (this.sections = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    updateForm(task: ITask) {
        this.editForm.patchValue({
            id: task.id,
            question: task.question,
            description: task.description,
            answer: task.answer ? JSON.parse(task.answer) : [],
            type: task.type,
            targetMachine: task.targetMachine,
            sectionId: task.sectionId
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const task = this.createFromForm();
        if (task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(task));
        }
    }

    private createFromForm(): ITask {
        return {
            ...new Task(),
            id: this.editForm.get(['id']).value,
            question: this.editForm.get(['question']).value,
            description: this.editForm.get(['description']).value,
            answer: JSON.stringify(this.editForm.get(['answer']).value),
            type: this.editForm.get(['type']).value,
            targetMachine: this.editForm.get(['targetMachine']).value,
            sectionId: this.editForm.get(['sectionId']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
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

    trackSectionById(index: number, item: ISection) {
        return item.id;
    }
    onKeyInput(keys: InputKeyboard[]) {
        console.log(keys);
        this.editForm.get(['answer']).setValue(keys);
    }
    getValues() {
        if (this.editForm.get(['answer']).value) {
            return this.editForm.get(['answer']).value;
        }
        return [];
    }
}
