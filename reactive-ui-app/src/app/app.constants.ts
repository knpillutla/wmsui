import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConstants {

    VPRole = 'Vice President';
    ManagerRole = 'Manager';
    ExecutiveRole = 'Executive';

    GetApiDomain() {
        return environment.ApiUrlDomain;
    }
}
