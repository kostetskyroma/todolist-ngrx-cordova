import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todoNode, TodoState } from '../reducers/todo.reducer';

export const selectTodoFeature = createFeatureSelector<TodoState>(todoNode);

export const selectTodos = createSelector(
  selectTodoFeature,
  (state: TodoState) => state.todos
);

export const selectLoading = createSelector(
  selectTodoFeature,
  (state: TodoState) => state.loading
);
