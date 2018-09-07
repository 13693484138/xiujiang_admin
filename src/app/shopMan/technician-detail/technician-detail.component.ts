import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import {HttpService,uploadurl,imgUrl} from "../../service/http/http.service";
import { NzMessageService} from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.less']
})
export class TechnicianDetailComponent implements OnInit {
	dateFormat = 'yyyy-MM-dd';
	validateForm: FormGroup;
	shopid:string;
	pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
	parmlen:number;
  id:string;
  sex:string='1';
  name:string='';
  email:string='';
  nickname:string='';
  phone:string='';
	birthday:string;
	password:string='';
	isboard:string='1';
	cardid:string='';
	authorid:string;
	pagename:string;
  constructor(
  	private fb: FormBuilder,
  	public rou:ActivatedRoute,
  	public router:Router,
  	public http:HttpService,
  	public msg:NzMessageService,
  	private sanitizer: DomSanitizer
  ) { 
  	 	this.rou.queryParams.subscribe(Params=>{
  	 		this.parmlen=Object.keys(Params).length;
        this.id=Params['id'];
        this.shopid=Params['shopid'];
        });
  }

  ngOnInit() {
  	if(this.parmlen==2){
  		this.pagename='编辑';
  	  this.http.httpmenderget("shopmanagemnet/getworkerdetail/"+this.id)
      .subscribe(data=>{
      	if(data.result == '0000'){     		
      		this.name=data.data.workerInfo.name;
      		this.nickname=data.data.workerInfo.nickname;
      		this.email=data.data.workerInfo.email;
      		this.phone=data.data.workerInfo.phone;
      		this.dataSet=data.data.memberComplaint;
      		this.avatar=this.imgUrl+data.data.workerInfo.avatar;
      		this.authorid=data.data.workerInfo.authorid;      		
      		this.birthday=data.data.workerInfo.birthday;
      		this.cardid=data.data.workerInfo.cardid;
      		this.cardback=this.imgUrl+data.data.workerInfo.cardback;
      		this.cardface=this.imgUrl+data.data.workerInfo.cardface;
      		this.cardid=data.data.workerInfo.cardid;
      		this.cardhold=this.imgUrl+data.data.workerInfo.cardhold;
      		if(data.data.workerInfo.isboard){
      			this.isboard=data.data.workerInfo.isboard.toString();
      		}
      		if(data.data.workerInfo.sex){
      			this.sex=data.data.workerInfo.sex.toString();
      		}
      	}else{
      		this.msg.error(data.msg);
      	}
      });   
      
    /*表单验证设置*/
    this.validateForm = this.fb.group({
      name: [ this.name, [ Validators.required ] ],
      nickname:[this.nickname],
      phone: [ this.phone, [ Validators.required ,Validators.pattern(/^1[3|4|5|7|8][0-9]\d{8}$|^0\d{2,3}-?\d{7,8}$/)] ],
      sex:[this.sex,[ Validators.required ]],
      password:[this.password],
      birthday:[this.birthday],
      email: [ this.email, [ Validators.required , Validators.pattern(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)] ],
      isboard: [ this.isboard],
      cardid: [this.cardid,[ Validators.required ,Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]]
    });
  	}else{
  		this.pagename='新增';
  		/*表单验证设置*/
    this.validateForm = this.fb.group({
      name: [ this.name, [ Validators.required ] ],
      nickname:[this.nickname],
      phone: [ this.phone, [ Validators.required ,Validators.pattern(/^1[3|4|5|7|8][0-9]\d{8}$|^0\d{2,3}-?\d{7,8}$/)] ],
      sex:[this.sex,[ Validators.required ]],
      password:[this.password,[ Validators.required ]],
      birthday:[this.birthday],
      email: [ this.email, [ Validators.required , Validators.pattern(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)] ],
      isboard: [ this.isboard],
      cardid: [this.cardid,[ Validators.required , Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]]
    });
  	}
 
  }
  /*图片上传*/
  imgUrl:string=imgUrl;
  avatar:any;//图片
  cardface:any;
  cardback:any;
  cardhold:any;
  uploadurl:string=uploadurl; 
  fileList; //附件
	avatarid:string='';//上成功后返回数据
	cardfaceid:string='';
	cardbackid:string='';
	cardholdid:string='';
	avatarsc:boolean=false;//上传按钮
	cardfacesc:boolean=false;
	cardbacksc:boolean=false;
	cardholdsc:boolean=false;
	public uploadFileZQ(event,item:string){ 
	if(item == 'avatar'){//头像
		this.fileList = event.target.files; 
		this.avatar=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileList[0]));
		this.avatarsc=true;
	}else if(item == 'cardface'){//身份证正面
		this.fileList = event.target.files; 
		this.cardface=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileList[0]));
		this.cardfacesc=true;
	}else if(item == 'cardback'){//身份证背面
		this.fileList = event.target.files; 
		this.cardback=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileList[0]));
		this.cardbacksc=true;
	}else{//手持身份证
		this.fileList = event.target.files; 
		this.cardhold=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileList[0]));
		this.cardholdsc=true;
	}	
	}
	
	uploader:FileUploader = new FileUploader({
    url: this.uploadurl+ "attachment/upload",
    method: "POST",
    itemAlias: "file",
    autoUpload: false,
    removeAfterUpload:true
  });
  
    uploadFile(item:string) {// 上传
    let self=this;//为闭包函数重新指定this
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        if(item == 'avatar'){
        	self.avatarid=tempRes.data;
        	self.avatarsc=false;
        }else if(item == 'cardface'){
        	self.cardfaceid=tempRes.data;
        	self.cardfacesc=false;
        }else if(item == 'cardback'){
        	self.cardbackid=tempRes.data;
        	self.cardbacksc=false;
        }else{
        	self.cardholdid=tempRes.data;
        	self.cardholdsc=false;
        }
        self.msg.success("文件上传成功！");
      } else {
        self.msg.error("文件上传失败！");
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }
  
    changeFile(item:string){
  	if(item == 'avatar'){
        	this.avatar='';
        	this.avatarsc=false;
        }else if(item == 'cardface'){
        	this.cardface='';
        	this.cardfacesc=false;
        }else if(item == 'cardback'){
        	this.cardback='';
        	this.cardbacksc=false;
        }else{
        	this.cardhold='';
        	this.cardholdsc=false;
        }
  }


  /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
     let d = new Date(this.birthday);  
     this.birthday=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    if(this.parmlen==2){
    /*编辑技师*/
	  this.http.httpmenderput("shopmanagemnet/updateworkerinfo",{"workid": this.id,"name":this.name,"nickname":this.nickname,"avatar":this.avatarid,"phone":this.phone,"birthday":this.birthday,"sex":this.sex,"email":this.email,"password":this.password,"isboard":this.isboard,"cardid": this.cardid,"cardback": this.cardbackid,"cardface":this.cardfaceid,"cardhold":this.cardholdid,"authorid":this.authorid})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.router.navigate(["home/technicianlist"],{queryParams:{'shopid':this.shopid}});
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   	
    /*新增技师*/
	  this.http.httpmender("shopmanagemnet/addworker",{workerInfo:{name:this.name,nickname:this.nickname,avatar:this.avatarid,phone:this.phone,birthday:this.birthday,sex:this.sex,email:this.email,"password":this.password,"isboard":this.isboard},"workerAuthor":{"cardid":this.cardid,"cardback":this.cardbackid,"cardface":this.cardfaceid,"cardhold":this.cardholdid}})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.router.navigate(["home/technicianlist"],{queryParams:{'shopid':this.shopid}});
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }
   
   

  }

}
