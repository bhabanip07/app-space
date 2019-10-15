import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-contact-documents',
  templateUrl: './contact-documents.component.html',
  styleUrls: ['./contact-documents.component.css']
})
export class ContactDocumentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  editLicenseDocument() {
    this.router.navigate(['/contact-doc/2']);
  }

}
