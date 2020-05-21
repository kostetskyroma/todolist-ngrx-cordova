import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/api.config';
import { User } from '../interfaces/user';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {
      username,
      password,
    });
  }

  signUp(user: User) {
    return this.http.post(`${config.apiUrl}/users/register`, user);
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
