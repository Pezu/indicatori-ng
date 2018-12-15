import { Utils } from './services/utils.service';
import { SimplemodalComponent } from './utils/simplemodal.component';
import { YesnomodalComponent } from './utils/yesnomodal.component';
import { DataKeeperService } from './services/datakeeper.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { MessageService } from './services/message.service';
import { SecurityService } from './services/security.service';
import { CatalogService } from './services/catalog.service';
import { LoginComponent } from './login/login.component';
import { CheltuieliAddComponent } from './cheltuieli-add/cheltuieli-add.component';
import { CheltuieliSplitComponent } from './cheltuieli-add/cheltuieli-split.component';
import { CheltuieliViewComponent } from './cheltuieli-add/cheltuieli-view.component';
import { SplitOnCustomComponent } from './cheltuieli/split-on-custom.component';
import { SplitOnPercentageComponent } from './cheltuieli/split-on-percentage.component';
import { SplitOnUniversalComponent } from './cheltuieli/split-on-universal.component';
import { RapoarteComponent } from './reports/rapoarte.component';
import { DatelunareComponent } from './dateLunare/dateLunare.component';
import { HomePageComponent } from './home/home-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { AddExpenseModalComponent } from './cheltuieli-add/add-expense-modal.component';
import { AdminMenuComponent } from './admin/admin-menu.component';
import { AdminArticolComponent } from './admin/admin-articol.component';
import { AdminUserComponent } from './admin/admin-user.component';
import { InventarComponent } from './inventar/inventar.component';
import { InventarAddComponent } from './inventar/inventar-add.component';
import { InventarMoveComponent } from './inventar/inventar-move.component';
import { InventarDetailsComponent } from './inventar/inventar-details.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/userlogin', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, children: [
    { path: 'facturi', component: CheltuieliAddComponent },
    { path: 'rapoarte', component: RapoarteComponent },
    { path: 'inventar', component: InventarComponent },
    // { path: 'emptyReport', component: EmptyReportComponent },
    { path: 'date_lunare', component: DatelunareComponent }
                                                            ] },
  { path: 'userlogin', component: LoginComponent },
  { path: 'admin', component: AdminMenuComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    RapoarteComponent,
    DatelunareComponent,
    SimplemodalComponent,
    SplitOnCustomComponent,
    SplitOnPercentageComponent,
    SplitOnUniversalComponent,
    CheltuieliAddComponent,
    CheltuieliSplitComponent,
    AddExpenseModalComponent,
    YesnomodalComponent,
    AdminMenuComponent,
    AdminArticolComponent,
    CheltuieliViewComponent,
    AdminUserComponent,
    InventarComponent,
    InventarAddComponent,
    InventarMoveComponent,
    InventarDetailsComponent
  ],
  imports: [
    FormsModule,
    NgSelectModule,
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
    CatalogService,
    DataKeeperService,
    Utils
  ],
  entryComponents: [
    SimplemodalComponent,
    AddExpenseModalComponent,
    YesnomodalComponent,
    CheltuieliSplitComponent,
    CheltuieliViewComponent,
    InventarAddComponent,
    InventarMoveComponent,
    InventarDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
