import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpAction } from '../store/actions/auth.actions';
import { User } from '../core/interfaces/user';
import { Store } from '@ngrx/store';
import { UserService } from '../core/services/user.service';

declare const navigator: any;

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
    private store$: Store,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  takePhoto() {
    navigator?.camera?.getPicture(
      (photo) => {
        this.form.patchValue({ photo });
        this.changeDetector.detectChanges();
        this.userService.update(this.form?.value);
        console.log(this.form.value);
      },
      (err) => {
        console.log(err);
      },
      {
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
      }
    );
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    this.store$.dispatch(new SignUpAction(this.form?.value as User));
  }
}
