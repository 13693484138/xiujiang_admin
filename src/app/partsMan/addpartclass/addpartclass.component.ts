import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService,imgUrl} from "../../service/http/http.service";
import { LocalStorageService} from 'angular-web-storage';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-addpartclass',
  templateUrl: './addpartclass.component.html',
  styleUrls: ['./addpartclass.component.less']
})
export class AddpartclassComponent implements OnInit {
	imgUrl:string=imgUrl;
  classid:string;
  title:string;
  explain:string;
  num:string;
  status:string='1';
  parmlen:number;
  validateForm: FormGroup;
  pagename:string;
  partsclassify_edit:boolean;
  edit:boolean;
  add:boolean;
  constructor(
  	public router:ActivatedRoute,
  	private msg: NzMessageService,
  	private httpl:HttpService,
  	private fb: FormBuilder,
  	public rou:Router,
    public local: LocalStorageService) {
	  this.router.queryParams.subscribe(Params=>{
	  	  this.parmlen=Object.keys(Params).length;
        this.classid=Params['classid'];
        });
  	}
  ngOnInit() {
  	if(this.local.get('permission').indexOf('partsclassify_edit')==-1){
    	this.partsclassify_edit=false;
    }else{
    	this.partsclassify_edit=true;
    }
  	if(this.parmlen==1){
  		this.pagename='配件分类详情';
  		this.edit=true;
  	 /*获取配件分类详情*/
     this.httpl.httpmenderget("partsmanagemnet/partsclassifydetail/"+this.classid)
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == '0000'){
						this.title=data.data.title;
						this.explain=data.data.explain;
						this.num=data.data.num;
						this.status=data.data.status.toString();
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  	}else{
  		this.pagename='新增配件分类';
  		this.add=true;
  	}
      
       /*表单验证设置*/
    this.validateForm = this.fb.group({
      title: [ this.title, [ Validators.required ] ],
      explain:[this.explain, [ Validators.required ]],
      num: [ this.num, [ Validators.required ,Validators.pattern(/^[0-9]*$/)] ],
      status:[this.status,[ Validators.required ]],
     });
  }
  
    /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    if(this.parmlen==1){
    /*编辑配件分类*/
	  this.httpl.httpmenderput("partsmanagemnet/updatepartsclassify",{"explain":this.explain,"id": this.classid,"num":this.num,"status":this.status,"title":this.title})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.rou.navigateByUrl("home/partclass");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   	
    /*新增配件*/
	  this.httpl.httpmender("partsmanagemnet/addpartsclassify",{"explain":this.explain,"num":this.num,"status":this.status,"title":this.title})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.rou.navigateByUrl("home/partclass");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }
   
   

  }

}
