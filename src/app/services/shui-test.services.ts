import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
// import {LicenseCondition} from '../model/license-condition';
import {environment} from '../../environments/environment';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ShuiTestService {

  student: Array<object> = [];

  constructor(public http: Http) { }
  url = environment.url
  get() {
    return this.http.get('api/v1/shuiTest')
    .map(res=>res.json());
  }

  save(model){
    return this.http.post('api/v1/shuiTest',model)
    .map(res=>res.json());
  };
  delete(id){
    debugger;
    return this.http.delete('api/v1/shuiTest/delete',id)
    .map(res=>res.json());
  };

}
