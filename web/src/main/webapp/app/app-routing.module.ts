import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'course',
                    // loadChildren: () => import('./entities/course/course.module').then(m => m.GodzulawebCourseModule)
                    loadChildren: './entities/course/course.module#GodzulawebCourseModule'
                },
                {
                    path: 'section',
                    // loadChildren: () => import('./entities/section/section.module').then(m => m.GodzulawebSectionModule)
                    loadChildren: './entities/section/section.module#GodzulawebSectionModule'
                },
                {
                    path: 'task',
                    // loadChildren: () => import('./entities/task/task.module').then(m => m.GodzulawebTaskModule)
                    loadChildren: './entities/task/task.module#GodzulawebTaskModule'
                },
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#GodzulawebAdminModule'
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class GodzulawebAppRoutingModule {}
