import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RfScreenResourceList, RfFieldResourceList, ButtonResource } from '../models/userdetails.model';
import { RfService } from '../services/rf.service';
import { UserService } from '../services/user.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-rf-display',
  templateUrl: './rf-display.component.html',
  styleUrls: ['./rf-display.component.scss']
})
export class RfDisplayComponent implements OnInit, OnChanges {
  @Input() RFOptions: RfScreenResourceList;
  MainFields: RfFieldResourceList[];
  trackerIndex = 0;
  ShowEndButtons = false;
  Fields: RfFieldResourceList[];
  Buttons: ButtonResource[];
  errormsg = '';
  rfTriggerData: any;
  screenField: RfFieldResourceList;
  actionInputFieldJSON = [];
  fieldDefaultValueJSON = {};

  constructor(private userservices: UserService,
    private rfservice: RfService, private loader: LoaderService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(sc: SimpleChanges) {
	  this.resetFieldValues();
	  this.updateFieldValues();
      this.NextClicked();
      this.loader.hide();
    //if (sc && sc.RFOptions && sc.RFOptions.currentValue) {
	  //this.updateFieldValues();
      //this.NextClicked();
      //this.loader.hide();
    //}
 }

  titleCharacterLength(char: any) {
  }

  NextClicked(eventFired?: any, lastfield?: RfFieldResourceList) {
      this.Fields = [];
	  console.log("NextClicked method: triggerFieldUrl exists:");
      if (lastfield && lastfield.dataTriggerUrl) {
	    this.updateFieldValues();
        const triggerField = lastfield;
        const urlToHit = this.replaceFieldValues(triggerField.dataTriggerUrl);
		console.log("krishna field name:" + triggerField.fieldName);
		console.log("krishna field value:" + triggerField.initializeValue);
		if((triggerField.dataTriggerMethod && triggerField.dataTriggerMethod === "GET") || !triggerField.dataTriggerMethod){
			console.log("Invoking get url:"+urlToHit);
			this.rfservice.Get(urlToHit).subscribe(
			  (triggerData) => {
				console.log("get trigger data:" + JSON.stringify(triggerData));
				this.rfTriggerData = triggerData;
				this.NextClicked();
				this.loader.hide();
			  }, error => {
				console.log(error);
				this.resetFieldValues();
				this.NextClicked();
				this.loader.hide();
				this.errormsg = triggerField.dataTriggerErrorMsg;
		    });
		}
		else
		{
	    const localFieldJSONList = this.fieldDefaultValueJSON;
		const inputListToActionUrl = triggerField.inputListToActionUrl;
		const payload = { };
		inputListToActionUrl.split(",").forEach(function (item) {
			payload [item.split(":")[0]] = localFieldJSONList[item.split(":")[1]];
		});
		payload[triggerField.fieldName]=triggerField.initializeValue;
		  console.log("fieldDefaultValueJSON before post:" + JSON.stringify(this.fieldDefaultValueJSON));

		this.rfservice.Post(urlToHit, payload).subscribe(
			  (triggerData) => {
				console.log("post trigger data:" + triggerData);
				this.rfTriggerData = triggerData;
				this.NextClicked();
				this.loader.hide();
			  }, error => {
				console.log(error);
				this.resetFieldValues();
				this.NextClicked();
				this.loader.hide();
				this.errormsg = triggerField.dataTriggerErrorMsg;
		    });
		}
      }
	  else
      if (lastfield && lastfield.actionUrl) {
        const actionField = lastfield;
        const urlToHit = actionField.actionUrl.replace('{userId}', this.userservices.GetUserDataFromSession().userId);
		const inputListToActionUrl = actionField.inputListToActionUrl;
		const payload = { };
	    this.updateFieldValues();
	    const localFieldJSONList = this.fieldDefaultValueJSON;

		inputListToActionUrl.split(",").forEach(function (item) {
			payload [item.split(":")[0]] = localFieldJSONList[item.split(":")[1]];
		});
		payload[actionField.fieldName]=actionField.initializeValue;
		console.log("krishna action field name:" + actionField.fieldName);
		console.log("krishna action field value:" + actionField.initializeValue);
		console.log("fieldDefaultValueJSON before post:" + JSON.stringify(this.fieldDefaultValueJSON));
        console.log("payload before post:" + JSON.stringify(payload));
        this.rfservice.Post(urlToHit, payload).subscribe(
          (triggerData) => {
            console.log("my trigger data:" + triggerData);
            this.rfTriggerData = triggerData;
            this.NextClicked();
            this.loader.hide();
          }, error => {
            console.log(error);
			this.NextClicked();
            this.loader.hide();
            this.errormsg = "error occured";
            this.loader.hide();
          });
 		this.resetFieldValues();
      }
	  else{
		console.log("in else block krishna");
		let canContinue = true;
		// tslint:disable-next-line:max-line-length
		if (lastfield && lastfield.validateInputWithField) {
		  console.log(lastfield, eventFired.srcElement.value);
		  if (eventFired.srcElement.value != this.rfTriggerData[lastfield.validateInputWithField]) {
			console.log('Value dont Match, error message is - ' + lastfield.validationFailedErrorMsg +",lastField:"+this.rfTriggerData[lastfield.validateInputWithField]+",current field value:" + eventFired.srcElement.value);
			this.errormsg = lastfield.validationFailedErrorMsg;
			canContinue = false;
			return;
		  }
		  console.log('Value Match');
		}

		if (!lastfield || canContinue) {
		console.log("else block krishna, either field is null or field is label field up screen, trackerindex:"+this.trackerIndex);
		  this.Fields = [];
		  this.errormsg = undefined;
		  const unhiddenFields = this.MainFields.filter(x => x.hideField !== 'Y');
		  let loopThrouugh = false;
		  while (loopThrouugh === false) {
		  console.log("while loop, trackerindex:"+this.trackerIndex);
			const nextField = unhiddenFields.slice(this.trackerIndex, this.trackerIndex + 1).shift();
			console.log("NextField:" + nextField.fieldName);

			if (nextField.fieldType !== 'text') {
			  nextField.initializeValue = this.rfTriggerData[nextField.fieldName];
			}
			this.Fields.push(nextField);
			if (this.trackerIndex < unhiddenFields.length - 1) {
			  this.ShowEndButtons = false;
			  this.trackerIndex++;
			} else {
			  this.ShowEndButtons = true;
			}
            console.log("while loop bottom, trackerindex:"+this.trackerIndex);
			loopThrouugh = nextField.fieldType === 'text' ? true : false;
			console.table(this.Fields, this.Fields.length);
		  }
		}
	  }
  }

  IsDisabled(field: RfFieldResourceList): boolean {
    return field.fieldType === 'text' ? false : true;
  }

  ShowDDL(field: RfFieldResourceList): boolean {
    if (field.hideField !== 'Y' && field.fieldType && field.fieldType === 'dropdown') {
      return true;
    }
    return false;
  }

  ShowTxtBox(field: RfFieldResourceList): boolean {
    if (field.hideField !== 'Y' && (!field.fieldType || field.fieldType === 'text' || field.fieldType === '')) {
	 console.log("this is krishna, show txt box is true");
      return true;
    }
	 console.log("this is krishna, show txt box is false:" + field.fieldName);
    return false;
  }

  ButtonClicked(button: ButtonResource) {
	   const payload = { };
       const urlToHit = this.replaceFieldValues(button.actionUrl);
       const inputListToActionUrl = button.inputFieldListToActionUrl;
	   const localFieldJSONList = this.fieldDefaultValueJSON;
	   inputListToActionUrl.split(",").forEach(function (item) {
			payload [item.split(":")[0]] = localFieldJSONList[item.split(":")[1]];
		});
		console.log("krishna button payload :" + JSON.stringify(payload));
    console.log('Button Clicked');
    console.log(button);
		this.rfservice.Post(urlToHit, payload).subscribe(
			  (triggerData) => {
				console.log("post trigger data:" + triggerData);
				//this.rfTriggerData = triggerData;
				this.resetFieldValues();
				this.NextClicked();
				this.loader.hide();
			  }, error => {
				console.log(error);
				//this.resetFieldValues();
				//this.NextClicked();
				//this.loader.hide();
				this.errormsg = "error occured++++++++++++++++++++++++++++++++++++++++++++";
		    });

  }
  
  updateFieldValues() {
    console.log('updateField Values start');
      this.Buttons = this.RFOptions.buttonResources;
      console.log(this.Buttons);
      this.MainFields = this.RFOptions.rfFieldResourceList;
      // this.Fields = this.RFOptions.rfFieldResourceList;
      this.MainFields.forEach(element => {
        if (element.defaultValue) {
          element.initializeValue = element.defaultValue;
		  this.fieldDefaultValueJSON[element.fieldName] = element.defaultValue;
		  console.log("fieldDefaultValueJSON" + JSON.stringify(this.fieldDefaultValueJSON));
        } 
		else
        if (element.initializeValue) {
		  this.fieldDefaultValueJSON[element.fieldName] = element.initializeValue;
		  console.log("fieldDefaultValueJSON" + JSON.stringify(this.fieldDefaultValueJSON));
        }		
		else {
          // if (element.fieldDataType === 'int') {
          //   element.initializeValue = 0;
          // }
        }
      });
		console.log('updateField Values end:' + JSON.stringify(this.fieldDefaultValueJSON));
  }

  resetFieldValues() {
    console.log('resetFieldValues Values start');
       this.trackerIndex = 0;
      this.Buttons = this.RFOptions.buttonResources;
      console.log(this.Buttons);
      this.MainFields = this.RFOptions.rfFieldResourceList;
      // this.Fields = this.RFOptions.rfFieldResourceList;
      this.MainFields.forEach(element => {
        if (element.defaultValue) {
          element.initializeValue = element.defaultValue;
		  console.log("fieldDefaultValueJSON" + JSON.stringify(this.fieldDefaultValueJSON));
        } 
		else {
          if (element.fieldDataType === 'int') {
             element.initializeValue = 0;
           }else{
			   element.initializeValue = "";
		   }
        }
      });
		console.log('resetFieldValues Values end:' + JSON.stringify(this.fieldDefaultValueJSON));
  }
  replaceFieldValues(url: any) : any {
    console.log('start replaceFieldValues:' + url);
      this.Buttons = this.RFOptions.buttonResources;
      console.log(this.Buttons);
      this.MainFields = this.RFOptions.rfFieldResourceList;
      // this.Fields = this.RFOptions.rfFieldResourceList;
      this.MainFields.forEach(element => {
		  url = url.replace('{'+element.fieldName+'}', element.initializeValue);
      });
    console.log('end  replaceFieldValues:' + url);
	return url;
  }

}
