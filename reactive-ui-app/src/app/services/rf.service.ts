import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { UserService } from './user.service';
import { LoaderService } from '../loader/loader.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RfService {

  constructor(private appconstant: AppConstants,
    private userservices: UserService,
    private loader: LoaderService,
    private httpClient: HttpClient) { }

  // Update based upon id
  Post(url, payload) {
    console.log(url, payload);
    this.loader.show();
    if (payload) {
      return this.httpClient.post(url, payload, { reportProgress: true }).map(x => x);
    } else {
      return this.httpClient.post(url, { reportProgress: true }).map(x => x);
    }

  }

  // Update based upon id
  Get(url) {
    console.log("get url:" + url);
    this.loader.show();
    return this.httpClient.get(url, { reportProgress: true }).map(x => x);
  }

  /*
  // get user details based upon login id
  Get(url, parentid, dtlId = '') {
    this.loader.show();
    const urlToHit = url.replace('{id}', parentid);
    // urlToHit = urlToHit.replace('{dtlId}', dtlId);
    return this.httpClient.get(urlToHit).map(x => x);
  }

  // Update based upon id
  Update(url, parentid, dtlId, payload) {
    this.loader.show();
    let urlToHit = url.replace('{id}', parentid);
    urlToHit = urlToHit.replace('{dtlId}', dtlId);
    return this.httpClient.post(urlToHit, payload, { reportProgress: true }).map(x => x);
  }

  // delete based upon id
  Delete(url, parentid, dtlId) {
    this.loader.show();
    let urlToHit = url.replace('{id}', parentid);
    urlToHit = urlToHit.replace('{dtlId}', dtlId);
    return this.httpClient.delete(urlToHit).map(x => x);
  }

  Search(searchUrl: string, payload: any) {
    this.loader.show();
    return this.httpClient.post(searchUrl, payload, { reportProgress: true }).map(x => x);
  }
  */
}
