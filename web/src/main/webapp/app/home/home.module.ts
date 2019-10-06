import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GodzulawebSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { CourseTableComponent } from './course-table/course-table.component';
import { CourseTableItemComponent } from './course-table-item/course-table-item.component';

@NgModule({
    imports: [GodzulawebSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent, CourseTableComponent, CourseTableItemComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GodzulawebHomeModule {}
