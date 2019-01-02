import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { SearchFieldList, FieldList } from '../models/userdetails.model';
import { GridService } from '../services/grid.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {
  @Input() SearchFields: SearchFieldList[];
  @Input() AllFields: FieldList[];
  @Input() SearchURL: string;
  @Output() searchResult: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() ResetFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  Fields: FieldList[] = [];
  @ViewChild('eventForm') eventForm: any;
  constructor(private gridService: GridService, private loader: LoaderService) { }

  ngOnInit() {
  }

  ngOnChanges(sc: SimpleChanges) {
    console.log(sc.SearchFields, sc.AllFields);
    if (this.SearchFields && this.AllFields) {
      this.Init();
    }
  }

  Init() {
    console.table(this.AllFields);
    console.table(this.SearchFields);
    this.SearchFields.forEach(outer => {
      let isAdded = false;
      this.AllFields.forEach(inner => {
        if (outer.fieldName === inner.fieldName) {
          // if (this.IsForDetailModal && outer.useValueFromHdr === 'Y') {
          //   inner.initializeValue = this.ParentRow[outer.hdrFieldName];
          //   // inner.fieldName = outer.hdrFieldName;
          // } else {
          //   inner.initializeValue = outer.defaultValue;
          // }
          inner.initializeValue = outer.defaultValue;
          inner.hiddenField = outer.hideField === 'Y' ? 'Y' : 'N';
          // inner.disableField = outer.disableField === 'Y' ? 'Y' : 'N';
          this.Fields.push(inner);
          isAdded = true;
        }
      });
      if (!isAdded) {
        // outer.initializeValue = outer.defaultValue;
        // this.Fields.push(outer);
      }
    });

  }

  IsDisabled(field) {
    return false;
  }

  CleanPayload(obj: any) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj;
  }


  Search() {
    const payload = { ...this.eventForm.value };



    this.Fields.forEach(element => {
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
    // payload.userId = 'Krishna';
    // if ('deliveryDttm' in payload) {
    //   payload['expectedDeliveryDttm'] = payload['deliveryDttm'];
    // }

    const cleanedPayload = this.CleanPayload(payload);
    console.log(this.SearchURL, cleanedPayload);

    this.gridService.Search(this.SearchURL, cleanedPayload).subscribe(
      (listSearch: any) => {
        console.log(listSearch);
        this.searchResult.emit(listSearch);
        this.loader.hide();
      }, error => {
        console.log(error);
        this.loader.hide();

      });
  }

  Reset() {
    this.ResetFilter.emit(true);
  }

}
