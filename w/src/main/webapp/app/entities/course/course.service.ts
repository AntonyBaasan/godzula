import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectID } from 'bson';
import { static_course } from 'app/data/static';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICourse } from 'app/shared/model/course.model';
import { CourseStatus } from 'app/shared/enum/course-status';
import { TaskType } from 'app/shared/model/task.model';
import { SectionStatus, MachineType } from 'app/shared/model/section.model';

type EntityResponseType = HttpResponse<ICourse>;
type EntityArrayResponseType = HttpResponse<ICourse[]>;

@Injectable({ providedIn: 'root' })
export class CourseService {
    public resourceUrl = SERVER_API_URL + 'api/courses';

    constructor(protected http: HttpClient) {}

    create(course: ICourse): Observable<EntityResponseType> {
        return this.http.post<ICourse>(this.resourceUrl, course, { observe: 'response' });
        // const c = this.getMockCourse();
        // return this.http.post<ICourse>(this.resourceUrl, c, { observe: 'response' });
    }

    update(course: ICourse): Observable<EntityResponseType> {
        return this.http.put<ICourse>(this.resourceUrl, course, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICourse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    queryMetadata(): Observable<EntityArrayResponseType> {
        return this.http.get<ICourse[]>(this.resourceUrl + '/metadata', { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICourse[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getStaticCourses(): ICourse[] {
        return static_course;
    }

    getMockCourse(): ICourse {
        return {
            name: 'mock',
            description: 'this is a mock course',
            imageUrl: 'some url',
            status: CourseStatus.PUBLISHED,
            sections: [
                {
                    id: this.getNewId(),
                    name: 'sec1',
                    description: 'sec1',
                    status: SectionStatus.PUBLISHED,
                    targetMachine: MachineType.WIN,
                    tasks: [
                        {
                            id: this.getNewId(),
                            question: 'Save file',
                            answer: '',
                            targetMachine: MachineType.MAC,
                            type: TaskType.SHORTCUT
                        },
                        {
                            id: this.getNewId(),
                            question: 'Copy file',
                            answer: '',
                            targetMachine: MachineType.MAC,
                            type: TaskType.SHORTCUT
                        },
                        {
                            id: this.getNewId(),
                            question: 'Push git commit',
                            answer: '',
                            targetMachine: MachineType.MAC,
                            type: TaskType.SHORTCUT
                        }
                    ]
                },
                {
                    id: this.getNewId(),
                    name: 'sec2',
                    description: 'sec2',
                    status: SectionStatus.PUBLISHED,
                    targetMachine: MachineType.MAC,
                    tasks: []
                }
            ]
        };
    }

    getNewId(): string {
        const id = new ObjectID();
        return id.toString();
    }
}
