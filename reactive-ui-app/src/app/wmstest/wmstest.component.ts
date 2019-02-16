import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WmsTestModel } from '../models/wmstest.model';
import { LoaderService } from '../loader/loader.service';
import { HttpResponse } from '@angular/common/http';
import { WmsTestService, WmsTestDataTempModel } from '../services/wmstest.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-wmstest',
  templateUrl: './wmstest.component.html',
  styleUrls: ['./wmstest.component.scss']
})
export class WmsTestComponent implements OnInit {
  bsModalRef: BsModalRef;

  errormessage;
  wmstestData: WmsTestDataTempModel;
  @ViewChild('f') wmstestForm: NgForm;
  payload: WmsTestDataTempModel = {};
  busName: string;
  facilityNbr: string;
  numOfOrders: string;
  numOfLines: number;
  numOfLineAttribs: number;
  releaseOrders: boolean;
  runEndToEndTest: boolean;

  constructor(private wmstestService: WmsTestService,
    private loader: LoaderService,
    private wmstestservice: WmsTestService,
    private modalService: BsModalService,
    private router: Router) { }


  ngOnInit() {
  }

  onSubmit() {

    // tslint:disable-next-line:forin
    for (const k in this.wmstestForm.value.wmstestData) {
      this.payload[k] = this.wmstestForm.value.wmstestData[k];
      console.log("payload key:" + this.payload[k]);
      console.log("payload value:" + this.wmstestForm.value.wmstestData[k]);
    }

    this.payload.busName = "XYZ";
    this.payload.facilityNbr = "3456";
    console.log("autoReleaseOrders value:" + this.wmstestForm.value.wmstestData["releaseOrders"]);
console.log("runEndToEndTest value:" + this.wmstestForm.value.wmstestData["runEndToEndTest"]);
 //   this.payload.numOfOrders = this.wmstestData.numOfOrders;
 //   this.payload.numOfLines = this.wmstestData.numOfLines;
	//this.payload.numOfLineAttribs = this.wmstestData.numOfLineAttribs;
	//this.payload.releaseOrders = this.wmstestData.autoReleaseOrders;
	if(this.wmstestForm.value.wmstestData["runEndToEndTest"]){
        console.log("starting end to end test");
		this.wmstestService.runEndToEndTest(this.payload)
		  .subscribe(
			(res: HttpResponse<any>) => {
			  if (res && res.body) {
				this.loader.hide();
				this.Confirm('End To End Test is successful.');
			  }
			},
			(er) => {
			  console.error(er);
			  this.errormessage = 'Something went wrong ! ' + er.error.errorMsg;
			  this.loader.hide();
			});
        console.log("completed end to end test");
   }
    else
    {
        console.log("started creating orders");
		this.wmstestService.createOrders(this.payload)
		  .subscribe(
			(res: HttpResponse<any>) => {
			  if (res && res.body) {
				this.loader.hide();
				this.Confirm('Create Orders Successful');
			  }
			},
			(er) => {
			  console.error(er);
			  this.errormessage = 'Something went wrong ! ' + er.error.errorMsg;
			  this.loader.hide();
			});
        console.log("completed creating orders");
    }
    this.loader.hide();
  }

  Confirm(msg) {
    const initialState = {
      formTitle: 'Acknowledgment',
      Mode: 'SignupConfirm',
      URL: '',
      Message: msg,
      ConfirmButton: 'OK'
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { initialState });
  }

}
