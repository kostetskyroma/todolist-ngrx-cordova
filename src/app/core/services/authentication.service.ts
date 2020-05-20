import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../config/api.config';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {
      username,
      password,
    });
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
