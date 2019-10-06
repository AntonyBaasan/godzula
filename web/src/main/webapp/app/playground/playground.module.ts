import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent, PLAYGROUND_ROUTE } from './';
import { RouterModule } from '@angular/router';
import { GodzulawebSharedModule } from 'app/shared';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([PLAYGROUND_ROUTE]), GodzulawebSharedModule],
    declarations: [PlaygroundComponent]
})
export class PlaygroundModule {}
