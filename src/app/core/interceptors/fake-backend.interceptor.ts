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
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null)
      .pipe(
        mergeMap(() => {
          // authenticate
          if (
            request.url.endsWith('/users/authenticate') &&
            request.method === 'POST'
          ) {
            // find if any user matches login credentials
            const filteredUsers = users.filter((user) => {
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

          // get users
          if (request.url.endsWith('/users') && request.method === 'GET') {
            // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-token') {
              return of(new HttpResponse({ status: 200, body: users }));
            } else {
              // return 401 not authorised if token is null or invalid
              return throwError({
                status: 401,
                error: { message: 'Unauthorized' },
              });
            }
          }

          // get user by id
          if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1]);
              const matchedUsers = users.filter((u) => {
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

          // register user
          if (
            request.url.endsWith('/users/register') &&
            request.method === 'POST'
          ) {
            // get new user object from post body
            const newUser = request.body;
            // validation
            const duplicateUser = users.filter((user) => {
              return user.username === newUser.username;
            }).length;
            if (duplicateUser) {
              return throwError({
                error: {
                  message:
                    'Username "' + newUser.username + '" is already taken',
                },
              });
            }
            // save new user
            newUser.id = users.length + 1;
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            // respond 200 OK
            return of(new HttpResponse({ status: 200 }));
          }

          // update user
          if (request.url.match(/\/users\/\d+$/) && request.method === 'PUT') {
            // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const newUser = request.body;
              const id = parseInt(urlParts[urlParts.length - 1]);
              for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.id === id) {
                  users.splice(i, 1);
                  users.push(newUser);
                  localStorage.setItem('users', JSON.stringify(users));
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

          // delete user
          if (
            request.url.match(/\/users\/\d+$/) &&
            request.method === 'DELETE'
          ) {
            // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1]);
              for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.id === id) {
                  // delete user
                  users.splice(i, 1);
                  localStorage.setItem('users', JSON.stringify(users));
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

          // pass through any requests not handled above
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
