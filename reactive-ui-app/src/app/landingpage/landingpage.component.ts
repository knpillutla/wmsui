import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { Subscription } from 'rxjs';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { AppConstants } from '../app.constants';
import { LoginService } from '../services/login.service';
import { UserDetailsModel, MenuResourceList } from '../models/userdetails.model';
import { HttpResponse } from '@angular/common/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit, OnDestroy {

  subs: Subscription;
  user: any = {};
  leftMenuopen = true;
  userFullData: UserDetailsModel;
  menuData: MenuResourceList[];
  gridOptions;

  modalRef: BsModalRef;
  items: any[];
  sessionData: any;

  constructor(private socialAuthService: AuthService,
    private userService: UserService,
    private loginservice: LoginService,
    private loader: LoaderService,
    private router: Router,
    private session: SessionStorageService,
    private modalService: BsModalService) {
    this.items = Array(15).fill(0);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.user = this.userService.GetUserDataFromSession();
    const id = this.userService.GetUserDataIdFromSession();
    if (!id) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.loginservice.GetUserDetails().subscribe(
      (data: HttpResponse<UserDetailsModel>) => {
        if (data && data.body) {
          this.userFullData = data.body;
          this.menuData = this.userFullData.menuResourceList;
          this.loader.hide();
        }
      });
  }

  HeaderMenuClicked(menulistitem: MenuResourceList) {
    this.gridOptions = menulistitem[0];
  }


  logout() {
    if (!(this.user.provider && this.user.provider.length > 0)) {
      this.userService.LogoutUserData();
      this.router.navigateByUrl('/login');
    } else {
      this.subs = this.socialAuthService.authState.subscribe((state) => {
        if (state) {
          this.loader.show();
          this.socialAuthService.signOut()
            .then((status) => {
              this.userService.LogoutUserData();
              this.loader.hide();
              this.router.navigateByUrl('/login');
            });
        }
      });
    }

  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
