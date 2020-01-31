import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISection } from 'app/shared/model/section.model';

type EntityResponseType = HttpResponse<ISection>;
type EntityArrayResponseType = HttpResponse<ISection[]>;

@Injectable({ providedIn: 'root' })
export class SectionService {
    public resourceUrl = SERVER_API_URL + 'api/sections';

    constructor(protected http: HttpClient) {}

    create(section: ISection): Observable<EntityResponseType> {
        return this.http.post<ISection>(this.resourceUrl, section, { observe: 'response' });
    }

    update(section: ISection): Observable<EntityResponseType> {
        return this.http.put<ISection>(this.resourceUrl, section, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ISection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISection[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getSectionNameById(sections: ISection[], sectionId: string) {
        if (!sections) {
            return sectionId;
        }
        const section = sections.find(c => c.id === sectionId);
        return section ? section.name : sectionId;
    }
}
