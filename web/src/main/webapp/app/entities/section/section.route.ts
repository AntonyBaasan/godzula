import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Section } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { SectionComponent } from './section.component';
import { SectionDetailComponent } from './section-detail.component';
import { SectionUpdateComponent } from './section-update.component';
import { SectionDeletePopupComponent } from './section-delete-dialog.component';
import { ISection } from 'app/shared/model/section.model';

@Injectable({ providedIn: 'root' })
export class SectionResolve implements Resolve<ISection> {
    constructor(private service: SectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISection> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Section>) => response.ok),
                map((section: HttpResponse<Section>) => section.body)
            );
        }
        return of(new Section());
    }
}

export const sectionRoute: Routes = [
    {
        path: '',
        component: SectionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SectionDetailComponent,
        resolve: {
            section: SectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SectionUpdateComponent,
        resolve: {
            section: SectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SectionUpdateComponent,
        resolve: {
            section: SectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sectionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SectionDeletePopupComponent,
        resolve: {
            section: SectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
