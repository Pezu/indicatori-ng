import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { MessageService } from './services/message.service';
import { SecurityService } from './services/security.service';
import { CatalogService } from './services/catalog.service';
import { LoginComponent } from './login/login.component';
import { CheltuieliComponent } from './cheltuieli/cheltuieli.component';
import { RapoarteComponent } from './reports/rapoarte.component';
import { DatelunareComponent } from './dateLunare/datelunare.component';
import { HomePageComponent } from './home/home-page.component';
import { EmptyReportComponent } from './reports/empty-report.component';
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbTabsetModule,
  NgbTimepickerModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/userlogin', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, children: [
    { path: 'cheltuieli', component: CheltuieliComponent },
    { path: 'rapoarte', component: RapoarteComponent },
    { path: 'emptyReport', component: EmptyReportComponent },
    { path: 'date_lunare', component: DatelunareComponent }
                                                            ] },
  { path: 'userlogin', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmptyReportComponent,
    HomePageComponent,
    CheltuieliComponent,
    RapoarteComponent,
    DatelunareComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModalModule.forRoot(),
    NgbAccordionModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTabsetModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgbPaginationModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    ApiService,
    MessageService,
    SecurityService,
    CatalogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
