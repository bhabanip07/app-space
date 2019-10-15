import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-regulatory-inispection-doc',
  templateUrl: './regulatory-inispection-doc.component.html',
  styleUrls: ['./regulatory-inispection-doc.component.css']
})
export class RegulatoryInispectionDocComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  editLicenseDocument() {
    this.router.navigate(['/regulatory-inispection/2']);
  }
}
