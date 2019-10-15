import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-regulatory-inispection',
  templateUrl: './regulatory-inispection.component.html',
  styleUrls: ['./regulatory-inispection.component.css']
})
export class RegulatoryInispectionComponent implements OnInit {

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
      this.pageTitle = "New Regulatory Inispection Document";
      this.isNew = true;
    }
    else {
      this.pageTitle = 'View Regulatory Inispection Document';
      this.isView = true;
    }
    
  }
  editThis() {
    this.isEditClick = true;
    this.pageTitle = 'Edit Regulatory Inispection Document';
  }
  resetAndBack() {
    this.router.navigate(['/regulatory-inispection-doc']);
  }

}
