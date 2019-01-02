import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {

  GridOptions: any;
  Mode: string;
  URL: any;
  Id: any;
  AccessType: string;
  ParentRow: any;
  showContent = false;

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    if (this.GridOptions) {
      this.showContent = true;
    }
  }

  Close() {
    this.bsModalRef.hide();
  }
}
