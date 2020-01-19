import { CourseActionTypes, CourseActions } from '../course/course.actions';
import { ITask } from '../../shared/model/task.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface TaskState extends EntityState<ITask> {
    // additional entities state properties
}

export const taskAdapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({});

export const initialState: TaskState = taskAdapter.getInitialState({
    // additional entity state properties
});

export function taskReducer(state = initialState, action: CourseActions) {
    switch (action.type) {
        // case CourseActionTypes.CourseDetailsLoaded:
        //     const tasks = action.payload.tasks;
        //     return taskAdapter.addMany(tasks, state);
        default:
            return state;
    }
}
