import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {HttpService} from "../service/http/http.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
validateForm: FormGroup;
error = '';
loading = false;
constructor(
	  private fb: FormBuilder,
	  public router:Router,
	  public msg: NzMessageService,
    private modalSrv: NzModalService,
    private http:HttpService,
		private cookieService:CookieService) {
}

ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ '15842625530', [ Validators.required,Validators.pattern(/^1\d{10}$/) ] ],
      password: [ '123456', [ Validators.required ] ],
    });
    
}

get userName() {
    return this.validateForm.controls.userName;
}
get password() {
    return this.validateForm.controls.password;
  }
submitForm(): void {
	  this.error = '';
    for (const i in this.validateForm.controls) {
    	this.validateForm.controls[ i ].markAsDirty();
    	this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.userName.invalid || this.password.invalid) return;
    
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.http.httpmenderlogin("user/login",{"userName":this.userName.value,"passWord":this.password.value})
      .subscribe(data=>{
      	if(data.result == '0000'){
      		console.log(data.data.sysUser.token);
      		this.cookieService.set('token',data.data.sysUser.token);
      		this.cookieService.set('shopid',data.data.sysUser.shopid);
      		this.router.navigateByUrl("home");
      		
      	}else{
      		this.error = data.msg;
      	}
      });  
    }, 1000);
}


}
