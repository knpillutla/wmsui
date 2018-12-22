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
  AllFields: FieldList[];
  Fields: FieldList[];
  AddFields: any[];
  ViewFields: any[];
  EditFields: any[];
  SelectedRow: any;
  ConfirmButton: string;
  CloseButton: string;
  ViewModeOnly: boolean;
  Id: any;
  DetailsId: any;
  needRefreshOnClose = false;
  errormsg: '';
  IsForDetailModal = false;
  ParentRow: any;

  constructor(
    private bsModalRef: BsModalRef, private loader: LoaderService,
    private gridService: GridService
  ) {
  }

  ngOnInit() {
    if (this.Mode === 'Edit') {
      this.gridService.Get(this.URL, this.Id).subscribe(
        (data) => {
          this.EditFields.forEach(outer => {
            this.AllFields.forEach(inner => {
              if (outer.fieldName === inner.fieldName) {
                inner.initializeValue = data[inner.fieldName] ? data[inner.fieldName] : '';
                inner.disableField = outer.disableField === 'Y' ? 'Y' : 'N';
                this.Fields.push(inner);
              }
            });
          });
          this.loader.hide();
        },
        (res) => {
          this.errormsg = res.error.errorMsg;
          this.loader.hide();
        });
    } else if (this.Mode === 'Add') {
      console.table(this.AllFields);
      console.table(this.AddFields);
      this.AddFields.forEach(outer => {
        let isAdded = false;
        this.AllFields.forEach(inner => {
          if (outer.fieldName === inner.fieldName) {
            if (this.IsForDetailModal && outer.useValueFromHdr === 'Y') {
              inner.initializeValue = this.ParentRow[outer.hdrFieldName];
              // inner.fieldName = outer.hdrFieldName;
            } else {
              inner.initializeValue = outer.defaultValue;
            }

            inner.hiddenField = outer.hideField === 'Y' ? 'Y' : 'N';
            inner.disableField = outer.disableField === 'Y' ? 'Y' : 'N';
            this.Fields.push(inner);
            isAdded = true;
          }
        });
        if (!isAdded) {
          outer.initializeValue = outer.defaultValue;
          this.Fields.push(outer);
        }
      });

    } else if (this.Mode === 'View') {
      this.ViewFields.forEach(outer => {
        this.AllFields.forEach(inner => {
          if (outer.fieldName === inner.fieldName) {
            inner.initializeValue = this.SelectedRow[inner.fieldName] ? this.SelectedRow[inner.fieldName] : '';
            this.Fields.push(inner);
          }
        });
      });
    } else {
      console.log('Coming Soon');
    }
  }

  titleCharacterLength(len) {
  }

  IsDisabled(field) {
    if (this.Mode === 'Add') {
      return field.disableField === 'Y' ? true : false;
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
      console.log(element);
      if (element.hiddenField === 'Y' || element.hideField === 'Y' || element.disableField === 'Y') {
        payload[element.fieldName] = element.initializeValue;
      }
      if (element.fieldDataType === 'date') {
        payload[element.fieldName] = payload[element.fieldName] + 'T00:00:00';
      }
      if (element.fieldDataType === 'datetime' && payload[element.fieldName] && payload[element.fieldName].length <= 16) {
        payload[element.fieldName] = payload[element.fieldName] + ':00';
      }
    });

    // Hack For Now, to be removed
    payload.userId = 'Krishna';
    if ('deliveryDttm' in payload) {
      payload['expectedDeliveryDttm'] = payload['deliveryDttm'];
    }
    console.log(payload);
    if (this.Mode === 'Edit' || this.Mode === 'Add') {
      console.log(this.URL, this.Id, this.DetailsId);
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
  }

  formatdate(evnt: any) {
    // evnt.srcElement.value = new Date(evnt.srcElement.value).toISOString();

  }


}
