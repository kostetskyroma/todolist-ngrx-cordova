import { Action } from '@ngrx/store';
import { TodoItem } from '../../todolist/todolist.interface';

export enum TODO_TYPE {
  GET_ALL = '[TODO] get all',
  GET_ALL_SUCCESS = '[TODO] get all success',
  GET_ALL_ERROR = '[TODO] get all error',
  CREATE = '[TODO] create',
  UPDATE = '[TODO] update',
  DELETE = '[TODO] delete',
  COMPLETE = '[TODO] complete',
}

export class CreateTodoAction implements Action {
  readonly type = TODO_TYPE.CREATE;
  constructor(public payload: TodoItem) {}
}

export class UpdateTodoAction implements Action {
  readonly type = TODO_TYPE.UPDATE;
  constructor(public payload: TodoItem) {}
}

export class DeleteTodoAction implements Action {
  readonly type = TODO_TYPE.DELETE;
  constructor(public payload: number) {}
}

export class CompleteTodoAction implements Action {
  readonly type = TODO_TYPE.COMPLETE;
  constructor(public payload: number) {}
}

export class GetAllTodoAction implements Action {
  readonly type = TODO_TYPE.GET_ALL;
}

export class GetAllSuccessTodoAction implements Action {
  readonly type = TODO_TYPE.GET_ALL_SUCCESS;
  constructor(public payload: TodoItem[]) {}
}

export class GetAllErrorTodoAction implements Action {
  readonly type = TODO_TYPE.GET_ALL_ERROR;
  constructor(public payload: TodoItem[]) {}
}

export type TodoActions =
  | CreateTodoAction
  | UpdateTodoAction
  | DeleteTodoAction
  | CompleteTodoAction
  | GetAllTodoAction
  | GetAllSuccessTodoAction
  | GetAllErrorTodoAction;
