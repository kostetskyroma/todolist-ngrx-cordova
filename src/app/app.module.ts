import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-module.routing';
import { TodolistComponent } from './todolist/todolist.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FakeBackendInterceptor } from './core/interceptors/fake-backend.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './core/components/alert/alert.component';
import { AlertService } from './core/components/alert/alert.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { metaReducers, reducers } from './store/state/app.state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/effects/todo.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TodolistPipe } from './todolist/todolist.pipe';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    NotFoundComponent,
    AlertComponent,
    SignUpComponent,
    TodolistPipe,
    TodoItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TodoEffects, AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
