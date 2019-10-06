import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GodzulawebTestModule } from '../../../test.module';
import { SectionDeleteDialogComponent } from 'app/entities/section/section-delete-dialog.component';
import { SectionService } from 'app/entities/section/section.service';

describe('Component Tests', () => {
    describe('Section Management Delete Component', () => {
        let comp: SectionDeleteDialogComponent;
        let fixture: ComponentFixture<SectionDeleteDialogComponent>;
        let service: SectionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GodzulawebTestModule],
                declarations: [SectionDeleteDialogComponent]
            })
                .overrideTemplate(SectionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SectionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
