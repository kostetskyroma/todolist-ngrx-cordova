import { TodoActions, todoType } from '../actions/todo.actions';
import { TodoItem } from '../../todolist/todolist.interface';

export const todoNode = 'todo';
export const initialState: TodoItem[] = [];

export const todoReducer = (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case todoType.getAllSuccess:
      return action.payload;
    case todoType.getAllError:
      return state.concat([]);
    case todoType.create:
      return state.concat([action.payload]);
    case todoType.update:
      return state.map((todo) => {
        return todo.id !== action.payload.id
          ? todo
          : Object.assign({}, todo, action.payload);
      });
    case todoType.delete:
      return state.filter((todo) => todo.id !== action.payload);
    case todoType.complete:
      return state.map((todo) => {
        return todo.id !== action.payload
          ? todo
          : Object.assign({}, todo, { done: !todo.done });
      });
    default:
      return state;
  }
};
