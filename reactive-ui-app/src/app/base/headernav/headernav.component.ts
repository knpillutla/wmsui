import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MenuResourceList, DashboardResource } from 'src/app/models/userdetails.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.scss']
})
export class HeadernavComponent implements OnInit, OnChanges {
  @Input() MenuItems: MenuResourceList[];
  @Output() MenuItemSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  ngOnChanges(sc: SimpleChanges) {
    console.log(sc, this.MenuItems);

  }

  MenuClicked(menuitem: MenuResourceList, screen) {
    if (menuitem.screenResourceList) {
      this.MenuItemSelected.emit({ itemtype: 'list', menu: menuitem.screenResourceList.filter(x => x.screenName === screen) });
    } else if (menuitem.rfScreenResourceList) {
      this.MenuItemSelected.emit({ itemtype: 'rf', menu: menuitem.rfScreenResourceList.filter(x => x.screenName === screen) });
    }
  }

  ShowMeDashboard() {
    this.MenuItemSelected.emit({ itemtype: 'dashboard' });
  }



  logout() {
    this.userService.LogoutUserData();
    this.router.navigateByUrl('/login');
  }

}
