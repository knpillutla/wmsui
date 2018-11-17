import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListService } from '../../services/list.service';
import { LoaderService } from '../../loader/loader.service';
import { DtlResource, FieldList } from '../../models/userdetails.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as BsModalRefTemp from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GridModalComponent } from '../grid-modal/grid-modal.component';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

export interface ColumnsDef {
  headerName: string;
  field: string;
  checkboxSelection?: boolean;
}

export interface CRUD {
  GET: string;
  PUT: string;
  POST: string;
  DELETE: string;
}

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {

  bsModalRef: BsModalRefTemp.BsModalRef;
  errorMessage: string;
  AccessType: string;
  GridOptions: DtlResource;
  HeaderFieldList: FieldList[];
  title: string;
  crudUrls: CRUD;
  columnDefsFlag = false;
  columnDefDynamic: ColumnsDef[] = [];
  rowData = [];
  selectedId;
  Id;
  DetailOptions: DtlResource[];

  constructor(private listservice: ListService, private thisbsModalRef: BsModalRef,
    private modalService: BsModalService, private loader: LoaderService) { }

  ngOnInit() {
    console.log(this.GridOptions);
    this.selectedId = undefined;
    this.columnDefsFlag = undefined;
    this.SetGridHeaders();

    // this.modalService.onHide.subscribe((reason: string) => {
    //   if (this.bsModalRef && this.bsModalRef.content) {
    //     if (this.bsModalRef.content.needRefreshOnClose) {
    //       this.GetGridData(this.GridOptions.listUrl);
    //     }
    //   }
    // });
  }

  SetGridHeaders() {
    console.log(this.GridOptions);
    this.columnDefDynamic = [];
    this.title = this.GridOptions.recordDisplayName;

    this.HeaderFieldList = this.GridOptions.fieldList;
    this.columnDefDynamic.push({
      headerName: 'select',
      field: '',
      checkboxSelection: true
    });
    this.HeaderFieldList.forEach((element, index) => {
      if (element.displayOptions.indexOf('list') > -1) {
        this.columnDefDynamic.push({
          headerName: element.fieldDisplayName,
          field: element.fieldName
        });
      }
    });
    console.log(this.Id, this.columnDefDynamic);
    this.GetGridData(this.GridOptions.listUrl, this.Id);

    this.crudUrls = {
      GET: this.GridOptions.getRecordUrl,
      PUT: this.GridOptions.updateRecordUrl,
      POST: this.GridOptions.addRecordUrl,
      DELETE: this.GridOptions.deleteRecordUrl
    };
  }

  CanWrite() {
    return (this.AccessType && this.AccessType.toUpperCase().indexOf('W')) > -1 ? true : false;
  }

  AddNew() {
    const initialState = {
      formTitle: 'Add New ' + this.title,
      Mode: 'Add',
      URL: this.crudUrls.POST,
      Fields: this.HeaderFieldList,
      ConfirmButton: 'Add',
      CloseButton: 'Cancel',
      ViewModeOnly: false,
      Id: this.Id,
      DetailsId: this.selectedId,
    };
    this.bsModalRef = this.modalService.show(GridModalComponent, { initialState });
  }

  View() {
    const initialState = {
      formTitle: 'View ' + this.title,
      Mode: 'View',
      URL: this.crudUrls.GET,
      Fields: this.HeaderFieldList,
      CloseButton: 'Close',
      Id: this.Id,
      DetailsId: this.selectedId,
      ViewModeOnly: true
    };
    this.bsModalRef = this.modalService.show(GridModalComponent, { initialState });
  }

  Edit() {
    const initialState = {
      formTitle: 'Edit ' + this.title,
      Mode: 'Edit',
      URL: this.crudUrls.PUT,
      Fields: this.HeaderFieldList,
      ConfirmButton: 'Update',
      CloseButton: 'Cancel',
      Id: this.Id,
      DetailsId: this.selectedId
    };
    this.bsModalRef = this.modalService.show(GridModalComponent, { initialState });
  }

  Delete() {
    const initialState = {
      formTitle: 'Delete ' + this.title + ' record - Id ' + this.selectedId,
      Mode: 'DELETE',
      URL: this.crudUrls.DELETE,
      ConfirmButton: 'OK',
      CloseButton: 'Cancel',
      Id: this.Id,
      DetailsId: this.selectedId,
      Message: 'Are you sure you want to delete this record?'
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { initialState });
  }

  Close() {
    this.thisbsModalRef.hide();
  }

  ShouldDisabled() {
    return this.selectedId ? false : true;
  }

  rowSelected(data) {
    const selected = data.api.getSelectedRows()[0];
    console.log(selected);
    this.selectedId = (selected) ? selected.id : undefined;
  }



  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  GetGridData(url, id) {

    if (url === undefined || url === '' || url === null) {
      this.errorMessage = 'No List URL found. Please try again';
      return;
    }
    this.errorMessage = undefined;
    url = url.replace('{id}', id);
    this.listservice.GetDataByUrl(url).subscribe(
      (data: any) => {
        if (data) {
          this.rowData = data;
          this.columnDefsFlag = true;
          this.loader.hide();
        }
      }, (error) => {

        this.errorMessage = error;
        this.loader.hide();
      });
  }
}
