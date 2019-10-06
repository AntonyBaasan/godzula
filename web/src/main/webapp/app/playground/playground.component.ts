import { Component, OnInit } from '@angular/core';
import { InputKeyboard } from 'app/shared/util/inputkeyboard.model';

@Component({
    selector: 'jhi-playground',
    templateUrl: './playground.component.html',
    styles: []
})
export class PlaygroundComponent implements OnInit {
    values: InputKeyboard[] = [];
    expectedValues: InputKeyboard[] = [];
    showHint = true;
    isCompact = false;
    device: 'Win' | 'Mac' = 'Win';

    constructor() {}

    ngOnInit() {
        this.sendGA('/playground.html');

        this.expectedValues = [
            { keyCode: 68, altKey: true, ctrlKey: true, shiftKey: false, metaKey: true },
            { keyCode: 68, altKey: false, ctrlKey: false, shiftKey: true, metaKey: true },
            { keyCode: 68, altKey: true, ctrlKey: false, shiftKey: true, metaKey: false },
            { keyCode: 66, altKey: false, ctrlKey: false, shiftKey: false, metaKey: false }
        ];
    }

    private sendGA(pageUrl: string) {
        const w = <any>window;
        if (w && w.ga) {
            w.ga('set', 'page', pageUrl);
            w.ga('send', 'pageview');
        }
    }

    onValuesChanged(newValues: InputKeyboard[]) {
        this.values = newValues;
    }
    selectWin() {
        this.device = 'Win';
    }
    selectMac() {
        this.device = 'Mac';
    }
}
