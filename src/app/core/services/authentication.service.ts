import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { from } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private databaseService: NgxIndexedDBService
  ) {}

  login(username: string, password: string) {
    return from(
      this.databaseService.getAll('users').then((users: User[]): any => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        return user ? { ...user, token: 'fake-token' } : Promise.reject();
      })
    );
  }

  signUp(user: User) {
    return this.userService.create(user);
  }

  setCurrentUser(currentUser: string) {
    localStorage.setItem('currentUser', currentUser);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }
}
