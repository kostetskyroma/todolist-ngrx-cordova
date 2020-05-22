import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileResolver } from './profile/profile.resolver';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItemResolver } from './todo-item/todo-item.resolver';

const routes: Routes = [
  {
    path: '',
    component: TodolistComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'todo',
    component: TodoItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todo/:id',
    component: TodoItemComponent,
    canActivate: [AuthGuard],
    resolve: {
      todo: TodoItemResolver,
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: ProfileResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
