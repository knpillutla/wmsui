import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-other-settings',
  templateUrl: './other-settings.component.html',
  styleUrls: ['./other-settings.component.scss']
})
export class OtherSettingsComponent implements OnInit {
  @Input() Id: any;
  themes = ['red', 'green', 'blue', 'yellow', 'pink', 'orange', 'violet', 'purple', 'magenta', 'gray', 'chocolate', 'cyan'];
  oldPassword = '';
  newPassword = '';
  confirmPass = '';
  errormessage = '';
  @ViewChild('f') changePasswodForm: NgForm;

  constructor(private loginService: LoginService,
    private userService: UserService,
    private loader: LoaderService,
    private toastrService: ToastrService) { }

  ngOnInit() {
  }
  ChangeMenuType(menu) {
    const payload = {};
    payload['id'] = this.Id;
    payload['menuType'] = menu;
    this.loginService.UpdateMenuType(payload)
      .subscribe(
        (res: any) => {
          if (res) {
            this.loader.hide();
            // this.userService.SetUserDatainSession(res);
            this.toastrService.success('Success', 'Menutype updated in background Successfully.');
          }
        },
        (er) => {
          console.error(er);
          this.toastrService.error('Error', 'Something went wrong ! ' + er.error.errorMsg);
          this.loader.hide();
        });
  }

  ChangeUserTheme(theme) {
    const payload = {};
    payload['id'] = this.Id;
    payload['theme'] = theme;
    this.loginService.UpdateTheme(payload)
      .subscribe(
        (res: any) => {
          if (res) {
            this.loader.hide();
            this.userService.SetUserDatainSession(res);
            this.toastrService.success('Success', 'Theme updated in background Successfully.');
          }
        },
        (er) => {
          console.error(er);
          this.toastrService.error('Error', 'Something went wrong ! ' + er.error.errorMsg);
          this.loader.hide();
        });
  }



  isDisabled() {
    if (this.oldPassword === '') {
      return true;
    }

    if (this.newPassword === '' || this.newPassword !== this.confirmPass) {
      return true;
    }
    return false;
  }

  onSubmitPassword() {
    console.log(this.changePasswodForm.value.passwordGroupData, this.Id);
    const payload = this.changePasswodForm.value.passwordGroupData;
    payload['id'] = this.Id;
    this.loginService.UpdatePassword(payload)
      .subscribe(
        (res: any) => {
          if (res) {
            this.loader.hide();
            this.toastrService.success('Success', 'password updated Successfully.');
          }
        },
        (er) => {
          console.error(er);
          this.toastrService.error('Error', 'Something went wrong ! ' + er.error.errorMsg);
          this.loader.hide();
        });
  }

}
