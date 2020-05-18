import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../core/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';
import { first } from 'rxjs/operators';

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
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get controls() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    this.authenticationService
      .login(this.controls?.username?.value, this.controls?.password?.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Logged in');
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }
}
