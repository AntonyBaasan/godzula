import { Route } from '@angular/router';

import { PlaygroundComponent } from './';

export const PLAYGROUND_ROUTE: Route = {
    path: 'playground',
    component: PlaygroundComponent,
    data: {
        authorities: [],
        pageTitle: 'This is a playground for Devs!'
    }
};
