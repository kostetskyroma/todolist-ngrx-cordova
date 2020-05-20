import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateInterceptor<T> implements HttpInterceptor {
  intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<T>) => {
        if (event instanceof HttpResponse) {
          const response = event.clone();

          this.convert(response.body);

          return response;
        }

        return event;
      })
    );
  }

  private isISODate(dateString: string) {
    return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z/.test(dateString);
  }

  private convert(body: unknown | null) {
    if (!(body instanceof Object)) {
      return;
    }

    if (body instanceof Array) {
      for (const item of body) {
        this.convert(item);
      }
    }

    for (const [key, value] of Object.entries(body)) {
      if (value instanceof Array) {
        for (const item of value) {
          this.convert(item);
        }
      }

      if (value instanceof Object) {
        this.convert(value as unknown);
      }

      if (typeof value === 'string' && this.isISODate(value)) {
        body[key] = new Date(value);
      }
    }
  }
}
