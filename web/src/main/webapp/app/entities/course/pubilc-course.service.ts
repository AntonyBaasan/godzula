import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICourse } from 'app/shared/model/course.model';
import { IFullCourseDTO } from 'app/shared/model/full-course.model';
import { ITask } from 'app/shared/model/task.model';

type EntityResponseType = HttpResponse<ICourse>;
type EntityArrayResponseType = HttpResponse<ICourse[]>;

@Injectable({ providedIn: 'root' })
export class PublicCourseService {
    public resourceUrl = SERVER_API_URL + 'api/public/courses';

    constructor(protected http: HttpClient) {}

    getAllCourses(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICourse[]>(this.resourceUrl + '/', { params: options, observe: 'response' });
    }

    getCourse(id: string): Observable<HttpResponse<IFullCourseDTO>> {
        return this.http.get<IFullCourseDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getTasks(courseId: string, sectionId: string): Observable<HttpResponse<ITask[]>> {
        return this.http.get<ITask[]>(`${this.resourceUrl}/${courseId}/section/${sectionId}`, { observe: 'response' });
    }
}
