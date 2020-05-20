import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../core/components/alert/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
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
          this.alertService.success('Successfully signed-up');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }
}
