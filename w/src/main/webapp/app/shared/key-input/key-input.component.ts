import * as _ from 'lodash';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { KeyboardUtil } from '../util/keyboard-util';
import { InputKeyboard } from '../util/inputkeyboard.model';
import { KeyboardConfig } from '../util/keyboard-config';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'jhi-key-input',
    templateUrl: './key-input.component.html',
    styleUrls: ['./key-input.component.scss']
})
export class KeyInputComponent implements OnInit {
    @ViewChild('inputField') inputField: ElementRef;
    @Input() showClearButton = true;
    @Input() label = '';
    @Input() showHint = false;
    device: 'Win' | 'Mac' = 'Win';
    keyboardConfig: KeyboardConfig;
    hintAsStringArray: string[] = [];
    @Input() values: InputKeyboard[] = [];
    @Output() valuesChanged: EventEmitter<InputKeyboard[]> = new EventEmitter();
    @Input() isCompact = false;

    inputText: String[] = [];
    hint: InputKeyboard[] = [];

    constructor(private keyboardUtil: KeyboardUtil, private deviceDetectorService: DeviceDetectorService) {}

    @Input()
    public set Hint(hint: InputKeyboard[]) {
        this.hint = hint;
        this.setupKeyboardUtil();
        this.updateHintString();
    }
    updateHintString() {
        if (this.hint) {
            this.hintAsStringArray = this.keyboardUtil.keyToString(this.hint);
        } else {
            this.hintAsStringArray = [];
        }
    }
    @Input()
    public set Device(device: 'Win' | 'Mac') {
        this.device = device;
        this.setupKeyboardUtil();
        this.updateHintString();
    }

    ngOnInit() {
        this.setupKeyboardUtil();
        this.updateInput();
    }

    setupKeyboardUtil() {
        // console.log(this.device);
        // console.log(this.getHintAsText());
        // this.keyboardConfig = { os: this.deviceDetectorService.os };
        this.keyboardConfig = { os: this.device };
        this.keyboardUtil.configure(this.keyboardConfig);
    }

    focus(): void {
        console.log('focus called');
        this.inputField.nativeElement.focus();
    }

    public getHintAsText() {
        const hint = this.hintAsStringArray.toString();
        const input = this.inputText.toString();
        if (hint.startsWith(input)) {
            return this.hintAsStringArray.toString();
        }
        return '';
    }

    public getCurrentAsText(): string {
        return this.inputText.toString();
    }

    public getValues(): InputKeyboard[] {
        return this.values;
    }

    public clear() {
        this.values = [];
        this.updateValue();
        this.inputField.nativeElement.focus();
    }

    private updateInput() {
        this.inputText = this.keyboardUtil.keyToString(this.values);
    }
    private updateValue() {
        this.updateInput();
        this.valuesChanged.emit(this.values);
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.keyboardUtil.shouldIgnore(event)) {
            return;
        }

        this.values.push({
            keyCode: event.keyCode,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            metaKey: event.metaKey
        } as InputKeyboard);

        this.updateValue();

        console.log('down:', event);

        event.stopPropagation();
        event.preventDefault();
    }
}
