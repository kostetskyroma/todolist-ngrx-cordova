import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { AlertService } from '../core/components/alert/alert.service';

declare const navigator: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form = this.formBuilder.group({
    id: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    photo: [],
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef
  ) {}

  takePhoto() {
    navigator?.camera?.getPicture(
      (photo) => {
        this.form.patchValue({ photo });
        this.changeDetector.detectChanges();
        console.log(photo);
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

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.form.patchValue(user);
    });
  }

  get user$() {
    return this.route.data.pipe(
      map(({ user }) => user),
      shareReplay(1)
    );
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    this.userService.update(this.form.value).subscribe(
      () => this.alertService.success('Profile successfully updated'),
      () => this.alertService.error('Error on updating profile')
    );
  }
}
