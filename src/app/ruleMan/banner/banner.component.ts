import { Component, OnInit } from '@angular/core';
import {HttpService,uploadurl,imgUrl} from "../../service/http/http.service";
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {
	validateForm: FormGroup;
	isVisibleMiddle=false;
	isedit=false;
	pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  title:string;  
  page_url:string;
  num:string;
  id:string;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,private fb: FormBuilder,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.searchData();
  	    /*表单验证设置*/
    this.validateForm = this.fb.group({
      title: [ this.title, [ Validators.required ] ],
      page_url:[this.page_url],
      num: [ this.num, [ Validators.required ,Validators.pattern(/^[0-9]*$/)] ],
    });
  }
  searchData(): void {
    this.loading = true;
     this.http.httpmender("rulesmanagemnet/bannerlist",{"currentPage":this.pageIndex,"pageSize":this.pageSize})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
        this.dataSet=data.data.list;
        this.loading = false;
        this.total = data.data.totalResult;
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
  search():void{
  	this.pageIndex=1;
  	this.searchData();
  }
     //模态框
  showModalMiddle(): void {
    this.isVisibleMiddle = true;
	  this.validateForm.reset();
	  this.picture='';
	  this.pic_url='';
  }
  
  showedit(item:any):void{
  	this.id=item.id;
  	this.isedit=true;
  	this.title=item.title;  
	  this.pic_url=item.pic_url;
	  this.picture=this.imgUrl+item.pic_url;
	  this.page_url=item.page_url;
	  this.num=item.num;
  }
  hideedit():void{
  	this.isedit=false;
  }
  
  handleOkMiddle(): void {
  	for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    this.http.httpmender("rulesmanagemnet/addbanner",{"pic_url":this.pic_url,"title":this.title,"page_url":this.page_url,"num":this.num})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
      		this.message.success('新增成功!');
  				this.isVisibleMiddle = false;
  				this.searchData();
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  deleteRow(item:string): void {
  	   this.http.httpmenderdel("rulesmanagemnet/deletebanner/"+item)
      .subscribe(data=>{
      	if(data.result == "0000"){
      		this.message.success('删除成功!');
  				this.isVisibleMiddle = false;
  				this.searchData();
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
  
  submitForm():void{
  	for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
  	this.http.httpmenderput("rulesmanagemnet/updatebanner",{"id":this.id,"pic_url":this.pic_url,"title":this.title,"page_url":this.page_url,"num":this.num})
      .subscribe(data=>{
      	if(data.result == "0000"){
      		this.message.success('修改成功!');
  				this.isedit = false;
  				this.searchData();
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
  
  
   /*图片上传*/
  picture:any;//图片
  uploadurl:string=uploadurl; 
  imgUrl:string=imgUrl;
  fileList; //附件
	pic_url:string='';//上成功后返回数据
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
        self.pic_url=tempRes.data;
        self.message.success("文件上传成功！");
      } else {
        self.message.error("文件上传失败！");
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }
  
  changeFile(){
  	this.picturesc=false;
  	this.picture='';
  }

}
