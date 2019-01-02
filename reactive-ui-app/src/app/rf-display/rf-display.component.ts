import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RfScreenResourceList, RfFieldResourceList, ButtonResource } from '../models/userdetails.model';

@Component({
  selector: 'app-rf-display',
  templateUrl: './rf-display.component.html',
  styleUrls: ['./rf-display.component.scss']
})
export class RfDisplayComponent implements OnInit, OnChanges {
  @Input() RFOptions: RfScreenResourceList;
  Fields: RfFieldResourceList[];
  Buttons: ButtonResource[];
  errormsg = '';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc && sc.RFOptions && sc.RFOptions.currentValue) {
      this.Buttons = this.RFOptions.buttonResources;
      console.log(this.Buttons);
      this.Fields = this.RFOptions.rfFieldResourceList;
      this.Fields.forEach(element => {
        if (element.defaultValue) {
          element.initializeValue = element.defaultValue;
        } else {
          if (element.fieldDataType === 'int') {
            element.initializeValue = 0;
          }
        }
      });
      console.table(this.Fields);
    }
  }

  titleCharacterLength(char: any) {

  }

  IsDisabled(field: RfFieldResourceList): boolean {
    return false;
  }

  ShowDDL(field: RfFieldResourceList): boolean {
    if (field.hideField !== 'Y' && field.fieldType && field.fieldType === 'dropdown') {
      return true;
    }
    return false;
  }

  ShowTxtBox(field: RfFieldResourceList): boolean {
    if (field.hideField !== 'Y' && (!field.fieldType || field.fieldType === 'text' || field.fieldType === '')) {
      return true;
    }
    return false;
  }

  ButtonClicked(button: ButtonResource) {
    console.log('Button Clicked');
    console.log(button);
  }
}
