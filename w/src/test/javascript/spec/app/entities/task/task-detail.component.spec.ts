/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GodzulawebTestModule } from '../../../test.module';
import { TaskDetailComponent } from 'app/entities/course/task/task-detail.component';
import { Task } from 'app/shared/model/task.model';

describe('Component Tests', () => {
    describe('Task Management Detail Component', () => {
        let comp: TaskDetailComponent;
        let fixture: ComponentFixture<TaskDetailComponent>;
        const route = ({ data: of({ task: new Task('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GodzulawebTestModule],
                declarations: [TaskDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaskDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {});
        });
    });
});
