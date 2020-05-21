import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { AlertService } from '../core/components/alert/alert.service';
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
    photo: [],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private store$: Store
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    this.store$.dispatch(new SignUpAction(this.form?.value as User));
  }

  onFileChange($event) {
    if ($event.target?.files?.length) {
      const [file] = $event.target.files;
      this.getBase64(file).then((fileBase64) => {
        this.form.patchValue({ photo: fileBase64 });
        this.changeDetector.detectChanges();
      });
    }
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
