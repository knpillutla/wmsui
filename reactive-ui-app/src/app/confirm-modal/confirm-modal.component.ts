import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GridService } from 'src/app/services/grid.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {


  formTitle: string;
  Mode: string;
  URL: string;
  ConfirmButton: string;
  CloseButton: string;
  Id: any;
  needRefreshOnClose = false;
  Message: string;
  DetailsId: string;
  errormsg: string;

  constructor(
    private bsModalRef: BsModalRef, private loader: LoaderService,
    private gridService: GridService
  ) { }

  ngOnInit() {
  }

  CloseModal() {
    this.bsModalRef.hide();
  }

  submitForm() {
    if (this.Mode === 'DELETE') {
      console.log(this.URL, this.Id, this.DetailsId);
      this.gridService.Delete(this.URL, this.Id, this.DetailsId).subscribe(
        (data) => {
          this.needRefreshOnClose = true;
          this.loader.hide();
          this.CloseModal();
        },
        (res) => {
          this.errormsg = res.error.errorMsg;
          this.loader.hide();
        });
    } else if (this.Mode === 'SignupConfirm') {
      this.needRefreshOnClose = true;
      this.CloseModal();
    }
  }



}
