import { Component, OnInit } from '@angular/core';
// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import {ConstantValues} from '../model/constant-values';
import {LicenseCondition} from '../model/license-condition';
import {LicenseConditionsService} from '../services/license-conditions.service';

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
  model = new LicenseCondition();

  showProgressBar=false;
  showAlertSuccess= false;
  showAlertSuccessBody= '';
  progressValue= '30';
  showAlertMessage= false;
  errorMessage ='';
  successFlag:boolean = false;
  errorFlag:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private licenseConditionsService: LicenseConditionsService,
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
  saveLicenseCond() {
    this.licenseConditionsService.save(this.model)
    .subscribe(data =>
       {
         this.progressValue = '100' ;
         this.showProgressBar = false;

        this.showAlertSuccess= true;
        this.showAlertSuccessBody= 'New License condition document is created !';
      },
      error =>
      {
        console.log(`error occured after calling the licenseConditionsService/save().`);
        this.showProgressBar = false;
        this.showAlertMessage= false;

        this.errorFlag=true;
        this.errorMessage='Error while creating licenseConditionsDocument, please try again !';

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

}
