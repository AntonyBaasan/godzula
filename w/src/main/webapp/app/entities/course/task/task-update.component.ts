import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { InputKeyboard } from 'app/shared/util/inputkeyboard.model';

@Component({
    selector: 'jhi-task-update',
    templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
    @Input() tasks: ITask[];
    @Output() onRemoveTask: EventEmitter<ITask> = new EventEmitter();

    constructor(protected taskService: TaskService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {}

    remove(task: ITask) {
        this.onRemoveTask.emit(task);
    }

    onAnswerChanged(values: InputKeyboard[], task: ITask) {
        task.answer = JSON.stringify(values);
    }

    stringToValue(valueAsString: string): InputKeyboard[] {
        if (valueAsString) {
            return JSON.parse(valueAsString);
        }
        return [];
    }
}
