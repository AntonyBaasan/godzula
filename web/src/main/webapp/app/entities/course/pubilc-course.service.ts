import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICourse } from 'app/shared/model/course.model';
import { IFullCourse } from 'app/shared/model/full-course.model';

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

    openCourse(id: string): Observable<HttpResponse<IFullCourse>> {
        return this.http.get<IFullCourse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
