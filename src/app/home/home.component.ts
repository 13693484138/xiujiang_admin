import { Component, TemplateRef, ViewChild,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService,imgUrl} from "../service/http/http.service";
import { LocalStorageService} from 'angular-web-storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	loading = false;
	avatar:string;
	name:string;
	imgUrl:string=imgUrl;
	menu:any;
	icon:string='anticon-user';
  constructor(public router:Router,public local: LocalStorageService) { }

  ngOnInit() {
  	this.avatar=this.imgUrl+this.local.get("sysUser").avatar;
  	this.name=this.local.get("sysUser").name;
  	this.menu=this.local.get("titles");
  }
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  
    
  logout() {
    this.local.clear();
    this.router.navigateByUrl("login");
  }
  cPassword(){
  	this.router.navigateByUrl("home/password");
  }

gorouter(item:any){
	this.router.navigateByUrl(item);
}

}
