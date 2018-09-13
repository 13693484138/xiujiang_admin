import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViserModule } from 'viser-ng';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData,HashLocationStrategy , LocationStrategy } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';


import {HttpService} from "./service/http/http.service";
import { UserComponent } from './sysMan/user/user.component';
import { RoleComponent } from './sysMan/role/role.component';
import { DepartComponent } from './sysMan/depart/depart.component';
import { MenuComponent } from './sysMan/menu/menu.component';
import { NoticeComponent } from './sysMan/notice/notice.component';
import { ShopComponent } from './shopMan/shop/shop.component';
import { TechnicianListComponent } from './shopMan/technician-list/technician-list.component';
import { ShopaddComponent } from './shopMan/shopadd/shopadd.component';
import { TechnicianDetailComponent } from './shopMan/technician-detail/technician-detail.component';
import { AngularWebStorageModule } from 'angular-web-storage';

import { AllorderComponent } from './orderMan/allorder/allorder.component';
import { OrderdetailComponent } from './orderMan/orderdetail/orderdetail.component';
import { PartlistComponent } from './partsMan/partlist/partlist.component';
import { PartclassComponent } from './partsMan/partclass/partclass.component';
import { PartorderComponent } from './partsMan/partorder/partorder.component';
import { AddpartComponent } from './partsMan/addpart/addpart.component';
import { AddpartclassComponent } from './partsMan/addpartclass/addpartclass.component';
import { EditpartorderComponent } from './partsMan/editpartorder/editpartorder.component';
import { BrandlistComponent } from './repairMan/brandlist/brandlist.component';
import { FaultlistComponent } from './repairMan/faultlist/faultlist.component';
import { ModellistComponent } from './repairMan/modellist/modellist.component';
import { EditbrandComponent } from './repairMan/editbrand/editbrand.component';
import { EditfaultComponent } from './repairMan/editfault/editfault.component';
import { EditmodelComponent } from './repairMan/editmodel/editmodel.component';
import { BasiclistComponent } from './ruleMan/basiclist/basiclist.component';
import { DistributionratiolistComponent } from './ruleMan/distributionratiolist/distributionratiolist.component';
import { BannerComponent } from './ruleMan/banner/banner.component';
import { EdituserComponent } from './sysMan/user/edituser/edituser.component';
import { EditdepartComponent } from './sysMan/depart/editdepart/editdepart.component';
import { EditnoticeComponent } from './sysMan/notice/editnotice/editnotice.component';
import { PasswordComponent } from './home/password/password.component';
import { EditroleComponent } from './sysMan/role/editrole/editrole.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
		RoleComponent,
    UserComponent,
    DepartComponent,
    MenuComponent,
    NoticeComponent,
    ShopComponent,
    TechnicianListComponent,
    ShopaddComponent,
    TechnicianDetailComponent,
    AllorderComponent,
    OrderdetailComponent,
    PartlistComponent,
    PartclassComponent,
    PartorderComponent,
    AddpartComponent,
    AddpartclassComponent,
    EditpartorderComponent,
    BrandlistComponent,
    FaultlistComponent,
    ModellistComponent,
    EditbrandComponent,
    EditfaultComponent,
    EditmodelComponent,
    BasiclistComponent,
    DistributionratiolistComponent,
    BannerComponent,
    EdituserComponent,
    EditdepartComponent,
    EditnoticeComponent,
    PasswordComponent,
    EditroleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgZorroAntdModule,
    ViserModule,
    AppRoutingModule,
    FileUploadModule,
    AngularWebStorageModule
  ],
  entryComponents: [],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },{provide: LocationStrategy, useClass: HashLocationStrategy},HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
