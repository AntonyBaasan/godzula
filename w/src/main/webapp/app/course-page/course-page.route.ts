import { Route } from '@angular/router';

import { CoursePageComponent } from './';

export const COURSE_PAGE_ROUTE: Route = {
    path: 'courses/:id',
    component: CoursePageComponent,
    data: {
        authrioties: [],
        pageTitle: 'Course'
    }
};
