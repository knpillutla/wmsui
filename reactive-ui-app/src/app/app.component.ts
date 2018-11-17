import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { AuthServices } from './auth.services';
import { UserService } from './services/user.service';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private socialAuthService: AuthService,
    private authService: AuthServices,
    public loader: LoaderService,
    private userService: UserService) { }

  async ngOnInit() {
    this.socialAuthService.authState.subscribe(
      (state) => {
        if (state) {
          this.userService.SetSocialUserDatainSession(state);
        } else {
          this.authService.isLoggedIn = false;
        }
      },
      (error) => {
        // console.log(error)
      }
    );
  }


}
