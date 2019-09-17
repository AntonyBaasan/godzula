import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GodzulawebSharedModule } from 'app/shared';
import {
    SectionComponent,
    SectionDetailComponent,
    SectionUpdateComponent,
    SectionDeletePopupComponent,
    SectionDeleteDialogComponent,
    sectionRoute,
    sectionPopupRoute
} from './';
import { GodzulawebTaskModule } from '../task/task.module';

const ENTITY_STATES = [...sectionRoute, ...sectionPopupRoute];

@NgModule({
    imports: [GodzulawebTaskModule, GodzulawebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SectionComponent,
        SectionDetailComponent,
        SectionUpdateComponent,
        SectionDeleteDialogComponent,
        SectionDeletePopupComponent
    ],
    exports: [SectionDetailComponent, SectionUpdateComponent],
    entryComponents: [SectionComponent, SectionUpdateComponent, SectionDeleteDialogComponent, SectionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GodzulawebSectionModule {}
