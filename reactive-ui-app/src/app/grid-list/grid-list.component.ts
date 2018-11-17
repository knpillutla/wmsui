import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListService } from '../services/list.service';
import { LoaderService } from '../loader/loader.service';
import { MenuResourceList, HdrResource, DtlResource, FieldList, ScreenResourceList } from '../models/userdetails.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GridModalComponent } from './grid-modal/grid-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { DetailsModalComponent } from './details-modal/details-modal.component';


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
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit, OnChanges {
  bsModalRef: BsModalRef;
  errorMessage: string;
  AccessType: string;
  @Input() GridOptions: ScreenResourceList;
  HeaderOptions: HdrResource;
  HeaderFieldList: FieldList[];
  title: string;
  crudUrls: CRUD;

  columnDefsFlag = false;
  columnDefDynamic: ColumnsDef[] = [];
  rowData = [];
  selectedId;

  DetailOptions: DtlResource[];

  ngOnChanges(sc: SimpleChanges) {
    if (sc.GridOptions) {
      this.selectedId = undefined;
      this.columnDefsFlag = undefined;
      this.SetGridHeaders();

      console.log(this.GridOptions.dtlResources);

      this.DetailOptions = this.GridOptions.dtlResources;

    }
  }

  constructor(private listservice: ListService, private modalService: BsModalService, private loader: LoaderService) { }

  ngOnInit() {
    this.modalService.onHide.subscribe((reason: string) => {
      if (this.bsModalRef && this.bsModalRef.content) {
        if (this.bsModalRef.content.needRefreshOnClose) {
          this.GetGridData(this.HeaderOptions.listUrl);
        }
      }
    });
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
      ViewModeOnly: false
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
      Id: this.selectedId,
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
      Id: this.selectedId
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
      Id: this.selectedId,
      Message: 'Are you sure you want to delete this record?'
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { initialState });
  }

  OpenDetails() {
    const initialState = {
      GridOptions: this.DetailOptions[0],
      Mode: 'DETAILS',
      URL: '',
      Id: this.selectedId,
      AccessType: this.AccessType
    };
    this.bsModalRef = this.modalService.show(DetailsModalComponent, { initialState });
  }

  ShouldDisabled() {
    return this.selectedId ? false : true;
  }

  ShouldDetailDisabled() {
    if (this.DetailOptions && this.DetailOptions.length > 0 && this.selectedId) {
      return false;
    }
    return true;
  }

  rowSelected(data) {
    const selected = data.api.getSelectedRows()[0];
    this.selectedId = (selected) ? selected.id : undefined;
  }

  SetGridHeaders() {
    this.columnDefDynamic = [];
    this.title = this.GridOptions.screenDisplayName;
    this.AccessType = this.GridOptions.screenAccess;

    this.HeaderOptions = this.GridOptions.hdrResource;
    this.HeaderFieldList = this.HeaderOptions.fieldList;
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
    this.GetGridData(this.HeaderOptions.listUrl);

    this.crudUrls = {
      GET: this.HeaderOptions.getRecordUrl,
      PUT: this.HeaderOptions.updateRecordUrl,
      POST: this.HeaderOptions.addRecordUrl,
      DELETE: this.HeaderOptions.deleteRecordUrl
    };
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  GetGridData(url) {
    if (url === undefined || url === '' || url === null) {
      this.errorMessage = 'No List URL found. Please try again';
      return;
    }
    this.errorMessage = undefined;
    this.listservice.GetDataByUrl(url).subscribe(
      (data: any) => {
        if (data) {
          this.rowData = data;
          console.log(this.rowData);
          this.columnDefsFlag = true;
          this.loader.hide();
        }
      }, (error) => {

        this.errorMessage = error;
        this.loader.hide();
      });
  }

}
