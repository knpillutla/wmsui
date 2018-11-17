import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageServices {

  KEY = 'value';
  value: any = null;

  constructor(public local: LocalStorageService, public session: SessionStorageService) { }


  set(expired: number = 0) {
    this.local.set(this.KEY, { a: 1, now: +new Date }, expired, 's');
  }

  remove() {
    this.local.remove(this.KEY);
  }

  get() {
    this.value = this.local.get(this.KEY);
  }

  clear() {
    this.local.clear();
  }
}
