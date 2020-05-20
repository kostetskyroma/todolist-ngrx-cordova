import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

export interface Config {
  keepAfterNavigationChange: boolean;
  duration: number;
}
@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = true;
  private duration = 3000;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.keepAfterNavigationChange) {
        this.subject.next();
      }
    });
  }

  success(message: string, config?: Config) {
    this.show('success', message, config);
  }

  error(message: string, config?: Config) {
    this.show('error', message, config);
  }

  remove() {
    setTimeout(() => {
      this.subject.next();
    }, this.duration);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  private show(type: string, text: string, config?: Config) {
    this.keepAfterNavigationChange =
      config?.keepAfterNavigationChange || this.keepAfterNavigationChange;
    this.duration = config?.duration || this.duration;
    this.subject.next({ type, text });
    this.remove();
  }
}
