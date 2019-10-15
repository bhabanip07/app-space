import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { LicenseConditionsService } from '../services/license-conditions.service';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-license-condition-documents',
  templateUrl: './license-condition-documents.component.html',
  styleUrls: ['./license-condition-documents.component.css']
})
export class LicenseConditionDocumentsComponent implements OnInit {
  public show = false;
  licenseConditions: Array<object>;
  constructor(private router: Router, private licenseConditionsService: LicenseConditionsService, private excelService:ExcelService) { }
  ngOnInit() {
    this.getLicenseCondition();
  }

  editLicenseDocument() {
    this.router.navigate(['/license-cond-form/2']);
  }
  getLicenseCondition(): void {
    this.licenseConditionsService.get().subscribe(res => {
      this.licenseConditions = res;
    });
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.licenseConditions, 'sample');
 }

}
