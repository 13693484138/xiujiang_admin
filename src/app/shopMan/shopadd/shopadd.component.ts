import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService,uploadurl,imgUrl} from "../../service/http/http.service";
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
declare var BMap: any;

@Component({
  selector: 'app-shopadd',
  templateUrl: './shopadd.component.html',
  styleUrls: ['./shopadd.component.less']
})
export class ShopaddComponent implements OnInit {
  shopid:string;
  validateForm: FormGroup;
  name:string;
  phone:string;
  maintain:string='0';
  parts:string='1';
  state:string='1';
  coordinate:string;
  address:string;
  serviceAreasm:boolean=false;
  serviceAreadd:boolean=false;
  serviceAreayj:boolean=false;
  appid:string;
  districtid:string;
  parmlen:number;
  label:string;
  service:number=0;
  servicearr:any=[];
  
  provinceData:any;
  cityData:any;
  regionData:any;
  addressp:any;
  addressc:any;
  addressr:any;
  /*门店地址级联选择*/
  provinceChangep(value:any): void {
  if(value){
	this.httpl.httpmenderget("shopmanagemnet/getshopdistrict/"+value.id)
      .subscribe(data=>{
      	if(data.result == '0000'){      	
      		this.cityData=data.data;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  	}
  }
    provinceChangec(value:any): void {
	  if(value){
		this.httpl.httpmenderget("shopmanagemnet/getshopdistrict/"+value.id)
	      .subscribe(data=>{
	      	if(data.result == '0000'){      		
	      		this.regionData=data.data;
	      	}else{
	      		this.msg.error(data.msg);
	      	}
	      });
	  	}
  }
  /*获取经纬度*/
  getlonlat(){
  	let addarr=[this.addressp,this.addressc,this.addressr];
  	this.address='';
    for(let n=0;n<addarr.length;n++){
    	if(addarr[n]){
    		this.address+=addarr[n].name;
    	}
    }
  	if(!this.address){
  		return this.validateForm.controls.address;
  	}else{
  	let map = new BMap.Map("container");
    let localSearch = new BMap.LocalSearch(map);
  	let keyword = this.address;
    localSearch.setSearchCompleteCallback((searchResult) => {　
    	let poi = searchResult.getPoi(0);　
    	this.coordinate = poi.point.lng + "," + poi.point.lat; //获取经度和纬度，将结果显示在文本框中
    });　
    localSearch.search(keyword);
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
    this.servicearr=[this.serviceAreasm,this.serviceAreadd,this.serviceAreayj];
    let serlen=this.servicearr.length;
    this.service=0;
    for(let j=0;j<serlen;j++){
    	if(this.servicearr[j]==true){
    		this.service+=Math.pow(2,j);
    	}
    }
      
    if(this.parmlen==1){
    /*编辑门店*/
	  this.httpl.httpmenderput("shopmanagemnet/editshopinfo",{"address": this.address,"appid":this.appid,"provinceid":this.addressp.id,"cityid":this.addressc.id,"districtid":this.addressr.id,"id":this.shopid,"ispurchase":this.parts,"lat":this.coordinate.split(",")[1],"logo":this.mkey,"lon":this.coordinate.split(",")[0],"name": this.name,"phone": this.phone,"repair":this.maintain,"service":this.service,"status":this.state})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.rou.navigateByUrl("home/shop");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   	
    /*新增门店*/
	  this.httpl.httpmender("shopmanagemnet/addshopinfo",{"address": this.address,"appid":this.appid,"provinceid":this.addressp.id,"cityid":this.addressc.id,"districtid":this.addressr.id,"ispurchase":this.parts,"lat":this.coordinate.split(",")[1],"logo":this.mkey,"lon":this.coordinate.split(",")[0],"name": this.name,"phone": this.phone,"repair":this.maintain,"service":this.service,"status":this.state})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.rou.navigateByUrl("home/shop");
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
  	private sanitizer: DomSanitizer
  ) {
  	  	this.router.queryParams.subscribe(Params=>{
  	  	this.parmlen=Object.keys(Params).length;
        this.shopid=Params['shopid'];
        });
  }

  ngOnInit(): void {
  	 /*获取门店区域信息*/
     this.httpl.httpmenderget("shopmanagemnet/getshopdistrict/1")
      .subscribe(data=>{
      	if(data.result == '0000'){
      		this.provinceData=data.data;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  	if(this.parmlen==1){
  		this.label='编辑';
  	/*获取门店详情*/
     this.httpl.httpmenderget("shopmanagemnet/getshopinfo/"+this.shopid)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){
          this.name=data.data.name;
          this.phone=data.data.phone;           
          this.addressp={'name':data.data.province,'id':data.data.provinceid};
          this.addressc={'name':data.data.city,'id':data.data.cityid};
          this.addressr={'name':data.data.district,'id':data.data.districtid};
          this.address=data.data.address;
          if(data.data.status){
          	this.state=data.data.status.toString();
          }
          if(data.data.ispurchase){
          	this.parts=data.data.ispurchase.toString();
          }
          this.maintain=data.data.repair;
          this.coordinate=data.data.lon+","+data.data.lat;
        	this.appid=data.data.appid;
        	this.picture=this.imgUrl+data.data.logo;
        	let slen=data.data.service.split(',').length;
        	for(let i=0;i<slen;i++){
        		if(data.data.service.split(',')[i]== '0'){
        			this.serviceAreasm=true;
        		}else if(data.data.service.split(',')[i]== '1'){
        			this.serviceAreadd=true;
        		}else{
        			this.serviceAreayj=true;
        		}
        	}
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  	}else{
  		this.label='新增';
  	}
    /*表单验证设置*/
    this.validateForm = this.fb.group({
      name: [ this.name, [ Validators.required ] ],
      phone: [ this.phone, [ Validators.required ,Validators.pattern(/^1[3|4|5|7|8][0-9]\d{8}$/)] ],
      appid:[this.appid,[ Validators.required ]],
      address: [ this.address, [ Validators.required ] ],
      coordinate: [ null, [ Validators.required ] ],
      serviceAreasm: [this.serviceAreayj],
      serviceAreadd: [this.serviceAreayj],
      serviceAreayj: [this.serviceAreayj],
      maintain:[this.maintain],
      parts:[this.parts],
      state:[this.state]
    });
    
    

  }
}

