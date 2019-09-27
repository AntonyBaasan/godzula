import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Account } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'app/shared/model/course.model';
import { SectionListItem } from './section-list/section-list.component';
import { ISection } from 'app/shared/model/section.model';
import { CourseStateFacade } from 'app/state/course/course.facade';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-course-page',
    templateUrl: './course-page.component.html',
    styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
    course$: Observable<ICourse>;
    account: Account;
    modalRef: NgbModalRef;
    course: ICourse;
    selectedSection: SectionListItem;
    sectionList: SectionListItem[];
    showHint = true;
    error: any = null;

    constructor(
        protected activatedRoute: ActivatedRoute,
        private location: Location,
        private router: Router,
        private courseFacade: CourseStateFacade
    ) {}

    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        // var id = this.activatedRoute.params['id'];
        this.courseFacade.GetCourseInfo(id).subscribe(course => {
            if (_.isNil(course)) {
                return;
            }

            this.course = course;
            this.course.sections = this.applyOrderIntoArray(this.course.sections);
            this.sectionList = _.map(this.course.sections, section => ({ section, passed: false }));
            // as default select first
            this.selectedSection = this.sectionList[0];

            // send info to google analytics
            this.sendGA('/courses/' + this.course.id);
        });

        this.courseFacade.LoadCourseDetailError().subscribe((error: any) => {
            console.log('LoadCourseFailed: ', error);
            this.error = error;
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
        this.selectedSection = section;
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

    getSelectedSectionDevice() {
        if (!this.course) {
            return '';
        }
    }

    private applyOrderIntoArray(sections: ISection[]) {
        return _.orderBy(sections, ['order'], ['asc'], null);
    }
}
