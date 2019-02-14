import { Component, OnInit, ViewChild } from '@angular/core';
import { SignUpDataTempModel, UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { SignUpModel } from '../models/signup.model';
import { SignupService } from '../services/signup.service';
import { LoaderService } from '../loader/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  errormessage;
  signupData: SignUpDataTempModel;
  @ViewChild('f') signupForm: NgForm;
  payload: SignUpModel = {};
  userDataFromSession: any;
  userId: any;

  constructor(private signupService: SignupService,
    private userService: UserService,
    private loader: LoaderService,
    private toastrService: ToastrService,
    private userservice: UserService) { }

  ngOnInit() {
    console.log(this.userService.GetUserDataFromSession());
    this.userDataFromSession = this.userService.GetUserDataFromSession();
    this.userId = this.userDataFromSession.id;
  }

  onSubmit() {
    console.log(this.signupForm.value.userData);
    this.payload = this.signupForm.value.userData;
    this.payload['id'] = this.userDataFromSession.id;
    this.payload['userName'] = this.userDataFromSession.userName;
    this.payload['busName'] = this.userDataFromSession.busName;
    this.payload['defLocnNbr'] = this.userDataFromSession.defLocnNbr;

    this.signupService.UpdateUserData(this.signupForm.value.userData)
      .subscribe(
        (res: any) => {
          if (res) {
            this.loader.hide();
            this.userService.SetUserDatainSession(res);
            this.toastrService.success('Success', 'User profile data updated Successfully.');
          }
        },
        (er) => {
          console.error(er);
          this.errormessage = er.error.errorMsg;
          this.toastrService.error('Error', 'Something went wrong ! ');
          this.loader.hide();
        });
  }

}
