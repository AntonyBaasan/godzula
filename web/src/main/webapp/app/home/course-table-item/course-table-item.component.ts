import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'app/shared/model/course.model';

@Component({
    selector: 'jhi-course-table-item',
    templateUrl: './course-table-item.component.html',
    styleUrls: ['./course-table-item.component.scss']
})
export class CourseTableItemComponent implements OnInit {
    @Input() course: ICourse;

    constructor() {}

    ngOnInit() {}

    onClick() {
        console.log('Hello world!');
    }

    trimString(text: string, len: number, add: string) {
        if (text) {
            return text.length > len ? text.slice(0, len) + '..' : text;
        }
        return '';
    }
}
