import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../core/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';
import { LoginAction } from '../store/actions/auth.actions';
import { Login } from './login.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get controls() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    const payload: Login = {
      username: this.controls?.username?.value,
      password: this.controls?.password?.value,
    };
    this.store$.dispatch(new LoginAction(payload));
  }
}
