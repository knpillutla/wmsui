import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { LoaderService } from '../loader/loader.service';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface WmsTestDataTempModel {
  busName?: string;
  facilityNbr?: string;
  numOfOrders?: string;
  numOfLines?: number;
  numOfLineAttribs?: number;
  releaseOrders?: string;
  runEndToEndTest?: string;
}

@Injectable({
  providedIn: 'root'
})

export class WmsTestService {


  constructor(private appconstant: AppConstants,
    private loader: LoaderService,
    private httpClient: HttpClient) {
  }

  // get Details
  createOrders(payload) {
    this.loader.show();
    const urlToHit = environment.createOrderUrl;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const req = new HttpRequest('POST', urlToHit, payload, { headers: headers });
    return this.httpClient.request(req);
  }

  runEndToEndTest(payload) {
    this.loader.show();
    let urlToHit = environment.endToEndTestUrl;
    urlToHit = urlToHit.replace('{id}', payload.id);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post(urlToHit, payload, { headers: headers, reportProgress: true }).map(x => x);
  }


}
