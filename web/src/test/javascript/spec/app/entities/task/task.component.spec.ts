import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GodzulawebTestModule } from '../../../test.module';
import { TaskComponent } from 'app/entities/task/task.component';
import { TaskService } from 'app/entities/task/task.service';
import { Task } from 'app/shared/model/task.model';
import { GodzulawebSharedModule } from 'app/shared';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('Component Tests', () => {
    describe('Task Management Component', () => {
        let comp: TaskComponent;
        let fixture: ComponentFixture<TaskComponent>;
        let service: TaskService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GodzulawebTestModule, GodzulawebSharedModule],
                declarations: [TaskComponent],
                providers: [DeviceDetectorService]
            })
                .overrideTemplate(TaskComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Task('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tasks[0]).toEqual(jasmine.objectContaining({ id: '123a' }));
        });
    });
});
