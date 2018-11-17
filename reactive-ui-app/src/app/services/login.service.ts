import { Injectable } from '@angular/core';
import { LoaderService } from '../loader/loader.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  constructor(
    private userservices: UserService,
    private loader: LoaderService,
    private httpClient: HttpClient) { }


  // get user details based upon login id
  GetUserDetails() {
    this.loader.show();
    const userid = this.userservices.GetUserDataIdFromSession();
    const urlToHit = environment.UserDetailUrl + userid;
    const req = new HttpRequest('GET', urlToHit);
    return this.httpClient.request(req).map(x => x);
  }

  // Authorize user again username / password
  Login(payload) {
    this.loader.show();
    const urlToHit = environment.loginurl;
    return this.httpClient.post(urlToHit, payload, { reportProgress: true }).map(x => x);
  }
}
