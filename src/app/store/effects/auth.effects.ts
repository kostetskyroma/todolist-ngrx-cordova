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
  SignUpAction,
  SignUpErrorAction,
  SignUpSuccessAction,
} from '../actions/auth.actions';
import { User } from '../../core/interfaces/user';
import { AlertService } from '../../core/components/alert/alert.service';
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
      this.router.navigateByUrl(url);
    })
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType(AUTH_TYPE.LOGIN_ERROR),
    tap(() => {
      this.alertService.error(`Username or password is incorrect!`);
    })
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(AUTH_TYPE.SIGN_UP),
    mergeMap((action: SignUpAction) =>
      this.authenticationService.signUp(action.payload as User).pipe(
        map((user: User) => new SignUpSuccessAction(user)),
        catchError((error) => of(new SignUpErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  signUpSuccess$ = this.actions$.pipe(
    ofType(AUTH_TYPE.SIGN_UP_SUCCESS),
    tap((action: SignUpSuccessAction) => {
      this.alertService.success(`Successfully signed-up!`);
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  signUpError$ = this.actions$.pipe(
    ofType(AUTH_TYPE.SIGN_UP_ERROR),
    tap((action: any) => {
      this.alertService.error(
        action.payload?.target?.error?.message ||
          `Can't sign up! Please, try later..`
      );
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
