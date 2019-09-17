/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { GodzulawebTestModule } from '../../../test.module';
import { TaskUpdateComponent } from 'app/entities/course/task/task-update.component';
import { TaskService } from 'app/entities/course/task/task.service';
import { Task } from 'app/shared/model/task.model';

describe('Component Tests', () => {
    describe('Task Management Update Component', () => {
        let comp: TaskUpdateComponent;
        let fixture: ComponentFixture<TaskUpdateComponent>;
        let service: TaskService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GodzulawebTestModule],
                declarations: [TaskUpdateComponent]
            })
                .overrideTemplate(TaskUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskService);
        });

        describe('save', () => {
            it('', () => {});
        });
    });
});
