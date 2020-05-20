import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Action, State, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { AppState } from '../store/state/app.state';
import { take } from 'rxjs/operators';
import { GetByIdTodoAction, TODO_TYPE } from '../store/actions/todo.actions';

@Injectable({ providedIn: 'root' })
export class TodoItemResolver implements Resolve<Action> {
  constructor(
    private store: Store<State<AppState>>,
    private action$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new GetByIdTodoAction(+route.params?.id));
    return this.action$.pipe(ofType(TODO_TYPE.GET_BY_ID_SUCCESS), take(1));
  }
}
