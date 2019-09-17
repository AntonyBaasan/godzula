/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GodzulawebTestModule } from '../../../test.module';
import { SectionUpdateComponent } from 'app/entities/course/section/section-update.component';
import { SectionService } from 'app/entities/course/section/section.service';
import { Section } from 'app/shared/model/section.model';

describe('Component Tests', () => {
    describe('Section Management Update Component', () => {
        let comp: SectionUpdateComponent;
        let fixture: ComponentFixture<SectionUpdateComponent>;
        let service: SectionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GodzulawebTestModule],
                declarations: [SectionUpdateComponent]
            })
                .overrideTemplate(SectionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SectionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectionService);
        });

        describe('save', () => {
            it('', () => {});
        });
    });
});
