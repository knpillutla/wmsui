import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { LoaderService } from '../loader/loader.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class GridService {
  urlDomain = '';

  constructor(private appconstant: AppConstants,
    private userservices: UserService,
    private loader: LoaderService,
    private httpClient: HttpClient) {
    this.urlDomain = this.appconstant.GetApiDomain();
  }


  // get user details based upon login id
  Get(url, parentid, dtlId = '') {
    console.log(url, parentid, dtlId);
    this.loader.show();
    const urlToHit = url.replace('{id}', parentid);
    // urlToHit = urlToHit.replace('{dtlId}', dtlId);
    return this.httpClient.get(urlToHit).map(x => x);
  }

  // Update based upon id
  Update(url, parentid, dtlId, payload) {
    console.log(url, parentid, dtlId);
    this.loader.show();
    let urlToHit = url.replace('{id}', parentid);
    urlToHit = urlToHit.replace('{dtlId}', dtlId);
    return this.httpClient.post(urlToHit, payload, { reportProgress: true }).map(x => x);
  }

  // delete based upon id
  Delete(url, parentid, dtlId) {
    console.log(url, parentid, dtlId);
    this.loader.show();
    let urlToHit = url.replace('{id}', parentid);
    urlToHit = urlToHit.replace('{dtlId}', dtlId);
    return this.httpClient.delete(urlToHit).map(x => x);
  }

}
