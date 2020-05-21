import { TODO_TYPE } from '../actions/todo.actions';
import { TodoItem } from '../../todolist/todolist.interface';

export const todoNode = 'todo';
export const initialState: TodoItem[] = [];

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TODO_TYPE.GET_ALL_SUCCESS:
      return [...action.payload];
    case TODO_TYPE.GET_ALL_ERROR:
      return state.concat([]);
    case TODO_TYPE.CREATE_SUCCESS:
      return state.concat([action.payload]);
    case TODO_TYPE.UPDATE_SUCCESS:
      return [...action.payload];
    case TODO_TYPE.DELETE_SUCCESS:
      return [...action.payload];
    case TODO_TYPE.COMPLETE_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
};
