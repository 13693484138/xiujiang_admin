import {Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import { LocalStorageService} from 'angular-web-storage';
@Component({
  selector: 'app-partclass',
  templateUrl: './partclass.component.html',
  styleUrls: ['./partclass.component.less']
})
export class PartclassComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  status:string;
  classifyid:string;
  title:string;
  partsclassify_detail:boolean;
  partsclassify_delete:boolean;
  partsclassify_add:boolean;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,public local: LocalStorageService) {
  }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("partsmanagemnet/partsclassifylist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"title":this.title,"classifyid":this.classifyid,"status":this.status})
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == "0000"){
        this.dataSet=data.data.list;
        this.loading = false;
        this.total = data.data.totalResult;
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
  add(){//新增配件
  	this.router.navigateByUrl("home/addpartclass");
  }
  EditRow(item:any):void{//编辑配件分类
//	console.log(item);
	  this.router.navigate(["home/addpartclass"],{queryParams:{'classid':item}});
  }
  deleteRow(item:string):void{//删除配件
  	 this.http.httpmenderdel("partsmanagemnet/deletepartsclassify/"+item)
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == "0000"){
					this.message.success('删除成功!');
					this.searchData();
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }
  
  ngOnInit(): void {
  	if(this.local.get('permission').indexOf('partsclassify_detail')==-1){
    	this.partsclassify_detail=false;
    }else{
    	this.partsclassify_detail=true;
    }
    if(this.local.get('permission').indexOf('partsclassify_delete')==-1){
    	this.partsclassify_delete=false;
    }else{
    	this.partsclassify_delete=true;
    }
    if(this.local.get('permission').indexOf('partsclassify_add')==-1){
    	this.partsclassify_add=false;
    }else{
    	this.partsclassify_add=true;
    }
    this.searchData();
  }
  
}

