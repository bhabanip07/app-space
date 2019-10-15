import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
@Component({
  selector: 'app-regulatory-record',
  templateUrl: './regulatory-record.component.html',
  styleUrls: ['./regulatory-record.component.css']
})
export class RegulatoryRecordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private service: HeroService
  ) { }
  pageTitle = "";
  isView = false;
  isNew = false;
  isEditClick = false;
  ngOnInit() {
    // this.hero$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('id')))
    // );

    let id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.service.getHero(id);
    if(id === '0') {
      this.pageTitle = "New Regulatory Record Document";
      this.isNew = true;
    }
    else {
      this.pageTitle = 'View Regulatory Record Document';
      this.isView = true;
    }
    
  }
  editThis() {
    this.isEditClick = true;
    this.pageTitle = 'Edit Regulatory Record Document';
  }
  resetAndBack() {
    this.router.navigate(['/regulatory-record-doc']);
  }

}
