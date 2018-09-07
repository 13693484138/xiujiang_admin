import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ButtonsComponent } from './home/buttons/buttons.component';
import { TableComponent } from './home/table/table.component';
import { FormComponent } from './home/form/form.component';
import { CardsComponent } from './home/cards/cards.component';
import { SimpleTableComponent } from './home/simple-table/simple-table.component';
import { UploadComponent } from './home/upload/upload.component';
import { PanelComponent } from './home/panel/panel.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { StepsComponent } from './home/steps/steps.component';
import { ProgressComponent } from './home/progress/progress.component';
import { MentionComponent } from './home/mention/mention.component';
import { AntvComponent } from './home/antv/antv.component';

import { UserComponent } from './sysMan/user/user.component';
import { RoleComponent } from './sysMan/role/role.component';
import { DepartComponent } from './sysMan/depart/depart.component';
import { MenuComponent } from './sysMan/menu/menu.component';
import { NoticeComponent } from './sysMan/notice/notice.component';
import { ShopComponent } from './shopMan/shop/shop.component';
import { TechnicianListComponent } from './shopMan/technician-list/technician-list.component';
import { ShopaddComponent } from './shopMan/shopadd/shopadd.component';
import { TechnicianDetailComponent } from './shopMan/technician-detail/technician-detail.component';
import { AllorderComponent } from './orderMan/allorder/allorder.component';
import { AftersaleComponent } from './orderMan/aftersale/aftersale.component';
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

const routes:Routes=[
{path:"",redirectTo:"login",pathMatch:"full"},
{path:"login",component:LoginComponent},
{path:"home",component:HomeComponent,
	children:[
	{path:'',component:ButtonsComponent},
	//ui组件
	{path:"buttons",component:ButtonsComponent},
	{path:"table",component:TableComponent},
	{path:"form",component:FormComponent},
	{path:"card",component:CardsComponent},
	{path:"simple-table",component:SimpleTableComponent},
	{path:"upload",component:UploadComponent},
	{path:"panel",component:PanelComponent},
	{path:"carousel",component:CarouselComponent},
	{path:"steps",component:StepsComponent},
	{path:"progress",component:ProgressComponent},
	{path:"mention",component:MentionComponent},
	{path:"antv",component:AntvComponent},
	//系统管理
	//系统管理-user
	{path:"user",component:UserComponent},
	{path:"edituser",component:EdituserComponent},
	{path:"role",component:RoleComponent},
	//系统管理-depart
	{path:"depart",component:DepartComponent},
	{path:"editdepart",component:EditdepartComponent},
	
	{path:"menu",component:MenuComponent},
	//系统管理-notice
	{path:"notice",component:NoticeComponent},
	{path:"editnotice",component:EditnoticeComponent},
	//门店管理
	{path:"shop",component:ShopComponent},
	{path:"technicianlist",component:TechnicianListComponent},
	{path:"shopadd",component:ShopaddComponent},
	{path:"techniciandetail",component:TechnicianDetailComponent},
	//订单管理
	{path:"allorder",component:AllorderComponent},
	{path:"aftersale",component:AftersaleComponent},
	{path:"orderdetail",component:OrderdetailComponent},
	//配件管理
	{path:"part",component:PartlistComponent},
	{path:"partclass",component:PartclassComponent},
	{path:"partorder",component:PartorderComponent},
	{path:"addpart",component:AddpartComponent},
	{path:"addpartclass",component:AddpartclassComponent},
	{path:"editpartorder",component:EditpartorderComponent},
	//维修管理
	{path:"brand",component:BrandlistComponent},
	{path:"fault",component:FaultlistComponent},
	{path:"model",component:ModellistComponent},
	{path:"editbrand",component:EditbrandComponent},
	{path:"editfault",component:EditfaultComponent},
	{path:"editmodel",component:EditmodelComponent},
	//规则管理
	{path:"banner",component:BannerComponent},
	{path:"basic",component:BasiclistComponent},
	{path:"distri",component:DistributionratiolistComponent},
	
	]
}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
