import { Component, OnInit } from '@angular/core';
import {ShuiTest} from '../model/shui-test-model';
import {ShuiTestService} from '../services/shui-test.services';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-shui-release-test',
  templateUrl: './shui-release-test.component.html',
  styleUrls: ['./shui-release-test.component.css']
})
export class ShuiReleaseTestComponent implements OnInit {
  students: Array<object>;
  model = new ShuiTest();
  percentDone: number;
  uploadSuccess: boolean;
  
  constructor(
    private shuiTestService: ShuiTestService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getAllItems();
  }
  deleteRecord(param) {
    debugger;
    this.students = this.students.filter(entity => entity.fee_Id !== param.fee_Id);
    alert(`WIP ... ${this.model.name} deleted in local but not in DB ...`);
    // this.shuiTestService.delete(param.fee_Id)
    // .subscribe(data =>
    //    {
    //     alert(`${this.model.name} deleted succesfuly !!`);
    //   },
    //   error =>
    //   {
    //     console.log(`error occured after calling the student/delete().`);
    //     alert('error occured');
    //   }
  	// )
  }
  getAllItems(): void {
    this.shuiTestService.get().subscribe(res => {
      this.students = res.data;
    });
  }
  save() {
    this.shuiTestService.save(this.model)
    .subscribe(data =>
       {
        this.getAllItems();
        alert(`${this.model.name} saved succesfuly !!`);
        this.model = new ShuiTest();
      },
      error =>
      {
        console.log(`error occured after calling the student/save().`);
        alert('error occured');
      }
  	)
  }
  cancel() {
    this.model = new ShuiTest();
  }
  upload(files: File[]){
    
    this.uploadAndProgress(files);
  }
  uploadAndProgress(files: File[]){
    console.log(files)
    this.model.fileName = files[0].name;
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          let body = event.body[0];
          debugger;
          this.model.fileUrl =  body.link;
        }
    });
  }
}
