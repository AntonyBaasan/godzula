import { NgModule } from '@angular/core';

import { GodzulawebSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GodzulawebSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GodzulawebSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GodzulawebSharedCommonModule {}
