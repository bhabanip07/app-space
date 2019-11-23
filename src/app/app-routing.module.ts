import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
import { LoginComponent } from './login/login.component';
import { ShuiReleaseTestComponent } from './shui-release-test/shui-release-test.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  // { path: '', component: LoginComponent},
  // { path: 'dashboard', component: HomeComponent},
  { path: 'license-calender', component: LicenseCalenderComponent },
  { path: 'ehs-outof-office', component: EhsOutofOfficeComponent },
  { path: 'recent', component: RecentComponent },
  { path: 'search', component: SearchComponent },
  { path: 'license-condition-documents', component: LicenseConditionDocumentsComponent },
  { path: 'license-cond-form/:id', component: LicenseCondFormComponent },
  { path: 'regulatory-inispection/:id', component: RegulatoryInispectionComponent },
  { path: 'regulatory-record/:id', component: RegulatoryRecordComponent },
  { path: 'contact-doc/:id', component: ContactDocComponent },
  { path: 'contact-documents', component: ContactDocumentsComponent },
  { path: 'regulatory-record-doc', component: RegulatoryRecordDocComponent },
  { path: 'regulatory-inispection-doc', component: RegulatoryInispectionDocComponent },
  { path: 'log-out', component: LogOutComponent },
  { path: 'shui-release-test', component: ShuiReleaseTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
