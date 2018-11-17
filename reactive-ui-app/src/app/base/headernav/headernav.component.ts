import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MenuResourceList } from 'src/app/models/userdetails.model';
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
    // (sc, this.MenuItems);
  }

  MenuClicked(menuitem: MenuResourceList, screen) {
    this.MenuItemSelected.emit(menuitem.screenResourceList.filter(x => x.screenName === screen));
  }

  logout() {
    this.userService.LogoutUserData();
    this.router.navigateByUrl('/login');
  }

}
