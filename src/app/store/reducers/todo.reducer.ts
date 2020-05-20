import { TodoActions, TODO_TYPE } from '../actions/todo.actions';
import { TodoItem } from '../../todolist/todolist.interface';

export const todoNode = 'todo';
export const initialState: TodoItem[] = [];

export const todoReducer = (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case TODO_TYPE.GET_ALL_SUCCESS:
      return action.payload;
    case TODO_TYPE.GET_ALL_ERROR:
      return state.concat([]);
    case TODO_TYPE.CREATE:
      return state.concat([action.payload]);
    case TODO_TYPE.UPDATE:
      return state.map((todo) => {
        return todo.id !== action.payload.id
          ? todo
          : Object.assign({}, todo, action.payload);
      });
    case TODO_TYPE.DELETE:
      return state.filter((todo) => todo.id !== action.payload);
    case TODO_TYPE.COMPLETE:
      return state.map((todo) => {
        return todo.id !== action.payload
          ? todo
          : Object.assign({}, todo, { done: !todo.done });
      });
    default:
      return state;
  }
};
