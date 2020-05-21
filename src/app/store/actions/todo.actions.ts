import { Action } from '@ngrx/store';
import { TodoItem } from '../../todolist/todolist.interface';

export enum TODO_TYPE {
  GET_ALL = '[TODO] get all',
  GET_ALL_SUCCESS = '[TODO] get all success',
  GET_ALL_ERROR = '[TODO] get all error',
  GET_BY_ID = '[TODO] get by id',
  GET_BY_ID_SUCCESS = '[TODO] get by id success',
  CREATE = '[TODO] create',
  CREATE_SUCCESS = '[TODO] create success',
  UPDATE = '[TODO] update',
  UPDATE_SUCCESS = '[TODO] update success',
  DELETE = '[TODO] delete',
  DELETE_SUCCESS = '[TODO] delete success',
  COMPLETE = '[TODO] complete',
  COMPLETE_SUCCESS = '[TODO] complete success',
}

export class CreateTodoAction implements Action {
  readonly type = TODO_TYPE.CREATE;
  constructor(public payload: TodoItem) {}
}

export class CreateSuccessTodoAction implements Action {
  readonly type = TODO_TYPE.CREATE_SUCCESS;
  constructor(public payload: TodoItem) {}
}

export class UpdateTodoAction implements Action {
  readonly type = TODO_TYPE.UPDATE;
  constructor(public payload: TodoItem) {}
}

export class UpdateSuccessTodoAction implements Action {
  readonly type = TODO_TYPE.UPDATE_SUCCESS;
  constructor(public payload: TodoItem[]) {}
}

export class DeleteTodoAction implements Action {
  readonly type = TODO_TYPE.DELETE;
  constructor(public payload: number) {}
}

export class DeleteSuccessTodoAction implements Action {
  readonly type = TODO_TYPE.DELETE_SUCCESS;
  constructor(public payload: TodoItem[]) {}
}

export class CompleteTodoAction implements Action {
  readonly type = TODO_TYPE.COMPLETE;
  constructor(public payload: number) {}
}

export class CompleteSuccessTodoAction implements Action {
  readonly type = TODO_TYPE.COMPLETE_SUCCESS;
  constructor(public payload: TodoItem[]) {}
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
}

export class GetByIdTodoAction implements Action {
  readonly type = TODO_TYPE.GET_BY_ID;
  constructor(public payload: number) {}
}

export class GetByIdSuccessTodoAction implements Action {
  readonly type = TODO_TYPE.GET_BY_ID_SUCCESS;
  constructor(public payload: TodoItem) {}
}

export type TodoActions =
  | CreateTodoAction
  | CreateSuccessTodoAction
  | UpdateTodoAction
  | UpdateSuccessTodoAction
  | DeleteTodoAction
  | DeleteSuccessTodoAction
  | CompleteTodoAction
  | CompleteSuccessTodoAction
  | GetAllTodoAction
  | GetAllSuccessTodoAction
  | GetAllErrorTodoAction
  | GetByIdTodoAction
  | GetByIdSuccessTodoAction;
