import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { CourseService } from 'app/entities/course/course.service';
import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseStatus } from 'app/shared/model/enumerations/course-status.model';

describe('Service Tests', () => {
    describe('Course Service', () => {
        let injector: TestBed;
        let service: CourseService;
        let httpMock: HttpTestingController;
        let elemDefault: ICourse;
        let expectedResult;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            expectedResult = {};
            injector = getTestBed();
            service = injector.get(CourseService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Course('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', CourseStatus.DRAFT);
        });

        describe('Service methods', () => {
            it('should find an element', () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: elemDefault });
            });

            it('should create a Course', () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Course(null))
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: expected });
            });

            it('should update a Course', () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        imageUrl: 'BBBBBB',
                        status: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: expected });
            });

            it('should return a list of Course', () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        imageUrl: 'BBBBBB',
                        status: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => (expectedResult = body));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([returnedFromService]);
                httpMock.verify();
                expect(expectedResult).toContainEqual(expected);
            });

            it('should delete a Course', () => {
                service.delete('123').subscribe(resp => (expectedResult = resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
                expect(expectedResult);
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
