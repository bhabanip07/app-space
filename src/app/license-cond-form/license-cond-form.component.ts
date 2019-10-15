import { Component, OnInit } from '@angular/core';
// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import {ConstantValues} from '../model/constant-values';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
 
  editThis() {
    this.isEditClick = true;
    this.pageTitle = 'Edit License Condition Document';
  }
  resetAndBack() {
    this.router.navigate(['/license-condition-documents']);
  }

}
