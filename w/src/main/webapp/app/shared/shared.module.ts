import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { KeyboardUtil } from './util/keyboard-util';
import { GodzulawebSharedLibsModule, GodzulawebSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { KeyInputComponent } from './key-input/key-input.component';

@NgModule({
    imports: [GodzulawebSharedLibsModule, GodzulawebSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, KeyInputComponent],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }, KeyboardUtil],
    entryComponents: [JhiLoginModalComponent],
    exports: [GodzulawebSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, KeyInputComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GodzulawebSharedModule {
    static forRoot() {
        return {
            ngModule: GodzulawebSharedModule
        };
    }
}
