import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListService } from '../services/list.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnDestroy {
  gridOptions;
  rfOptions;
  subscriptionMenu: Subscription;
  user: any = {};

  constructor(private listService: ListService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.GetUserDataFromSession();
    this.subscriptionMenu = this.listService.menuSelectedData.subscribe(
      (menulistitem) => {
        this.ResetOtherMenus();
        if (menulistitem.itemtype === 'list') {
          this.gridOptions = menulistitem.menu[0];
        } else if (menulistitem.itemtype === 'rf') {
          this.rfOptions = menulistitem.menu[0];
        }
      });
  }

  ResetOtherMenus() {
    this.rfOptions = undefined;
    this.gridOptions = undefined;
  }

  ngOnDestroy() {
    if (this.subscriptionMenu) {
      this.subscriptionMenu.unsubscribe();
    }
  }

}
