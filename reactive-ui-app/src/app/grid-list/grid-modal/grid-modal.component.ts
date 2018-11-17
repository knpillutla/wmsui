import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldList } from 'src/app/models/userdetails.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GridService } from 'src/app/services/grid.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-grid-modal',
  templateUrl: './grid-modal.component.html',
  styleUrls: ['./grid-modal.component.scss']
})
export class GridModalComponent implements OnInit {
  @ViewChild('eventForm') eventForm: any;

  formTitle: string;
  Mode: string;
  URL: string;
  Fields: FieldList[];
  ConfirmButton: string;
  CloseButton: string;
  ViewModeOnly: boolean;
  Id: any;
  DetailsId: any;
  needRefreshOnClose = false;
  errormsg: '';

  constructor(
    private bsModalRef: BsModalRef, private loader: LoaderService,
    private gridService: GridService
  ) {
  }

  ngOnInit() {
    console.table(this.Fields);
    if (this.Mode !== 'Add') {
      this.gridService.Get(this.URL, this.Id, this.DetailsId).subscribe(
        (data) => {
          this.Fields.forEach(element => {
            element.initializeValue = data[element.fieldName] ? data[element.fieldName] : '';
          });
          this.loader.hide();
        },
        (res) => {
          this.errormsg = res.error.errorMsg;
          this.loader.hide();
        });
    } else {
      this.Fields.forEach(element => {
        element.initializeValue = '';
      });
    }
  }

  titleCharacterLength(len) {
  }

  IsDisabled(field) {
    if (this.Mode === 'Add') {
      return false;
    } else if (this.Mode === 'Edit') {
      return field.disableField === 'Y' ? true : false;
    } else if (this.Mode === 'View') {
      return true;
    }
  }

  CloseModal() {
    this.bsModalRef.hide();
  }

  submitForm() {
    const payload = { ...this.eventForm.value };
    this.Fields.forEach(element => {
      if (element.disableField === 'Y') {
        payload[element.fieldName] = element.initializeValue;
      }
    });
    console.log(payload);
    if (this.Mode === 'Edit' || this.Mode === 'Add') {
      this.gridService.Update(this.URL, this.Id, this.DetailsId, payload).subscribe(
        (res) => {
          this.needRefreshOnClose = true;
          this.loader.hide();
          this.CloseModal();
        },
        (res) => {
          this.errormsg = res.error.errorMsg;
          this.loader.hide();
        });
    }
    // this.CloseModal();
  }

  formatdate(evnt: any) {
    // evnt.srcElement.value = new Date(evnt.srcElement.value).toISOString();

  }


}
