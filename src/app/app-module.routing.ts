import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileResolver } from './profile/profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: TodolistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: ProfileResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
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
