import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment.prod';
import { todoNode, todoReducer } from '../reducers/todo.reducer';
import { TodoItem } from '../../todolist/todolist.interface';

export interface State {
  [todoNode]: TodoItem[];
}

export const reducers: ActionReducerMap<State> = {
  [todoNode]: todoReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
