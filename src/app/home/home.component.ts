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
<<<<<<< HEAD
    this.cookieService.deleteAll();
//  this.cookieService.delete('token');
    this.router.navigateByUrl("login");
  }
=======
    this.cookieService.delete('token');
//  this.cookieService.delete('token');
    this.router.navigateByUrl("login");
  }
  cPassword(){
  	this.router.navigateByUrl("home/password");
  }
>>>>>>> e4c9ed16e0a476c09fca54d2b3044981fadc7787

gorouter(item:any){
	this.router.navigateByUrl(item);
}

}
