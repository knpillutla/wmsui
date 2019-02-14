import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { LoaderService } from '../loader/loader.service';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  constructor(private appconstant: AppConstants,
    private loader: LoaderService,
    private httpClient: HttpClient) {
  }

  // get Details
  Signup(payload) {
    this.loader.show();
    const urlToHit = environment.SignupUrl;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const req = new HttpRequest('POST', urlToHit, payload, { headers: headers });
    return this.httpClient.request(req);
  }

  UpdateUserData(payload) {
    this.loader.show();
    let urlToHit = environment.UpdateUserProfile;
    urlToHit = urlToHit.replace('{id}', payload.id);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post(urlToHit, payload, { headers: headers, reportProgress: true }).map(x => x);
  }


}
