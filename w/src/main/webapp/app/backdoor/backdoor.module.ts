import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackdoorRoutingModule } from './backdoor-routing.module';
import { BackdoorComponent } from './backdoor.component';

@NgModule({
    declarations: [BackdoorComponent],
    imports: [CommonModule, BackdoorRoutingModule],
    entryComponents: [BackdoorComponent]
})
export class BackdoorModule {}
