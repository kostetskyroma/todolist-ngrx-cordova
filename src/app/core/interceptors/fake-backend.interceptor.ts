import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

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
          this.todos = JSON.parse(localStorage.getItem('todos')) || [];
          this.users = JSON.parse(localStorage.getItem('users')) || [];

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
    // find if any user matches login credentials
    const filteredUsers = this.users.filter((user) => {
      return (
        user.username === request.body.username &&
        user.password === request.body.password
      );
    });

    if (filteredUsers.length) {
      // if login details are valid return 200 OK with user details and fake jwt token
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
      // else return 400 bad request
      return throwError('Username or password is incorrect');
    }
  }

  getUsers(request: HttpRequest<any>) {
    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      return of(new HttpResponse({ status: 200, body: this.users }));
    } else {
      // return 401 not authorised if token is null or invalid
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  getUserById(request: HttpRequest<any>) {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      // find user by id in users array
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);
      const matchedUsers = this.users.filter((u) => {
        return u.id === id;
      });
      const user = matchedUsers.length ? matchedUsers[0] : null;

      return of(new HttpResponse({ status: 200, body: user }));
    } else {
      // return 401 not authorised if token is null or invalid
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  createUser(request: HttpRequest<any>) {
    // get new user object from post body
    const newUser = request.body;
    // validation
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
    // save new user
    newUser.id = this.users.length + 1;
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    // respond 200 OK
    return of(new HttpResponse({ status: 200 }));
  }

  updateUser(request: HttpRequest<any>) {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      // find user by id in users array
      const urlParts = request.url.split('/');
      const newUser = request.body;
      const id = parseInt(urlParts[urlParts.length - 1]);
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if (user.id === id) {
          this.users.splice(i, 1);
          this.users.push(newUser);
          localStorage.setItem('users', JSON.stringify(this.users));
          break;
        }
      }

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

  deleteUser(request: HttpRequest<any>) {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (request.headers.get('Authorization') === 'Bearer fake-token') {
      // find user by id in users array
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if (user.id === id) {
          // delete user
          this.users.splice(i, 1);
          localStorage.setItem('users', JSON.stringify(this.users));
          break;
        }
      }

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
    todo.id = this.todos.length + 1;
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
}
