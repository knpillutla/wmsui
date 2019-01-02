import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListService } from '../../services/list.service';
import { LoaderService } from '../../loader/loader.service';
import { DtlResource, FieldList } from '../../models/userdetails.model';
import { GridModalComponent } from '../grid-modal/grid-modal.component';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import * as BsModalRefTemp from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

export interface ColumnsDef {
  headerName: string;
  field: string;
  checkboxSelection?: boolean;
}

export interface CRUD {
  GET?: string;
  PUT?: string;
  POST?: string;
  DELETE?: string;
  SEARCH?: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges {
  @Input() AccessType: string;
  @Input() GridOptions: any;
  @Input() Mode: string;
  @Input() ParentRow: any;
  @Input() Id: string;
  @Input() URL: string;

  bsModalRef: BsModalRefTemp.BsModalRef;
  errorMessage: string;
  HeaderFieldList: FieldList[];
  title: string;
  crudUrls: CRUD;
  columnDefsFlag = false;
  columnDefDynamic: ColumnsDef[] = [];
  rowData = [];
  selectedId;
  DetailOptions: DtlResource[];
  selectedRow: any;
  private gridApi;

  constructor(private listservice: ListService, private toasterService: ToastrService,
    private modalService: BsModalService, private loader: LoaderService) {
  }

  ngOnInit() {
    this.Refresh();
  }

  ngOnChanges(sc: SimpleChanges) {
    this.Refresh();
  }

  Refresh() {
    this.selectedId = undefined;
    this.columnDefsFlag = undefined;
    this.SetGridHeaders();
    setTimeout(() => {
      this.sizeToFit();
    }, 200);
  }

  GetGridData(url, id) {
    if (url === undefined || url === '' || url === null) {
      this.errorMessage = 'No List URL found. Please try again';
      return;
    }
    this.errorMessage = undefined;
    url = url.replace('{orderId}', id);
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

  SetGridHeaders() {
    if (!this.GridOptions) {
      return;
    }
    this.columnDefDynamic = [];

    this.HeaderFieldList = this.GridOptions.fieldList;
    // this.columnDefDynamic.push({
    //   headerName: 'select',
    //   field: '',
    //   checkboxSelection: true
    // });

    const listfields = this.GridOptions.listFields.split(',');
    this.HeaderFieldList.forEach((element, index) => {
      if (listfields.indexOf(element.fieldName) > -1) {
        this.columnDefDynamic.push({
          headerName: element.fieldDisplayName,
          field: element.fieldName
        });
      }
    });
    this.GetGridData(this.GridOptions.listUrl, this.Id);
    this.crudUrls = {
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
      URL: this.crudUrls.POST.replace('{orderId}', this.Id),
      AllFields: this.HeaderFieldList,
      AddFields: this.GridOptions.addResourceFieldList,
      Fields: [],
      ConfirmButton: 'Add',
      CloseButton: 'Cancel',
      ViewModeOnly: false,
      IsForDetailModal: true,
      ParentRow: this.ParentRow,
      Id: this.Id
    };
    this.bsModalRef = this.modalService.show(GridModalComponent, { initialState });
  }

  View() {
    const initialState = {
      formTitle: 'View ' + this.title,
      Mode: 'View',
      URL: this.crudUrls.GET ? this.crudUrls.GET.replace('{orderId}', this.Id) : undefined,
      AllFields: this.HeaderFieldList,
      ViewFields: this.GridOptions.viewResourceFieldList,
      Fields: [],
      SelectedRow: this.selectedRow,
      CloseButton: 'Close',
      Id: this.selectedId,
      ViewModeOnly: true,
      IsForDetailModal: true
    };
    this.bsModalRef = this.modalService.show(GridModalComponent, { initialState });
  }

  Edit() {
    const initialState = {
      formTitle: 'Edit ' + this.title,
      Mode: 'Edit',
      URL: this.crudUrls.PUT.replace('{orderId}', this.Id),
      AllFields: this.HeaderFieldList,
      EditFields: this.GridOptions.editResourceFieldList,
      Fields: [],
      ConfirmButton: 'Update',
      CloseButton: 'Cancel',
      Id: this.selectedId,
      IsForDetailModal: true
    };
    this.bsModalRef = this.modalService.show(GridModalComponent, { initialState });
  }

  Delete() {
    const initialState = {
      formTitle: 'Delete ' + this.title + ' record - Id ' + this.selectedId,
      Mode: 'DELETE',
      URL: this.crudUrls.DELETE.replace('{orderId}', this.Id).replace('{idd}', this.selectedId),
      ConfirmButton: 'OK',
      CloseButton: 'Cancel',
      Id: this.selectedId,
      IsForDetailModal: true,
      Message: 'Are you sure you want to delete this record?'
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { initialState });
  }

  ShouldDisabled() {
    return this.selectedId ? false : true;
  }

  rowSelected(data) {
    this.selectedRow = data.api.getSelectedRows()[0];
    this.selectedId = (this.selectedRow) ? this.selectedRow.id : undefined;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  sizeToFit() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

}
