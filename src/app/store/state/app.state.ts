import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment.prod';
import { TodoItem } from '../../todolist/todolist.interface';
import { authNode, authReducer, AuthState } from '../reducers/auth.reducer';
import { todoNode, todoReducer } from '../reducers/todo.reducer';

export interface AppState {
  [todoNode]: TodoItem[];
  [authNode]: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  [todoNode]: todoReducer,
  [authNode]: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
