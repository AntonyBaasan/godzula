import { ISection } from '../../shared/model/section.model';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SectionState, sectionAdapter } from './section.reducer';

@Injectable({ providedIn: 'root' })
export class SectionStateFacade {
    constructor(private store: Store<ISection[] | ISection>) {}

    public GetAllSections(): Observable<ISection[]> {
        return this.store.select(selectAllSections);
    }
    public GetSelectedSection(): Observable<ISection> {
        return this.store.select(selectSelecteSection);
    }
}

export const selectSectionState = createFeatureSelector<SectionState>('sections');

// get the selectors
const { selectAll } = sectionAdapter.getSelectors();

export const selectAllSections = createSelector(
    selectSectionState,
    state => (state == null || state.entities == null ? null : Object.keys(state.entities).map(key => state.entities[key]))
);

// export const selectFeature = createFeatureSelector<AppState, FeatureState>('feature');

export const selectSelecteSection = createSelector(
    selectSectionState,
    state => state.selectedSection
);
