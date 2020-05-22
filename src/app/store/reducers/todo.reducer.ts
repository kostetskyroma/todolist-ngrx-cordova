import { TODO_TYPE } from '../actions/todo.actions';
import { TodoItem } from '../../todolist/todolist.interface';

export const todoNode = 'todo';

export interface TodoState {
  loading: boolean;
  todos: TodoItem[];
}
export const initialState: TodoState = {
  loading: false,
  todos: [],
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TODO_TYPE.GET_ALL:
      return { ...state, loading: true };
    case TODO_TYPE.GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case TODO_TYPE.GET_ALL_ERROR:
      return { ...state, loading: false, todos: [] };
    case TODO_TYPE.GET_WITH_PARAMS:
      return { ...state, loading: true };
    case TODO_TYPE.GET_WITH_PARAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.concat(action.payload),
      };
    case TODO_TYPE.GET_WITH_PARAMS_ERROR:
      return { ...state, loading: false, todos: state.todos.concat([]) };
    case TODO_TYPE.CREATE_SUCCESS:
      return { ...state, todos: state.todos.concat(action.payload) };
    case TODO_TYPE.UPDATE_SUCCESS:
      return { ...state, todos: [...action.payload] };
    case TODO_TYPE.DELETE_SUCCESS:
      return { ...state, todos: [...action.payload] };
    case TODO_TYPE.COMPLETE_SUCCESS:
      return { ...state, todos: [...action.payload] };
    default:
      return state;
  }
};
