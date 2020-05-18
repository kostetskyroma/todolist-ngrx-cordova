import { Action } from '@ngrx/store';
import { TodoItem } from '../../todolist/todolist.interface';

export enum todoType {
  create = '[TODO] create',
  update = '[TODO] update',
  delete = '[TODO] delete',
  complete = '[TODO] complete',
}

export class CreateTodoAction implements Action {
  readonly type = todoType.create;
  readonly payload: TodoItem;
  constructor(payload: TodoItem) {
    this.payload = payload;
  }
}

export class UpdateTodoAction implements Action {
  readonly type = todoType.update;
  readonly payload: TodoItem;
  constructor(payload: TodoItem) {
    this.payload = payload;
  }
}

export class DeleteTodoAction implements Action {
  readonly type = todoType.delete;
  readonly payload: number;
  constructor(payload: number) {
    this.payload = payload;
  }
}

export class CompleteTodoAction implements Action {
  readonly type = todoType.complete;
  readonly payload: number;
  constructor(payload: number) {
    this.payload = payload;
  }
}

export type TodoActions =
  | CreateTodoAction
  | UpdateTodoAction
  | DeleteTodoAction
  | CompleteTodoAction;
