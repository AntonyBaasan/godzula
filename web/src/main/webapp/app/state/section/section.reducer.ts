import { CourseActionTypes, CourseActions, ICourseDetails } from './../course/course.actions';
import { SectionActionTypes, SectionActions } from './section.actions';
import { ISection } from '../../shared/model/section.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface SectionState extends EntityState<ISection> {
    selectedSection: ISection;
}

export const sectionAdapter: EntityAdapter<ISection> = createEntityAdapter<ISection>({});

export const initialState: SectionState = sectionAdapter.getInitialState({
    selectedSection: null
});
export function sectionReducer(state = initialState, action: CourseActions | SectionActions) {
    switch (action.type) {
        case CourseActionTypes.CourseDetailsLoaded:
            const sections = readSections(action.payload);
            state = sectionAdapter.removeAll(state);
            const newState = sectionAdapter.addMany(sections, state);
            return newState;
        case SectionActionTypes.SelectSection:
            const selectedSection = action.payload;
            return { ...state, selectedSection };
        default:
            return state;
    }
}

function readSections(courseDetail: ICourseDetails) {
    const sections = courseDetail.sections;
    courseDetail.tasks.forEach(t => {
        const section = sections.find(s => s.id === t.sectionId);
        if (!section.tasks) {
            section.tasks = [];
        }
        section.tasks.push(t);
    });
    return sections;
}
