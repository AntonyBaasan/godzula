/**
 * Angular bootstrap Date adapter
 */
import * as Keycode from 'keycode';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Key } from 'ts-keycode-enum';
import { InputKeyboard } from './inputkeyboard.model';

import { DeviceDetectorService } from 'ngx-device-detector';
import { KeyboardConfig } from './keyboard-config';

@Injectable()
export class KeyboardUtil {
    private convertor: IKeyToStringConvertor;

    // Key.LeftWindowKey - this is mac CMD key too
    private supportKeys: Number[] = [Key.Ctrl, Key.Shift, Key.LeftWindowKey, Key.Alt, Key.CapsLock];
    private config: KeyboardConfig;
    constructor() {}

    configure(config: KeyboardConfig) {
        this.config = config;
        this.createKeyStringConvertor();
    }
    createKeyStringConvertor() {
        this.convertor = this.config.os === 'Mac' ? new MacKeyToStringConvertor() : new WinKeyToStringConvertor();
    }

    shouldIgnore(keyEvent: InputKeyboard): boolean {
        if (this.supportKeys.indexOf(keyEvent.keyCode) !== -1) {
            return true;
        }
        return false;
    }

    keyToString(keyEvent: InputKeyboard | InputKeyboard[]): string[] {
        if (_.isNil(keyEvent) || this.convertor === undefined) {
            return [];
        }
        if (_.isArray(keyEvent)) {
            return _.map(keyEvent, (c: InputKeyboard) => this.convertor.keyToString(c));
        }

        return [this.convertor.keyToString(keyEvent as InputKeyboard)];
    }
}

interface IKeyToStringConvertor {
    keyToString(keyEvent: InputKeyboard): string;
}
class WinKeyToStringConvertor implements IKeyToStringConvertor {
    keyToString(keyEvent: InputKeyboard): string {
        let result = Keycode.names[keyEvent.keyCode].toUpperCase();
        if (keyEvent.shiftKey === true) {
            result = 'Shift+' + result;
        }
        if (keyEvent.altKey === true) {
            result = 'Alt+' + result;
        }
        if (keyEvent.ctrlKey === true) {
            result = 'Ctrl+' + result;
        }
        if (keyEvent.metaKey === true) {
            result = 'Win+' + result;
        }
        return result;
    }
}
class MacKeyToStringConvertor implements IKeyToStringConvertor {
    keyToString(keyEvent: InputKeyboard): string {
        let result = Keycode.names[keyEvent.keyCode].toUpperCase();
        if (keyEvent.metaKey === true) {
            result = '⌘' + result;
        }
        if (keyEvent.altKey === true) {
            result = '⌥' + result;
        }
        if (keyEvent.shiftKey === true) {
            result = '⇧' + result;
        }
        if (keyEvent.ctrlKey === true) {
            result = '⌃' + result;
        }
        return result;
    }
}
