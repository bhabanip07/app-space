import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-regulatory-record-doc',
  templateUrl: './regulatory-record-doc.component.html',
  styleUrls: ['./regulatory-record-doc.component.css']
})
export class RegulatoryRecordDocComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  editLicenseDocument() {
    this.router.navigate(['/regulatory-record/2']);
  }
}
