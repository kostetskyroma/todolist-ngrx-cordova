import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { TodoListService } from '../../todolist/todolist.service';
import { EMPTY } from 'rxjs';
import {
  CompleteTodoAction,
  GetByIdSuccessTodoAction,
  GetByIdTodoAction,
  TODO_TYPE,
} from '../actions/todo.actions';
import { TodoItem } from '../../todolist/todolist.interface';

@Injectable()
export class TodoEffects {
  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(TODO_TYPE.GET_ALL),
    mergeMap(() =>
      this.todoListService.getAll().pipe(
        map((todos: TodoItem[]) => ({
          type: TODO_TYPE.GET_ALL_SUCCESS,
          payload: todos,
        })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect({ dispatch: false })
  createTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.CREATE),
    mergeMap((action: any) => {
      return this.todoListService
        .create(action.payload)
        .pipe(catchError(() => EMPTY));
    })
  );

  @Effect({ dispatch: false })
  deleteTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.DELETE),
    mergeMap((action: any) => {
      return this.todoListService
        .delete(action.payload)
        .pipe(catchError(() => EMPTY));
    })
  );

  @Effect({ dispatch: false })
  completeTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.COMPLETE),
    mergeMap((action: CompleteTodoAction) => {
      return this.todoListService
        .complete(action.payload)
        .pipe(catchError(() => EMPTY));
    })
  );

  @Effect()
  getByIdTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.GET_BY_ID),
    mergeMap((action: GetByIdTodoAction) => {
      return this.todoListService.getById(action.payload).pipe(
        map((todo: TodoItem) => new GetByIdSuccessTodoAction(todo)),
        catchError(() => EMPTY)
      );
    })
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService
  ) {}
}
