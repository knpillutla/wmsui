import { Injectable } from '@angular/core';
import { AuthServices } from '../auth.services';
import { SessionStorageService } from 'angular-web-storage';

export interface SignUpDataTempModel {
  email?: string;
  name?: string;
  token?: string;
  provider?: string;
  username?: string;
}

@Injectable()
export class UserService {
  private signUpData: SignUpDataTempModel = {};
  timeout: 3600;
  constructor(private auth: AuthServices, private sessionService: SessionStorageService) { }

  SetSocialUserDatainSession(data: any) {
    this.sessionService.set('LOGINSOCIAL', data, this.timeout, 's');
  }

  SetUserDatainSession(data: any) {
    this.sessionService.set('LOGIN', data, this.timeout, 's');
  }
  GetUserDataFromSession() {
    return this.sessionService.get('LOGIN');
  }

  GetUserDataIdFromSession() {
    const data = this.sessionService.get('LOGIN');
    return data && data.id ? data.id : null;
  }


  LogoutUserData() {
    this.sessionService.clear();
    this.auth.isLoggedIn = false;
  }

  SetSignUpData(data) {
    this.signUpData = data;
  }

  GetSignUpData(): SignUpDataTempModel {
    return this.signUpData;
  }



}
