import { Component, TemplateRef, ViewChild,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	loading = false;
  constructor(public router:Router,public cookieService:CookieService) { }

  ngOnInit() {
  	
  }
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  
    
  logout() {
    this.cookieService.deleteAll();
//  this.cookieService.delete('token');
    this.router.navigateByUrl("login");
  }

gorouter(item:any){
	this.router.navigateByUrl(item);
}

}
