import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { TodoListService } from '../../todolist/todolist.service';
import { EMPTY } from 'rxjs';
import { todoType } from '../actions/todo.actions';
import { TodoItem } from '../../todolist/todolist.interface';

@Injectable()
export class TodoEffects {
  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(todoType.getAll),
    mergeMap(() =>
      this.todoListService.getAll().pipe(
        map((todos: TodoItem[]) => ({
          type: todoType.getAllSuccess,
          payload: todos,
        })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect({ dispatch: false })
  createTodo$ = this.actions$.pipe(
    ofType(todoType.create),
    mergeMap((action: any) => {
      return this.todoListService
        .create(action.payload)
        .pipe(catchError(() => EMPTY));
    })
  );

  @Effect({ dispatch: false })
  deleteTodo$ = this.actions$.pipe(
    ofType(todoType.delete),
    mergeMap((action: any) => {
      return this.todoListService
        .delete(action.payload)
        .pipe(catchError(() => EMPTY));
    })
  );

  @Effect({ dispatch: false })
  completeTodo$ = this.actions$.pipe(
    ofType(todoType.complete),
    mergeMap((action: any) => {
      return this.todoListService
        .complete(action.payload)
        .pipe(catchError(() => EMPTY));
    })
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService
  ) {}
}
