import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import {LicenseCondition} from '../model/license-condition';
import {environment} from '../../environments/environment';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LicenseConditionsService {

  fighters: Array<object> = [
    { licenseNumber: 'A84695752', licenseType: 'RAM DIST', siteLocation: 'Albuquerque',issueDate: '10/02/2019', expirationDate: '01/10/2019',renewalDate:'11/11/2019' },
    { licenseNumber: 'CA522662', licenseType: 'EHS', siteLocation: 'Atlanta',issueDate: '10/02/2019', expirationDate: '01/10/2019',renewalDate:'11/11/2019' },
    { licenseNumber: 'ZS84695752', licenseType: 'RAMPROD', siteLocation: 'Hackensack',issueDate: '10/02/2019', expirationDate: '01/10/2019',renewalDate:'11/11/2019' },
    { licenseNumber: 'HI4695752', licenseType: 'RAM DIST', siteLocation: 'Indianapolis',issueDate: '10/02/2019', expirationDate: '01/10/2019',renewalDate:'11/11/2019' },
    { licenseNumber: 'HE4695752', licenseType: 'PERMIT', siteLocation: 'London',issueDate: '10/02/2019', expirationDate: '01/10/2019',renewalDate:'11/11/2019' },
  ];

  constructor(public http: Http) { }
  url = environment.url
  get() {
    return of(this.fighters);
  }
  save(model){
    debugger;
    return this.http.post(this.url+'/order',model)
    .map(res=>res.json());
  };

  // source = interval(4000);
  // warningCheck = interval(180000);
}
