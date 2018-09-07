import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService,uploadurl,imgUrl} from "../../service/http/http.service";
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-addpart',
  templateUrl: './addpart.component.html',
  styleUrls: ['./addpart.component.less']
})
export class AddpartComponent implements OnInit {
	dateFormat = 'yyyy-MM-dd';
	validateForm: FormGroup;
  partid:string;
  title:string;
  classifyid:string;
//createtime:string;
  diprice:string;
  orprice:string;
  protect:string;
  puprice:string;
  stock:string;
  num:string;
  status:string='1';
  parmlen:number;
  classlist:any;
  pagename:string;
  constructor(
  	public router:ActivatedRoute,
  	private msg: NzMessageService,
  	private httpl:HttpService,
  	private fb: FormBuilder,
  	public rou:Router,
    private sanitizer: DomSanitizer) {
	  this.router.queryParams.subscribe(Params=>{
	  	this.parmlen=Object.keys(Params).length;
        this.partid=Params['partid'];
        });
  	}
  ngOnInit() {
  	this.httpl.httpmenderget("partsmanagemnet/partsclassify")
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){
         this.classlist=data.data;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  	if(this.parmlen==1){
  		this.pagename='编辑';
  	 /*获取配件分类详情*/
     this.httpl.httpmenderget("partsmanagemnet/partsinfodetail/"+this.partid)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){
           this.classifyid=data.data.classifyid.toString();
           this.title=data.data.title;
           this.num=data.data.num;
           this.diprice=data.data.diprice;
           this.img=this.imgUrl+data.data.img;
           this.orprice=data.data.orprice;
           this.protect=data.data.protect;
           this.puprice=data.data.puprice;
           this.status=data.data.status.toString();
           this.stock=data.data.stock;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
      }else{
      	this.pagename='新增';
      }
      
  	/*表单验证设置*/
    this.validateForm = this.fb.group({
      title: [ this.title, [ Validators.required ] ],
      num:[this.num, [ Validators.required ]],
      status:[this.status,[ Validators.required ]],
      classifyid: [ this.classifyid, [ Validators.required ] ],
      orprice:[this.orprice, [ Validators.required ]],
      diprice: [ this.diprice, [ Validators.required ] ],
      protect: [ this.protect, [ Validators.required ] ],
      puprice: [ this.puprice, [ Validators.required ] ],
      stock: [ this.stock, [ Validators.required ] ],
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
	  this.httpl.httpmenderput("partsmanagemnet/updatepartsinfo",{"id":this.partid,"classifyid":this.classifyid,"puprice":this.puprice,"status":this.status,"title":this.title,"num":this.num,"stock":this.stock,"diprice":this.diprice,"orprice":this.orprice,"img":this.mkey,"protect":this.protect})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.rou.navigateByUrl("home/part");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   																																																	
	  this.httpl.httpmender("partsmanagemnet/addpartsinfo",{"classifyid":this.classifyid,"puprice":this.puprice,"status":this.status,"title":this.title,"num":this.num,"stock":this.stock,"diprice":this.diprice,"orprice":this.orprice,"img":this.mkey,"protect":this.protect})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.rou.navigateByUrl("home/part");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }
  }
  
  
   /*图片上传*/
  img:any;//图片
  uploadurl:string=uploadurl; 
  imgUrl:string=imgUrl;
  fileList; //附件
	mkey:string='';//上成功后返回数据
	picturesc:boolean=false;//上传按钮
	public uploadFileZQ(event){ 
	this.fileList = event.target.files; 
	this.img=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileList[0]));
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
  	this.picturesc=false;
  	this.img='';
  }
}