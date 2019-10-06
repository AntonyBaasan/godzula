import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GodzulawebSharedModule } from 'app/shared';
import { COURSE_PAGE_ROUTE, CoursePageComponent } from './';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionPlayComponent } from './section-play/section-play.component';

@NgModule({
    imports: [GodzulawebSharedModule, RouterModule.forChild([COURSE_PAGE_ROUTE])],
    declarations: [CoursePageComponent, SectionListComponent, SectionPlayComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursePageModule {}
