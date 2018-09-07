import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-distributionratiolist',
  templateUrl: './distributionratiolist.component.html',
  styleUrls: ['./distributionratiolist.component.less']
})
export class DistributionratiolistComponent implements OnInit {
	validateForm: FormGroup;
	isVisibleMiddle=false;
	isedit=false;
	pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  level:string;
  username:string;
  id:string;
  phone:string;
  leveladd:string;
  partner:string;
  status:string;
  ratio:string;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,private fb: FormBuilder) { }

  ngOnInit() {
  	this.searchData();
  	this.validateForm = this.fb.group({
      leveladd: [ this.leveladd, [ Validators.required ] ],
      status: [ this.status, [ Validators.required ]]
    });
  	
  }
  
  searchlevel():void{
  	this.http.httpmenderget("rulesmanagemnet/getmemberlevelinfo/"+this.phone)
      .subscribe(data=>{
      	if(data.result == "0000"){
      		this.leveladd=data.data.level.toString();
      		this.partner=data.data.id;
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
  searchData(): void {
    this.loading = true;
     this.http.httpmender("rulesmanagemnet/distributionratiolist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"username":this.username,"level":this.level})
      .subscribe(data=>{
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
  }
  
  showedit(item:any):void{
  	this.isedit=true;
	  this.http.httpmenderget("rulesmanagemnet/distributionratiodetail/"+item)
      .subscribe(data=>{
      	if(data.result == "0000"){
      		    this.isedit=true;
      			  this.leveladd=data.data.level.toString();  
						  this.partner=data.data.partner;
						  this.status=data.data.status.toString();
						  this.ratio=data.data.ratio;
						  this.id=data.data.id;
      	}else{
      	  this.message.error(data.msg);
      	}
      });
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
    this.http.httpmender("rulesmanagemnet/addDistributionRatio",{"level":this.leveladd,"partner":this.partner,"status":this.status,"ratio":this.ratio})
      .subscribe(data=>{
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

  
  edit():void{
  	for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
  	this.http.httpmenderput("rulesmanagemnet/updatedistributionratio",{"id":this.id,"level":this.leveladd,"partner":this.partner,"status":this.status,"ratio":this.ratio})
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


}
