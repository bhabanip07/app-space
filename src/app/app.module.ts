import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import{ AppspaceService } from './appspace.service';
import { LicenseCalenderComponent } from './license-calender/license-calender.component';
import { EhsOutofOfficeComponent } from './ehs-outof-office/ehs-outof-office.component';
import { RecentComponent } from './recent/recent.component';
import { SearchComponent } from './search/search.component';
import { LicenseConditionDocumentsComponent } from './license-condition-documents/license-condition-documents.component';
import { LicenseCondFormComponent } from './license-cond-form/license-cond-form.component';
import { ContactDocumentsComponent } from './contact-documents/contact-documents.component';
import { RegulatoryRecordDocComponent } from './regulatory-record-doc/regulatory-record-doc.component';
import { RegulatoryInispectionDocComponent } from './regulatory-inispection-doc/regulatory-inispection-doc.component';
import { RegulatoryInispectionComponent } from './regulatory-inispection/regulatory-inispection.component';
import { RegulatoryRecordComponent } from './regulatory-record/regulatory-record.component';
import { ContactDocComponent } from './contact-doc/contact-doc.component';
import { LogOutComponent } from './log-out/log-out.component';
import { HttpClientModule } from '@angular/common/http'
import { ExcelService } from './services/excel.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LicenseCalenderComponent,
    EhsOutofOfficeComponent,
    RecentComponent,
    SearchComponent,
    LicenseConditionDocumentsComponent,
    LicenseCondFormComponent,
    ContactDocumentsComponent,
    RegulatoryRecordDocComponent,
    RegulatoryInispectionDocComponent,
    RegulatoryInispectionComponent,
    RegulatoryRecordComponent,
    ContactDocComponent,
    LogOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule, 
  ],
  providers: [AppspaceService, ExcelService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
