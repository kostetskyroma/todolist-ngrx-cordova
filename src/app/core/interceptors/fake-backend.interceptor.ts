import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendInterceptor implements HttpInterceptor {
  users: any[] = JSON.parse(localStorage.getItem('users')) || [];
  todos: any[] = JSON.parse(localStorage.getItem('todos')) || [];

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          this.users = JSON.parse(localStorage.getItem('users')) || [];
          this.todos = JSON.parse(localStorage.getItem('todos')) || [];

          // authenticate
          if (
            request.url.endsWith('/users/authenticate') &&
            request.method === 'POST'
          ) {
            return this.usersAuthenticate(request);
          }

          // get users
          if (request.url.endsWith('/users') && request.method === 'GET') {
            return this.getUsers(request);
          }

          // get user by id
          if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            return this.getUserById(request);
          }

          // register user
          if (
            request.url.endsWith('/users/register') &&
            request.method === 'POST'
          ) {
            return this.createUser(request);
          }

          // update user
          if (request.url.match(/\/users\/\d+$/) && request.method === 'PUT') {
            return this.updateUser(request);
          }

          // delete user
          if (
            request.url.match(/\/users\/\d+$/) &&
            request.method === 'DELETE'
          ) {
            return this.deleteUser(request);
          }

          // ================== Todos =============================================
          // get todos
          if (request.url.endsWith('/todos') && request.method === 'GET') {
            return this.getTodos(request);
          }

          // get todo by id
          if (request.url.match(/\/todos\/\d+$/) && request.method === 'GET') {
            return this.getTodoById(request);
          }

          // create new
          if (
            request.url.endsWith('/todos/create') &&
            request.method === 'POST'
          ) {
            return this.saveTodo(request);
          }

          // update todo
          if (request.url.match(/\/todos\/\d+$/) && request.method === 'PUT') {
            return this.updateTodo(request);
          }

          // delete todo
          if (
            request.url.match(/\/todos\/\d+$/) &&
            request.method === 'DELETE'
          ) {
            return this.deleteTodo(request);
          }
          // complete todo
          if (
            request.url.match(/\/todos\/complete\/\d+$/) &&
            request.method === 'PUT'
          ) {
            return this.completeTodo(request);
          }

          // pass through any requests not handled above
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  usersAuthenticate(request: HttpRequest<any>) {
    const filteredUsers = this.users.filter((user) => {
      return (
        user.username === request.body.username &&
        user.password === request.body.password
      );
    });
    if (filteredUsers.length) {
      const user = filteredUsers[0];
      const body = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        token: 'fake-token',
      };
      return of(new HttpResponse({ status: 200, body }));
    } else {
      return throwError('Username or password is incorrect');
    }
  }

  getUsers(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      return of(new HttpResponse({ status: 200, body: this.users }));
    } else {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  getUserById(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);
      const matchedUsers = this.users.filter((u) => u.id === id);
      const user = matchedUsers.length ? matchedUsers[0] : null;
      return of(new HttpResponse({ status: 200, body: user }));
    } else {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  createUser(request: HttpRequest<any>) {
    const newUser: User = request.body;
    const duplicateUser = this.users.filter((user) => {
      return user.username === newUser.username;
    }).length;
    if (duplicateUser) {
      return throwError({
        error: {
          message: 'Username "' + newUser.username + '" is already taken',
        },
      });
    }
    newUser.id = this.getRandomId();
    this.users = this.users.concat([newUser]);
    localStorage.setItem('users', JSON.stringify(this.users));
    return of(new HttpResponse({ status: 200 }));
  }

  updateUser(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      const urlParts = request.url.split('/');
      const newUser = request.body;
      const id = parseInt(urlParts[urlParts.length - 1]);
      this.users = this.users.filter((user) => user.id !== id);
      this.users = this.users.concat(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
      return of(new HttpResponse({ status: 200 }));
    } else {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  deleteUser(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);
      const users = [...this.users];
      this.users = users.filter((user) => user.id !== id);
      localStorage.setItem('users', JSON.stringify(this.users));
      return of(new HttpResponse({ status: 200 }));
    } else {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  getTodos(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      return of(new HttpResponse({ status: 200, body: this.todos }));
    } else {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  getTodoById(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);
      const todo = this.todos.filter((item) => item.id === id)[0];
      return of(new HttpResponse({ status: 200, body: todo }));
    } else {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  saveTodo(request: HttpRequest<any>) {
    const todo = { ...request.body };
    todo.id = this.getRandomId();
    this.todos = this.todos.concat([todo]);
    localStorage.setItem('todos', JSON.stringify(this.todos));

    return of(new HttpResponse({ status: 200 }));
  }

  updateTodo(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      const urlParts = request.url.split('/');
      const newTodo = { ...request.body };
      const id = parseInt(urlParts[urlParts.length - 1]);
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.todos = this.todos.concat(newTodo);
      localStorage.setItem('todos', JSON.stringify(this.todos));

      return of(new HttpResponse({ status: 200 }));
    } else {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  deleteTodo(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);
      const todos = [...this.todos];
      this.todos = todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(this.todos));

      // respond 200 OK
      return of(new HttpResponse({ status: 200 }));
    } else {
      // return 401 not authorised if token is null or invalid
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  completeTodo(request: HttpRequest<any>) {
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);
      const todos = [...this.todos];
      const todo = todos.find((item) => item.id === id);
      todo.done = !todo.done;
      this.todos = todos;
      localStorage.setItem('todos', JSON.stringify(this.todos));

      // respond 200 OK
      return of(new HttpResponse({ status: 200 }));
    } else {
      // return 401 not authorised if token is null or invalid
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }
  private getRandomId() {
    return new Date().valueOf();
  }
}
