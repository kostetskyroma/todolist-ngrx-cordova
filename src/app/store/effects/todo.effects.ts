import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { TodoListService } from '../../todolist/todolist.service';
import { EMPTY, of } from 'rxjs';
import {
  CompleteSuccessTodoAction,
  CompleteTodoAction,
  CreateSuccessTodoAction,
  CreateTodoAction,
  DeleteSuccessTodoAction,
  DeleteTodoAction,
  GetAllErrorTodoAction,
  GetAllSuccessTodoAction,
  GetByIdSuccessTodoAction,
  GetByIdTodoAction,
  GetWithParamsErrorTodoAction,
  GetWithParamsSuccessTodoAction,
  TODO_TYPE,
  UpdateSuccessTodoAction,
  UpdateTodoAction,
} from '../actions/todo.actions';
import { TodoItem, TodoListRange } from '../../todolist/todolist.interface';

@Injectable()
export class TodoEffects {
  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(TODO_TYPE.GET_ALL),
    mergeMap(({ payload }: { payload: TodoListRange }) =>
      this.todoListService.getAll(payload).pipe(
        map(
          (todos: TodoItem[]) => new GetAllSuccessTodoAction(todos),
          catchError(() => of(new GetAllErrorTodoAction()))
        )
      )
    )
  );

  @Effect()
  loadTodosWithParams$ = this.actions$.pipe(
    ofType(TODO_TYPE.GET_WITH_PARAMS),
    mergeMap(({ payload }: { payload: TodoListRange }) =>
      this.todoListService.getWithParams(payload).pipe(
        map(
          (todos: TodoItem[]) => new GetWithParamsSuccessTodoAction(todos),
          catchError(() => of(new GetWithParamsErrorTodoAction()))
        )
      )
    )
  );

  @Effect()
  createTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.CREATE),
    mergeMap((action: CreateTodoAction) => {
      return this.todoListService.create(action.payload).pipe(
        map((todo: TodoItem) => new CreateSuccessTodoAction(todo)),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect()
  updateTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.UPDATE),
    mergeMap((action: UpdateTodoAction) => {
      return this.todoListService.update(action.payload).pipe(
        map((todos: TodoItem[]) => new UpdateSuccessTodoAction(todos)),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect()
  deleteTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.DELETE),
    mergeMap((action: DeleteTodoAction) => {
      return this.todoListService.delete(action.payload).pipe(
        map((todos: TodoItem[]) => new DeleteSuccessTodoAction(todos)),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect()
  completeTodo$ = this.actions$.pipe(
    ofType(TODO_TYPE.COMPLETE),
    mergeMap((action: CompleteTodoAction) => {
      return this.todoListService.complete(action.payload).pipe(
        map((todos: TodoItem[]) => new CompleteSuccessTodoAction(todos)),
        catchError(() => EMPTY)
      );
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
