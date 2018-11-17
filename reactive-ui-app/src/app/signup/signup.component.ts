import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpModel } from '../models/signup.model';
import { SignupService } from '../services/signup.service';
import { LoaderService } from '../loader/loader.service';
import { HttpResponse } from '@angular/common/http';
import { UserService, SignUpDataTempModel } from '../services/user.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  bsModalRef: BsModalRef;

  errormessage;
  signupData: SignUpDataTempModel;
  @ViewChild('f') signupForm: NgForm;
  payload: SignUpModel = {};
  email: string;
  userid: string;
  provider: string;
  firstName: string;

  constructor(private signupService: SignupService,
    private loader: LoaderService,
    private userservice: UserService,
    private modalService: BsModalService,
    private router: Router) { }


  ngOnInit() {

    // Handle confirmation event and take user to login
    this.modalService.onHide.subscribe((reason: string) => {
      if (this.bsModalRef && this.bsModalRef.content) {
        this.router.navigateByUrl('/login');
      }
    });

    this.signupData = this.userservice.GetSignUpData();
    if (!this.signupData.email || !this.signupData.token) {
      this.router.navigateByUrl('/login');
    }
    this.email = this.signupData.email;
    this.userid = this.signupData.username;
    this.provider = this.signupData.provider;
    this.firstName = this.signupData.name;
  }

  onSubmit() {

    // tslint:disable-next-line:forin
    for (const k in this.signupForm.value.userData) {
      this.payload[k] = this.signupForm.value.userData[k];
    }

    this.payload.locale = 'ENGLISH';
    this.payload.authToken = this.signupData.token;
    this.payload.authType = this.signupData.provider;
    this.payload.userName = this.signupData.email;
    if (this.signupData.provider && this.signupData.provider.length > 0) {
      this.payload.userId = this.signupData.email.replace(/@[^@]+$/, '');
    } else {
      this.payload.userId = this.signupData.username;
    }

    this.signupService.Signup(this.payload)
      .subscribe(
        (res: HttpResponse<any>) => {
          if (res && res.body) {
            this.loader.hide();
            this.Confirm('Signup successfull, please login now to access your account');
          }
        },
        (er) => {
          console.error(er);
          this.errormessage = 'Something went wrong ! ' + er.error.errorMsg;
          this.loader.hide();
        });
  }

  Confirm(msg) {
    const initialState = {
      formTitle: 'Acknowledgment',
      Mode: 'SignupConfirm',
      URL: '',
      Message: msg,
      ConfirmButton: 'OK'
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { initialState });
  }

}
