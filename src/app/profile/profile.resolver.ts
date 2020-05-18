import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';
import { UserService } from '../core/services/user.service';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<object> {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  resolve() {
    const currentUser = JSON.parse(this.authenticationService.getCurrentUser());
    return this.userService.getById(currentUser?.id);
  }
}
