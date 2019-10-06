// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
export class InputKeyboard {
    constructor(
        public keyCode: number,
        public altKey?: boolean,
        public ctrlKey?: boolean,
        public shiftKey?: boolean,
        public metaKey?: boolean
    ) {}
}
