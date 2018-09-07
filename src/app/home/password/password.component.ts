import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService} from "../../service/http/http.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent implements OnInit {
  oldpwd:string;
  newpwd:string;
  repwd:string;
  validateForm: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    console.log(this.oldpwd,this.newpwd,this.repwd);
	  this.http.httpmenderput("usermanagemnet/updatepassword",{"oldpwd":this.oldpwd,"newpwd":this.newpwd,"repwd":this.repwd })
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.msg.success('修改密码成功,请重新登录');
					setTimeout(()=>{
						this.rou.navigateByUrl("login");
					},500);
					
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  
  }

  constructor(
  	private fb: FormBuilder,
  	public rou:Router, 
  	private msg: NzMessageService,
  	private http:HttpService
  ) {

  }

  ngOnInit(): void {
    /*表单验证设置*/
    this.validateForm = this.fb.group({
      oldpwd: [ this.oldpwd, [ Validators.required ] ],
      newpwd: [ this.newpwd, [ Validators.required ] ],
      repwd:[this.repwd,[ Validators.required, this.confirmationValidator  ]],
    });
  }
  
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.repwd.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newpwd.value) {
      return { confirm: true, error: true };
    }
  }
}

