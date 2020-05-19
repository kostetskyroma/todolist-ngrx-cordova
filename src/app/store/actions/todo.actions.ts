import { Action } from '@ngrx/store';
import { TodoItem } from '../../todolist/todolist.interface';

export enum todoType {
  getAll = '[TODO] getAll',
  getAllSuccess = '[TODO] getAll success',
  getAllError = '[TODO] getAll error',
  create = '[TODO] create',
  update = '[TODO] update',
  delete = '[TODO] delete',
  complete = '[TODO] complete',
}

export class CreateTodoAction implements Action {
  readonly type = todoType.create;
  constructor(public payload: TodoItem) {}
}

export class UpdateTodoAction implements Action {
  readonly type = todoType.update;
  constructor(public payload: TodoItem) {}
}

export class DeleteTodoAction implements Action {
  readonly type = todoType.delete;
  constructor(public payload: number) {}
}

export class CompleteTodoAction implements Action {
  readonly type = todoType.complete;
  constructor(public payload: number) {}
}

export class GetAllTodoAction implements Action {
  readonly type = todoType.getAll;
}

export class GetAllSuccessTodoAction implements Action {
  readonly type = todoType.getAllSuccess;
  constructor(public payload: TodoItem[]) {}
}

export class GetAllErrorTodoAction implements Action {
  readonly type = todoType.getAllError;
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
