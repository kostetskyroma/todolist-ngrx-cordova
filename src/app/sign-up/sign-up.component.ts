import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpAction } from '../store/actions/auth.actions';
import { User } from '../core/interfaces/user';
import { Store } from '@ngrx/store';

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

  constructor(private formBuilder: FormBuilder, private store$: Store) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    this.store$.dispatch(new SignUpAction(this.form?.value as User));
  }
}
