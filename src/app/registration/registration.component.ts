import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../core/services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    this.userService
      .register(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Successfully registered');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }
}
