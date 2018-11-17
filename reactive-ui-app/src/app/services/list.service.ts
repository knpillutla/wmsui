import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AppConstants } from '../app.constants';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class ListService {

  constructor(private appconstant: AppConstants,
    private loader: LoaderService, private httpclient: HttpClient) { }

    GetDataByUrl(url) {
    this.loader.show();
    // const req = new HttpRequest('GET', url);
    return this.httpclient.get<any>(url).map(x => x);
  }

  GetInventoryData() {
    this.loader.show();
    const urlToHit = `https://inventory.the3dsoft.com/inventory/v1/XYZ/3456/inventory`;
    const req = new HttpRequest('GET', urlToHit);
    return this.httpclient.request(req);
  }
}
