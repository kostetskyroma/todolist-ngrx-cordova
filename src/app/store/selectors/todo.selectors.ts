import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todoNode } from '../reducers/todo.reducer';
import { TodoItem } from '../../todolist/todolist.interface';

export const selectCountFeature = createFeatureSelector<TodoItem[]>(todoNode);

export const selectTodos = createSelector(
  selectCountFeature,
  (state: TodoItem[]) => state
);
