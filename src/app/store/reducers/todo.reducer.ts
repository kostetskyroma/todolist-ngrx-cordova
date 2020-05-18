import { TodoActions, todoType } from '../actions/todo.actions';

export const todoNode = 'todo';

export const todoReducer = (state = [], action: TodoActions) => {
  switch (action.type) {
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
