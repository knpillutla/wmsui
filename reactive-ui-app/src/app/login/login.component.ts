import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionStorageService, SessionStorage } from 'angular-web-storage';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { UserService, SignUpDataTempModel } from '../services/user.service';
import { LoaderService } from '../loader/loader.service';
import { LoginService } from '../services/login.service';
import { HttpResponse } from '@angular/common/http';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedinBy = '';
  isSignUp = false;
  submitButtonText = 'Login';
  memberText = 'Not a member';
  checkBoxButtonText = 'Remember me';
  toggleText = 'Sign Up';
  errormessage = '';
  @ViewChild('f') signupForm: NgForm;

  constructor(private socialAuthService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private loader: LoaderService,
    private session: SessionStorageService,
    private userService: UserService) { }

  ngOnInit() { }

  public socialSignIn(socialPlatform: string) {

    const socialPlatformProvider = socialPlatform === 'facebook' ? FacebookLoginProvider.PROVIDER_ID
      : GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider)
      .then((userData) => {
        if (userData) {
          if (this.isSignUp) {
            this.SetUpAndNavigatetoSignUp(userData);
            return;
          }

          const loginPayload: LoginModel = {
            userName: userData.email,
            authToken: userData.token
          };
          this.loginService.Login(loginPayload)
            .subscribe((res: any) => {
              if (res) {

                this.userService.SetUserDatainSession(res);
                this.session.set('LOGIN', res, 600, 's');

                this.loader.hide();
                this.Navigate();
              }
            },
              err => {
                this.HandleError(err);
                this.SetUpAndNavigatetoSignUp(userData);
              });
        }
      })
      .catch((error) => {
        this.HandleError(error);
      });
  }

  HandleError(error) {
    console.error(error);
    this.loader.hide();
  }

  Navigate() {
    if (this.isSignUp) {
      this.router.navigateByUrl('/signup');
    } else {
      this.router.navigateByUrl('/landing');
    }
  }

  onSubmit() {
    this.errormessage = '';
    if (this.isSignUp) {
      this.SetUpAndNavigatetoSignUp();
      return;
    }

    const payload: LoginModel = {
      userName: this.signupForm.value.userData.email,
      authToken: this.signupForm.value.userData.pwd
    };

    this.loginService.Login(payload)
      .subscribe(
        (res: HttpResponse<any>) => {
          if (res) {
            this.userService.SetUserDatainSession(res);
            this.loader.hide();
            this.Navigate();
          }
        },
        (er) => {
          console.error(er.error);
          this.errormessage = 'username or password is not correct. Please try again';
          this.loader.hide();
        });
  }

  SetUpAndNavigatetoSignUp(userdata?: any) {
    let signup: SignUpDataTempModel;
    if (userdata) {
      signup = {
        username: '',
        email: userdata.email,
        provider: userdata.provider,
        token: userdata.token,
        name: userdata.name
      };
    } else {
      signup = {
        username: this.signupForm.value.userData.email,
        email: this.signupForm.value.userData.email,
        provider: '',
        token: this.signupForm.value.userData.pwd,
        name: ''
      };
    }
    this.userService.SetSignUpData(signup);
    this.router.navigateByUrl('/signup');
  }

  ToggleSignup() {
    this.submitButtonText = this.submitButtonText === 'Sign Up' ? 'Login' : 'Sign Up';
    this.memberText = this.memberText === 'Already a member' ? 'Not a member' : 'Already a member';
    this.toggleText = this.toggleText === 'Login' ? 'Sign Up' : 'Login';
    this.checkBoxButtonText = this.checkBoxButtonText === 'Agree to' ? 'Remember me' : 'Agree to';
    this.isSignUp = !this.isSignUp;
  }
}
