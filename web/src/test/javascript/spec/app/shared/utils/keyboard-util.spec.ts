import { TestBed } from '@angular/core/testing';
import { KeyboardUtil } from 'app/shared/util/keyboard-util';
import { Key } from 'ts-keycode-enum';
import { InputKeyboard } from 'app/shared/util/inputkeyboard.model';

describe('Keyboard', () => {
    describe('Utils', () => {
        let service: KeyboardUtil;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [KeyboardUtil]
            });
        });

        afterEach(() => {});

        describe('No config', () => {
            beforeEach(() => {
                service = TestBed.get(KeyboardUtil);
            });
            it('should not fail', () => {
                const result = service.keyToString({ keyCode: 188 });
                expect(result).toEqual([]);
            });
        });
        describe('WIN', () => {
            beforeEach(() => {
                service = TestBed.get(KeyboardUtil);
                service.configure({ os: 'Win' });
            });
            describe('shouldIgnore', () => {
                it('should ignore ctrl key', () => {
                    const shouldIgnore = service.shouldIgnore({
                        keyCode: Key.Ctrl
                    });
                    expect(shouldIgnore).toEqual(true);
                });
                it('should ignore alt key', () => {
                    const shouldIgnore = service.shouldIgnore({
                        keyCode: Key.Alt
                    });
                    expect(shouldIgnore).toEqual(true);
                });
                it('should ignore shift key', () => {
                    const shouldIgnore = service.shouldIgnore({
                        keyCode: Key.Shift
                    });
                    expect(shouldIgnore).toEqual(true);
                });
            });

            describe('keyToString', () => {
                it('should convert keyCode', () => {
                    const resultString = service.keyToString({
                        keyCode: 188 // comma
                    });
                    expect(resultString).toEqual([',']);
                });
                it('should convert keyCode plus ctrl', () => {
                    const resultString = service.keyToString({
                        keyCode: 188, // comma
                        ctrlKey: true,
                        shiftKey: true,
                        altKey: true
                    });
                    expect(resultString).toEqual(['Ctrl+Alt+Shift+,']);
                });
                it('should become uppercase', () => {
                    const resultString = service.keyToString({
                        keyCode: 68 // d
                    });
                    expect(resultString).toEqual(['D']);
                });
                it('should accept empty value', () => {
                    const inputs: InputKeyboard[] = undefined;
                    const resultString = service.keyToString(inputs);

                    expect(resultString).toEqual([]);
                });
                it('should accept empty array', () => {
                    const inputs: InputKeyboard[] = [];
                    const resultString = service.keyToString(inputs);

                    expect(resultString).toEqual([]);
                });
                it('should convert multiple keyCode', () => {
                    const inputs: InputKeyboard[] = [{ keyCode: 68 }, { keyCode: 68 }];
                    const resultString = service.keyToString(inputs);

                    expect(resultString).toEqual(['D', 'D']);
                });
                it('converts full input keyboard', () => {
                    const inputs: InputKeyboard[] = [
                        {
                            keyCode: 68,
                            altKey: true,
                            ctrlKey: true,
                            shiftKey: true,
                            metaKey: true
                        }
                    ];
                    const resultString = service.keyToString(inputs);

                    expect(resultString).toEqual(['Win+Ctrl+Alt+Shift+D']);
                });
            });
        });
        describe('MAC', () => {
            beforeEach(() => {
                service = TestBed.get(KeyboardUtil);
                service.configure({ os: 'Mac' });
            });
            it('converts full input keyboard', () => {
                const inputs: InputKeyboard[] = [
                    {
                        keyCode: 68,
                        altKey: true,
                        ctrlKey: true,
                        shiftKey: true,
                        metaKey: true
                    }
                ];

                const resultString = service.keyToString(inputs);

                expect(resultString).toEqual(['⌃⇧⌥⌘D']);
            });
        });
    });
});
