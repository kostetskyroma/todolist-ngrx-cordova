import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import {
  AUTH_TYPE,
  LoginAction,
  LoginErrorAction,
  LoginSuccessAction,
} from '../actions/auth.actions';
import { User } from '../../core/interfaces/user';
import { AlertService } from '../../core/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AUTH_TYPE.LOGIN),
    mergeMap((action: LoginAction) =>
      this.authenticationService
        .login(action.payload.username, action.payload.password)
        .pipe(
          map((user: User) => new LoginSuccessAction(user)),
          catchError((error) => of(new LoginErrorAction(error)))
        )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AUTH_TYPE.LOGIN_SUCCESS),
    tap((action: LoginSuccessAction) => {
      const url = this.route.snapshot?.queryParams?.returnUrl || '/';
      this.alertService.success(`Welcome ${action.payload?.firstname}!`);
      if (action.payload?.token) {
        this.authenticationService.setCurrentUser(
          JSON.stringify(action.payload)
        );
      }
      setTimeout(() => this.router.navigateByUrl(url), 1500);
    })
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType(AUTH_TYPE.LOGIN_ERROR),
    tap(() => {
      this.alertService.error(`Username or password is incorrect!`);
    })
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
