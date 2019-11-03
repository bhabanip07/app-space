import { Component, OnInit } from '@angular/core';
// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import {ConstantValues} from '../model/constant-values';
import {LicenseCondition} from '../model/license-condition';
// import {FeeTypeModel} from '../model/fee-type.model';
// import {ReportAddModel} from '../model/report-add.model';
import {LicenseConditionsService} from '../services/license-conditions.service';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-license-cond-form',
  templateUrl: './license-cond-form.component.html',
  styleUrls: ['./license-cond-form.component.css']
})
export class LicenseCondFormComponent implements OnInit {
  pageTitle = "";
  isView = false;
  isNew = false;
  isEditClick = false;
  licenseTypes= [];
  siteLocations= [];
  reportArray = [];
  feeTypeModel = [];
  model = new LicenseCondition();

  showProgressBar=false;
  showAlertSuccess= false;
  progressValue= '30';
  errorMessage ='';
  successFlag:boolean = false;
  errorFlag:boolean = false;
  percentDone: number;
  uploadSuccess: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private licenseConditionsService: LicenseConditionsService,
    private http: HttpClient,
  ) { }


  ngOnInit() {

  //populating the dropdownlist
  this.licenseTypes = ConstantValues.LICENSETYPES;
  this.siteLocations = ConstantValues.SITELOCATIONS;

  let id = this.route.snapshot.paramMap.get('id');
  if(id === '0') {
    this.pageTitle = "New License Condition Document";
    this.isNew = true;
  }
  else {
    this.pageTitle = 'View License Condition Document';
    this.isView = true;
  }

  }
  updatePhysicalPresnce(value) {
    this.model.physicalPresenceRequirement = value;
  }
  updateLicenseType(value) {
    this.model.licenseType = value;
  }
  updateSiteLocation(value) {
    this.model.siteLocation = value;
  }
  updateFeeType(value) {}
  updateReportType(value) {}

  saveLicenseCond() {
    this.showProgressBar = true;
    this.licenseConditionsService.save(this.model)
    .subscribe(data =>
       {
         this.progressValue = '100' ;
         this.showProgressBar = false;
         this.errorFlag=false;
        this.successFlag=true;
        this.router.navigate(['/license-condition-documents']);
      },
      error =>
      {
        console.log(`error occured after calling the licenseConditionsService/save().`);
        
        this.showProgressBar = false;
        this.successFlag= false;
        this.errorFlag=true;
      }
  	)
  }

  editThis() {
    this.isEditClick = true;
    this.pageTitle = 'Edit License Condition Document';
  }
  resetAndBack() {
    this.router.navigate(['/license-condition-documents']);
  }

  saveReport() {
    // document.querySelector('#report-modal').setAttribute('[visible]', false);
    //pushTo reportArray();
  }


  upload(files: File[]){
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {  
        console.log('done')
      })
  }
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File){    
    this.http.post('https://file.io', file)
      .subscribe(event => {  
        console.log('done')
      })
  }
  
  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File){    
    this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }

}
