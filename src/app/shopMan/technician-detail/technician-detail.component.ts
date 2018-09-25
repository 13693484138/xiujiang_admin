import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import {HttpService,uploadurl,imgUrl} from "../../service/http/http.service";
import { NzMessageService} from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { LocalStorageService} from 'angular-web-storage';
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
	validateExamine: FormGroup;
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
	workerlist_edit:boolean;
	workerlist_audit:boolean;
	edit:boolean;
	add:boolean;
	isVisible = false;
	status:any;
	content:string;
	radioValue:string='2';
	examineName:string;
	isEexamine:boolean;
	reason:string;
  constructor(
  	private fb: FormBuilder,
  	public rou:ActivatedRoute,
  	public router:Router,
  	public http:HttpService,
  	public msg:NzMessageService,
  	private sanitizer: DomSanitizer,
  	public local: LocalStorageService
  ) { 
  	 	this.rou.queryParams.subscribe(Params=>{
  	 		this.parmlen=Object.keys(Params).length;
        this.id=Params['id'];
        this.shopid=Params['shopid'];
        });
  }

  ngOnInit() {
  	if(this.local.get('permission').indexOf('workerlist_edit')==-1){
    	this.workerlist_edit=false;
    }else{
    	this.workerlist_edit=true;
    }
    if(this.local.get('permission').indexOf('workerlist_audit')==-1){
    	this.workerlist_audit=false;
    }else{
    	this.workerlist_audit=true;
		}


		
		/*验证审核表单*/
		if(this.radioValue == '3'){
			this.isEexamine = true;
			this.validateExamine = this.fb.group({
				content: [ this.content, [ Validators.required ] ],
				radioValue:[ this.radioValue,[ Validators.required ] ]
			});
		}else{
			this.isEexamine = false;
			this.validateExamine = this.fb.group({
				content: [this.content],
				radioValue:[ this.radioValue,[ Validators.required ] ]
			});
		}

  	if(this.parmlen==2){
  		this.pagename='技师详情';
			this.edit=true;
			this.isEexamine=true;
			this.getEditList();   
      
    /*表单验证设置*/
    this.validateForm = this.fb.group({
			name: [ this.name, [ Validators.required ] ],
      nickname:[this.nickname],
			phone: [ this.phone, [ Validators.required ,Validators.pattern(/^1[3|4|5|7|8][0-9]\d{8}$|^(0\d{2})-(\d{8})$|^(0\d{3})-(\d{7})$|^(0\d{2})-(\d{8})-(\d+)$|^(0\d{3})-(\d{7})-(\d+)$/)]],
      sex:[this.sex,[ Validators.required ]],
      password:[this.password],
      birthday:[this.birthday],
      email: [ this.email, [ Validators.required , Validators.pattern(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)] ],
      isboard: [ this.isboard],
      cardid: [this.cardid,[ Validators.required ,Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]]
    });
  	}else{
  		this.pagename='新增技师';
			this.add=true;
			this.isEexamine=false;
  		/*表单验证设置*/
    this.validateForm = this.fb.group({
			name: [ this.name, [ Validators.required ] ],
      nickname:[this.nickname],
      phone: [ this.phone, [ Validators.required ,Validators.pattern(/^1[3|4|5|7|8][0-9]\d{8}$|^(0\d{2})-(\d{8})$|^(0\d{3})-(\d{7})$|^(0\d{2})-(\d{8})-(\d+)$|^(0\d{3})-(\d{7})-(\d+)$/)]],
      sex:[this.sex,[ Validators.required ]],
      password:[this.password,[ Validators.required ]],
      birthday:[this.birthday],
      email: [ this.email, [ Validators.required , Validators.pattern(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)] ],
      isboard: [ this.isboard],
      cardid: [this.cardid,[ Validators.required , Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]]
    });
  	}
 
	}

	/*详情列表*/
	getEditList(){
		this.http.httpmenderget("shopmanagemnet/getworkerdetail/"+this.id)
      .subscribe(data=>{
      	if(data.result == '0000'){ 
					console.log(data.data);    		
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
					this.status=data.data.workerInfo.status;
					this.reason=data.data.workerInfo.reason;
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
	
	
	
	uploadera:FileUploader = new FileUploader({
    url: this.uploadurl+ "attachment/upload",
    method: "POST",
    itemAlias: "file",
    autoUpload: false,
    removeAfterUpload:true
  });
  uploaderb:FileUploader = new FileUploader({
    url: this.uploadurl+ "attachment/upload",
    method: "POST",
    itemAlias: "file",
    autoUpload: false,
    removeAfterUpload:true
  });
  uploaderf:FileUploader = new FileUploader({
    url: this.uploadurl+ "attachment/upload",
    method: "POST",
    itemAlias: "file",
    autoUpload: false,
    removeAfterUpload:true
  });
  uploaderh:FileUploader = new FileUploader({
    url: this.uploadurl+ "attachment/upload",
    method: "POST",
    itemAlias: "file",
    autoUpload: false,
    removeAfterUpload:true
  });
  
    uploadFile(item:string) {// 上传
    let self=this;
    if(item == 'avatar'){
	     this.uploadera.queue[0].onSuccess = function (response, status, headers) {
	      if (status == 200) {
	        let tempRes = JSON.parse(response);
	        self.avatarid=tempRes.data;
	        self.avatarsc=false;  
	        self.msg.success("文件上传成功！");
	      } else {
	        self.msg.error("文件上传失败！");
	      }
	    };
	    this.uploadera.queue[0].upload();
    }else if(item == 'cardface'){
       this.uploaderf.queue[0].onSuccess = function (response, status, headers) {
	      if (status == 200) {
	        let tempRes = JSON.parse(response);
	        self.cardfaceid=tempRes.data;
	        self.cardfacesc=false;
	        self.msg.success("文件上传成功！");
	      } else {
	        self.msg.error("文件上传失败！");
	      }
	    };
	    this.uploaderf.queue[0].upload();
    }else if(item == 'cardback'){
	     this.uploaderb.queue[0].onSuccess = function (response, status, headers) {
	      if (status == 200) {
	        let tempRes = JSON.parse(response);
	        self.cardbackid=tempRes.data;
	        self.cardbacksc=false;
	        self.msg.success("文件上传成功！");
	      } else {
	        self.msg.error("文件上传失败！");
	      }
	    };
	    this.uploaderb.queue[0].upload();
    }else{
       this.uploaderh.queue[0].onSuccess = function (response, status, headers) {
      if (status == 200) {
        let tempRes = JSON.parse(response);
        self.cardholdid=tempRes.data;
        self.cardholdsc=false; 
        self.msg.success("文件上传成功！");
      } else {
        self.msg.error("文件上传失败！");
      }
    };
    this.uploaderh.queue[0].upload();
    }
  }
  
    changeFile(item:string){

  	if(item == 'avatar'){
    		  this.uploadera.queue=[];
        	this.avatar='';
        	this.avatarsc=false;
        }else if(item == 'cardface'){
        	this.uploaderf.queue=[];
        	this.cardface='';
        	this.cardfacesc=false;
        }else if(item == 'cardback'){
        	this.uploaderb.queue=[];
        	this.cardback='';
        	this.cardbacksc=false;
        }else{
        	this.uploaderh.queue=[];
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
    if(this.birthday){
    	let d = new Date(this.birthday);  
     this.birthday=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }else{
    	this.birthday="";
    }
     
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
	

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {	
		this.submitExamine();
		this.getEditList();
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  changeradio(){
    if(this.radioValue == '3'){
			this.isEexamine = true;
			this.validateExamine = this.fb.group({
				content: [ this.content, [ Validators.required ] ],
				radioValue:[ this.radioValue,[ Validators.required ] ]
			});
		}else{
			this.isEexamine = false;
			this.validateExamine = this.fb.group({
				content: [this.content],
				radioValue:[ this.radioValue,[ Validators.required ] ]
			});
		}
	}
	submitExamine(): void {
		for (const i in this.validateExamine.controls) {
      this.validateExamine.controls[ i ].markAsDirty();
      this.validateExamine.controls[ i ].updateValueAndValidity();
    }
		if(this.validateExamine.invalid) return;					
		this.http.httpmenderput("shopmanagemnet/auditworkerinfo",{"workid": this.id,"authorid":this.authorid,"status":this.radioValue,"reason":this.content})
		.subscribe(data => {
			if(data.result == "0000"){
				this.msg.success("审核成功！");

				this.getEditList();
				this.isVisible = false;
			}else{
				this.msg.error(data.msg);
			}
		})
	}
}
