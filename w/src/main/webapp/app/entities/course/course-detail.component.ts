import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/shared/model/course.model';

@Component({
    selector: 'jhi-course-detail',
    templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {
    course: ICourse;
    showSections = false;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
    }

    previousState() {
        window.history.back();
    }

    toggleSections() {
        this.showSections = !this.showSections;
    }

    getSectionCount() {
        if (this.course && this.course.sections) {
            return this.course.sections.length;
        }
        return 0;
    }
}
