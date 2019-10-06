import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackdoorComponent } from './backdoor.component';

const routes: Routes = [
    {
        path: 'backdoor',
        component: BackdoorComponent,
        data: {
            authorities: [],
            pageTitle: 'Backdoor'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackdoorRoutingModule {}
