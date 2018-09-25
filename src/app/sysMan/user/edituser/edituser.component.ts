import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService,uploadurl,imgUrl} from "../../../service/http/http.service";
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { LocalStorageService} from 'angular-web-storage';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.less']
})
export class EdituserComponent implements OnInit {
  validateForm: FormGroup;
  dateFormat = 'yyyy-MM-dd';
  id:string;
  pagename:string;
  parmlen:number;
  account:string;
  password:string;
  name:string;
  birthday:string;
  sex:string;
  email:string;
  phone:string;
  deptid:string;
  shopid:string;
  shoplist:any;
  pcUser_edit:boolean;
  add:boolean;
  edit:boolean;
  constructor(
  	private fb: FormBuilder,
  	public router:ActivatedRoute,
  	public rou:Router, 
  	private msg: NzMessageService,
  	private httpl:HttpService,
    private sanitizer: DomSanitizer,
    public local: LocalStorageService
  ) {
  	  	this.router.queryParams.subscribe(Params=>{
  	  	this.parmlen=Object.keys(Params).length;
  	  	if(this.parmlen==2){
  	  		this.id=Params['id'];
  	  	}else{
  	  		this.id=Params['id'];
          this.deptid=Params['deptid'];
  	  	}
        
        });
  }

  ngOnInit() {
    if(this.local.get('permission').indexOf('pcUser_edit')==-1){
      this.pcUser_edit=false;
    }else{
      this.pcUser_edit=true;
    };
  	this.httpl.httpmenderget("usermanagemnet/shoplistforsysuser")
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){      	
					this.shoplist=data.data;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  	if(this.parmlen==2){
      this.pagename='详情';
      this.edit = true;
  		this.httpl.httpmenderget("usermanagemnet/getuserinfodetail/"+this.id)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){
      		this.name=data.data.name;
      		this.account=data.data.account;
      		this.picture=this.imgUrl+data.data.avatar;
      		this.birthday=data.data.birthday;
      		this.email=data.data.email;
      		this.phone=data.data.phone;
      		this.sex=data.data.sex.toString();
          this.shopid=data.data.shopid;
          this.deptid=data.data.deptid;
      	}else{
      		this.msg.error(data.msg);
      	}
      })
  		  	/*     表单验证设置    */
    this.validateForm = this.fb.group({
      account:[ this.account, [ Validators.required ]],
      password:[this.password],
      name:[ this.name,[ Validators.required]],
      sex:[this.sex,[ Validators.required]],
      email:[ this.email, [ Validators.required, Validators.pattern(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/) ]],
      phone:[this.phone,[ Validators.required ,Validators.pattern(/^1[3|4|5|7|8][0-9]\d{8}$|^(0\d{2})-(\d{8})$|^(0\d{3})-(\d{7})$|^(0\d{2})-(\d{8})-(\d+)$|^(0\d{3})-(\d{7})-(\d+)$/)]],
      shopid:[ this.shopid,[ Validators.required]],
    });
  	}else{
      this.pagename='新增';
      this.add = true;
  		  	/*表单验证设置test*/
    this.validateForm = this.fb.group({
      account:[ this.account, [ Validators.required ]],
      password:[this.password,[ Validators.required ]],
      name:[ this.name,[ Validators.required]],
      sex:[this.sex,[ Validators.required]],
      email:[ this.email, [ Validators.required , Validators.pattern(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)]],
      phone:[this.phone,[ Validators.required ,Validators.pattern(/^1[3|4|5|7|8][0-9]\d{8}$|^(0\d{2})-(\d{8})$|^(0\d{3})-(\d{7})$|^(0\d{2})-(\d{8})-(\d+)$|^(0\d{3})-(\d{7})-(\d+)$/)]],
      shopid:[ this.shopid,[ Validators.required]],
    });
  	}
  }
  
  /*图片上传*/
  picture:any;//图片
  uploadurl:string=uploadurl; 
  imgUrl:string=imgUrl;
  fileList; //附件
	mkey:string='';//上成功后返回数据
	picturesc:boolean=false;//上传按钮
	public uploadFileZQ(event){ 
	this.fileList = event.target.files; 
	this.picture=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileList[0]));
	this.picturesc=true;
	}
	
	uploader:FileUploader = new FileUploader({
    url: this.uploadurl+ "attachment/upload",
    method: "POST",
    itemAlias: "file",
    autoUpload: false,
    removeAfterUpload:true
  });
  
    uploadFile() {// 上传
    let self=this;//为闭包函数重新指定this
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        self.picturesc=false;
        let tempRes = JSON.parse(response);
        self.mkey=tempRes.data;
        self.msg.success("文件上传成功！");
      } else {
        self.msg.error("文件上传失败！");
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }
  
  changeFile(){
  	this.uploader.queue=[];
  	this.picturesc=false;
  	this.picture='';
  }
  /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return; 
    if(this.birthday){
    	let d = new Date(this.birthday);  
      this.birthday=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }else{
    	this.birthday='';
    }
    if(this.parmlen==2){
    /*编辑用户*/
	  this.httpl.httpmenderput("usermanagemnet/updateuser",{"id":this.id,"avatar": this.mkey,"account":this.account,"password":this.password,"name":this.name,"birthday":this.birthday,"sex":this.sex,"email":this.email,"phone":this.phone,"deptid":this.deptid,"shopid":this.shopid})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.rou.navigateByUrl("home/user");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   	
    /*新增用户*/
	  this.httpl.httpmender("usermanagemnet/adduser",{"avatar": this.mkey,"account":this.account,"password":this.password,"name":this.name,"birthday":this.birthday,"sex":this.sex,"email":this.email,"phone":this.phone,"deptid":this.deptid,"shopid":this.shopid})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.rou.navigateByUrl("home/user");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }
  }
}
