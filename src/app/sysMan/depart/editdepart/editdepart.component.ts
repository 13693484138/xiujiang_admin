import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService} from "../../../service/http/http.service";
import { LocalStorageService} from 'angular-web-storage';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-editdepart',
  templateUrl: './editdepart.component.html',
  styleUrls: ['./editdepart.component.less']
})
export class EditdepartComponent implements OnInit {
  shopid:string;
  validateForm: FormGroup;
  parmlen:number;
  simplename:string;
  fullname:string;
  pid:string;
  id:string;
  remark:string;
  num:string;
  label:string;
  edit:boolean;
  add:boolean;
  dept_edit:boolean;
  /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    if(this.parmlen==2){
    /*编辑部门*/
	  this.httpl.httpmenderput("deptmanagemnet/updatedept",{"id":this.id,"simplename": this.simplename,"fullname":this.fullname,"pid":this.pid,"remark":this.remark,"num":this.num})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.rou.navigateByUrl("home/depart");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   	
    /*新增部门*/
	  this.httpl.httpmender("deptmanagemnet/adddept",{"simplename": this.simplename,"fullname":this.fullname,"pid":this.pid,"remark":this.remark,"num":this.num})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.rou.navigateByUrl("home/depart");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }
  }

  constructor(
  	private fb: FormBuilder,
  	public router:ActivatedRoute,
  	public rou:Router, 
  	private msg: NzMessageService,
    private httpl:HttpService,
    public local: LocalStorageService
  ) {
  	  	this.router.queryParams.subscribe(Params=>{
  	  	this.parmlen=Object.keys(Params).length;
  	  	if(this.parmlen==2){
  	  		this.id=Params['id'];
  	  	}else{
  	  		this.id=Params['id'];
          this.pid=Params['pid'];
  	  	}
        
        });
  }

  ngOnInit(): void {
    if(this.local.get('permission').indexOf('dept_edit')==-1){
			this.dept_edit=false;
    }else{
			this.dept_edit=true;
    };
  	if(this.parmlen==2){
      this.label='详情';
      this.edit = true;
  	/*获取门店详情*/
     this.httpl.httpmenderget("deptmanagemnet/getdeptinfodetail/"+this.id)
      .subscribe(data=>{
      	if(data.result == '0000'){
          this.simplename=data.data.simplename;
          this.fullname=data.data.fullname;
          this.num=data.data.num;
          this.remark=data.data.remark;
          this.pid=data.data.pid;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  	}else{
      this.label='新增';
      this.add = true;
  	}
    /*表单验证设置*/
    this.validateForm = this.fb.group({
      simplename:[ this.simplename, [ Validators.required ]],
      fullname:[this.fullname,[ Validators.required ]],
      num:[ this.num,[ Validators.required,Validators.pattern(/^[0-9]*$/) ]],
      remark:[this.remark],
    });
    
    

  }
}

