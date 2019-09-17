import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { GodzulawebSharedModule } from 'app/shared';
import { GodzulawebCoreModule } from 'app/core';
import { GodzulawebAppRoutingModule } from './app-routing.module';
import { GodzulawebHomeModule } from './home/home.module';
import { GodzulawebAccountModule } from './account/account.module';
import { GodzulawebEntityModule } from './entities/entity.module';
import { PlaygroundModule } from './playground/playground.module';
import { CoursePageModule } from './course-page/course-page.module';
import * as moment from 'moment';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './state/course/course.effects';

import { appReducer } from './state/app.state';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { BackdoorModule } from './backdoor/backdoor.module';

@NgModule({
    imports: [
        BrowserModule,
        GodzulawebAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        DeviceDetectorModule.forRoot(),
        GodzulawebSharedModule.forRoot(),
        GodzulawebCoreModule,
        GodzulawebHomeModule,
        GodzulawebAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        GodzulawebEntityModule,
        PlaygroundModule,
        CoursePageModule,
        BackdoorModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([CourseEffects]),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: false // Restrict extension to log-only mode
        })
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class GodzulawebAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
