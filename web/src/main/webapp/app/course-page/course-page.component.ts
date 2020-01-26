import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Account } from 'app/core';
import { ICourse } from 'app/shared/model/course.model';
import { SectionListItem } from './section-list/section-list.component';
import { ISection } from 'app/shared/model/section.model';
import { CourseStateFacade } from 'app/state/course/course.facade';
import { SectionStateFacade } from 'app/state/section/section.facade';

@Component({
    selector: 'jhi-course-page',
    templateUrl: './course-page.component.html',
    styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
    course$: Observable<ICourse>;

    courseId: string;
    account: Account;

    selectedSection: SectionListItem;
    sectionList: SectionListItem[] = [];
    showHint = true;

    modalRef: NgbModalRef;
    error: any = null;

    constructor(
        protected activatedRoute: ActivatedRoute,
        private location: Location,
        private router: Router,
        private courseFacade: CourseStateFacade,
        private sectionFacade: SectionStateFacade
    ) {
        this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
        this.course$ = this.courseFacade.GetCourseInfo(this.courseId);
    }

    ngOnInit() {
        this.sectionFacade.GetAllSections().subscribe(sections => {
            this.sectionList = _.map(sections, section => ({ section, passed: false }));
            // as default select first
            if (this.sectionList && this.sectionList.length > 0) {
                this.selectedSection = this.sectionList[0];
            }

            // send info to google analytics
            // this.sendGA('/courses/' + this.course.id);
        });

        this.courseFacade.LoadCourseDetailError().subscribe((error: HttpErrorResponse) => {
            console.log('LoadCourseFailed: ', error);
            if (error) {
                this.error = error.error;
            }
        });
    }

    private sendGA(pageUrl: string) {
        const w = <any>window;
        if (w && w.ga) {
            w.ga('set', 'page', pageUrl);
            w.ga('send', 'pageview');
        }
    }

    sectionSelected(section: SectionListItem) {
        console.log(section);
        // this.selectedSection = section;
        (<any>window).ga('send', 'pageview');
    }

    sectionPass() {
        this.selectedSection.passed = true;
    }

    goBack() {
        if (window.history.length > 1) {
            this.location.back();
        } else {
            this.router.navigate(['/']);
        }
    }

    goHome() {
        this.router.navigate(['/']);
    }

    onNext() {
        const index = this.sectionList.indexOf(this.selectedSection);
        if (index > -1 && index < this.sectionList.length - 1) {
            this.sectionSelected(this.sectionList[index + 1]);
        }
    }

    public getErrorMessage(): string {
        if (!this.error) {
            return null;
        }

        if (this.error) {
            return this.error.detail;
        }
        return null;
    }

    private applyOrderIntoArray(sections: ISection[]) {
        return _.orderBy(sections, ['order'], ['asc'], null);
    }
}
