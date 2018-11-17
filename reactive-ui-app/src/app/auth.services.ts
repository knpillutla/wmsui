import { Injectable } from '@angular/core';

import { LoaderService } from './loader/loader.service';

@Injectable()
export class AuthServices {
    urlDomain = '';
    isLoggedIn = false;

    constructor(private loader: LoaderService) { }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                if (this.isLoggedIn) {
                    resolve(true);
                } else {
                    this.loader.show();
                    setTimeout(() => {
                        this.loader.hide();
                        resolve(this.isLoggedIn);
                    }, 3000);
                }
            });
        return promise;
    }
}
