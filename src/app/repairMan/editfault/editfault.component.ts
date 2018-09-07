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
  selector: 'app-editfault',
  templateUrl: './editfault.component.html',
  styleUrls: ['./editfault.component.less']
})
export class EditfaultComponent implements OnInit {
  id:string;
  title:string;
  explain:string;
  num:string;
  status:string='1';
  type:string='1';
  period:string;
  len:string;
  solution:string;
  remark:string;
  parmlen:number;
  validateForm: FormGroup;
  pagename:string;
  pid:string;
  constructor(
  	public router:ActivatedRoute,
  	private msg: NzMessageService,
  	private httpl:HttpService,
  	private fb: FormBuilder,
  	public rou:Router,
    private sanitizer: DomSanitizer) {
	  this.router.queryParams.subscribe(Params=>{
	  	  this.parmlen=Object.keys(Params).length;
        this.id=Params['id'];
        this.pid=Params['pid'];
        });
  	}
  ngOnInit() {
  	if(this.parmlen==2){
  		this.pagename='编辑';
  	 /*获取配件分类详情*/
     this.httpl.httpmender("repairmanagemnet/faultdetail",{"id":this.id,"pid":this.pid})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){
						this.title=data.data.title;
						this.explain=data.data.explain;
						this.num=data.data.num;						
						if(data.data.type){
							this.type=data.data.type.toString();
						}
						if(data.data.status){
							this.status=data.data.status.toString();
						}
						this.img=this.imgUrl+data.data.icon;
						this.period=data.data.period;
						this.len=data.data.len;
						this.solution=data.data.solution;
						this.remark=data.data.remark;
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
      explain:[this.explain],
      num: [ this.num, [ Validators.required ] ],
      status:[this.status,[ Validators.required ]],
      type:[this.type],
      period:[this.period],
      len:[this.len],
      solution:[this.solution],
      remark:[this.remark],
     });
  }
  
    /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    if(this.parmlen==2){
    /*编辑*/																																																																																																			
	  this.httpl.httpmenderput("repairmanagemnet/updatefault",{"explain":this.explain,"pid": this.pid,"id": this.id,"num":this.num,"status":this.status,"title":this.title,"icon":this.mkey,"type":this.type,"period":this.period,"len":this.len,"solution":this.solution,"remark":this.remark})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.rou.navigateByUrl("home/fault");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   	
    /*新增*/																					
	  this.httpl.httpmender("repairmanagemnet/addfault",{"explain":this.explain,"pid": this.pid,"num":this.num,"status":this.status,"title":this.title,"icon":this.mkey,"type":this.type,"period":this.period,"len":this.len,"solution":this.solution,"remark":this.remark})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.rou.navigateByUrl("home/fault");
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
