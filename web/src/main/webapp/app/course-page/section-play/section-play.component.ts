import * as _ from 'lodash';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { InputKeyboard } from 'app/shared/util/inputkeyboard.model';
import { KeyboardUtil } from 'app/shared/util/keyboard-util';
import { KeyInputComponent } from 'app/shared/key-input/key-input.component';
import { SectionListItem } from '../section-list/section-list.component';
import { ITask } from 'app/shared/model/task.model';
import { DeviceDetectorService } from 'ngx-device-detector';

interface TaskToCheck {
    task: ITask;
    done: boolean;
}

interface HistoryItem {
    question: string;
    inputAnswer: string;
    expectedAnswer: string;
    isCorrect: boolean;
}

@Component({
    selector: 'jhi-section-play',
    templateUrl: './section-play.component.html',
    styleUrls: ['./section-play.component.scss']
})
export class SectionPlayComponent implements OnInit {
    @Output() SectionPassed: EventEmitter<any> = new EventEmitter();
    @Output() Next: EventEmitter<void> = new EventEmitter();
    @ViewChild('keyInputField') keyInputField: KeyInputComponent;
    @Input() showHint = true;
    device: 'Win' | 'Mac';
    tasksToCheck: TaskToCheck[] = [];
    public sectionItem: SectionListItem;
    private currentIndex = 0;

    values: InputKeyboard[] = [];
    history: HistoryItem[] = [];
    allCount: number;
    doneCount: number;

    constructor(private keyboardUtil: KeyboardUtil, private deviceDetectorService: DeviceDetectorService) {}

    @Input()
    set Device(device: 'Win' | 'Mac') {
        this.device = device;
        this.setupKeyboardUtil();
    }

    ngOnInit() {}

    next() {
        this.Next.emit();
    }

    restart() {
        this.sectionItem.passed = false;

        this.refresh();
    }

    refresh() {
        this.shuffleAndSetKeysToCheck();
        this.history = [];

        this.allCount = this.tasksToCheck.length;
        this.doneCount = 0;
    }

    isPassed() {
        if (this.sectionItem && this.sectionItem.passed) {
            return true;
        }
        return false;
    }

    @Input()
    public set SectionItem(sectionListItem: SectionListItem) {
        this.sectionItem = sectionListItem;
        this.shuffleTasks();
        this.refresh();
        if (this.keyInputField) {
            this.keyInputField.focus();
        }
    }

    private shuffleTasks() {
        let tasks = this.sectionItem.section.tasks;
        tasks = _.shuffle(tasks);
        this.sectionItem.section.tasks = tasks;
    }

    private setupKeyboardUtil() {
        // const deviceInfo = this.deviceDetectorService.getDeviceInfo();
        console.log(this.device);
        this.keyboardUtil.configure({ os: this.device });
    }

    private shuffleAndSetKeysToCheck() {
        if (this.SectionItem) {
            this.tasksToCheck = _.map(this.SectionItem.section.tasks, (task: ITask) => ({ task, done: false }));
        } else {
            this.tasksToCheck = [];
        }
    }

    public get SectionItem(): SectionListItem {
        return this.sectionItem;
    }

    public getCurrentTask(): TaskToCheck {
        return this.getUndoneTasks()[this.currentIndex];
    }

    public getCurrentQuestion(): string {
        const taskToCheck = this.getCurrentTask();
        if (taskToCheck && taskToCheck.task) {
            return taskToCheck.task.question || '';
        }

        return '';
    }

    getUndoneTasks() {
        return _.filter(this.tasksToCheck, { done: false });
    }

    onValuesChanged(values: InputKeyboard[]) {
        this.values = values;
        if (this.values && this.values.length > 0) {
            this.check();
        }
    }

    private check() {
        const correctAnswer = this.getCurrentAnswer();

        if (this.values.length < correctAnswer.length) {
            return;
        }

        const isCorrect = this.compare(this.values, correctAnswer);

        this.insertInHistory(this.getCurrentQuestion(), this.values, correctAnswer, isCorrect);

        this.gotoNextAnswer(isCorrect);

        this.clearInputField();

        if (this.isSectionPassed()) {
            this.sectionItem.passed = true;
            this.SectionPassed.emit();
        }
    }

    private clearInputField() {
        this.keyInputField.clear();
    }

    private insertInHistory(question: string, answer: InputKeyboard[], correctAnswer: InputKeyboard[], isCorrect: boolean) {
        const inputAnswer = this.keyboardUtil.keyToString(answer).toString();
        const expectedAnswer = this.keyboardUtil.keyToString(correctAnswer).toString();
        this.history.unshift({
            question,
            inputAnswer,
            expectedAnswer,
            isCorrect
        });
    }

    private gotoNextAnswer(isCorrect: any): any {
        let nextIndex = this.currentIndex;
        if (isCorrect) {
            this.doneCount++;
            this.tasksToCheck.splice(this.currentIndex, 1);
        } else {
            nextIndex = this.currentIndex + 1;
        }
        this.currentIndex = this.tasksToCheck.length <= nextIndex ? 0 : nextIndex;
    }

    public getCurrentAnswer(): InputKeyboard[] {
        // this could be optimized
        const answer = this.getCurrentTask().task.answer;
        if (answer) {
            return JSON.parse(answer);
        }

        return [];
    }

    private compare(values1: InputKeyboard[], values2: InputKeyboard[]) {
        return _.isEqual(values1, values2);
    }

    private isSectionPassed() {
        if (this.tasksToCheck.length === 0) {
            return true;
        }
        return false;
    }
}
