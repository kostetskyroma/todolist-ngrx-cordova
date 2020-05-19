import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todoNode } from '../reducers/todo.reducer';
import { TodoItem } from '../../todolist/todolist.interface';

export const selectTodoFeature = createFeatureSelector<TodoItem[]>(todoNode);

export const selectTodos = createSelector(
  selectTodoFeature,
  (state: TodoItem[]) => state
);

export const selectById = (id: number) =>
  createSelector(selectTodoFeature, (state: TodoItem[]) =>
    state.find((todo) => todo.id === id)
  );
