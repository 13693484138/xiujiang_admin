import { Component, OnInit } from '@angular/core';
import {HttpService,imgUrl} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import { LocalStorageService} from 'angular-web-storage';
import 'ztree';
import 'jquery'
declare var $: any;
@Component({
  selector: 'app-brandlist',
  templateUrl: './brandlist.component.html',
  styleUrls: ['./brandlist.component.less']
})
export class BrandlistComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  pid:string='0';
  title:string;
  type:string;
  status:string;
  imgUrl:string=imgUrl;
  showadd:boolean=true;
  nodes:any;
  classid:string='0';
  brand_add:boolean;
	brand_delete:boolean;
	brand_detail:boolean;

  constructor(public http:HttpService,public router:Router,public message:NzMessageService, public local: LocalStorageService) {
  }
  searchData(): void {
    this.loading = true;
     this.http.httpmender("repairmanagemnet/brandlist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"id":this.pid,"title":this.title,"type":this.type,"status":this.status})
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
  setting = {
    data: {
      simpleData: {
        enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: 0
      }
    },
    callback: {
			onClick:(event:any,treeId:any,treeNode:any)=>{
		  this.pid=treeNode.id;
		  if(treeNode.pid == 0){
		  	this.showadd=true;
		  }else{
		  	this.showadd=false;
		  }
		  this.pageIndex = 1;
		  this.searchData();
		}
	  }
  };

  getnodes(){
  	  this.http.httpmenderget("repairmanagemnet/brandtreelist/")
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == '0000'){      	
					this.nodes=data.data;
					$.fn.zTree.init($("#ztree"), this.setting, this.nodes);
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }

 
 add(){//新增门店
  	this.router.navigate(["home/editbrand"],{queryParams:{'pid':this.pid}});
  }
  EditRow(item:any):void{//编辑品牌
//	console.log(item);
	  this.router.navigate(["home/editbrand"],{queryParams:{'id':item,'pid':this.pid}});
  }
  deleteRow(item:string):void{//删除品牌
  	 this.http.httpmenderdel("repairmanagemnet/deletebrand/"+item)
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == "0000"){
					this.message.success('删除成功!');
					this.searchData();
					this.getnodes();
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }
  search(){
  	 this.pageIndex = 1;
  	 this.searchData();
  }
  ngOnInit(): void {
  	if(this.local.get('permission').indexOf('brand_add')==-1){
    	this.brand_add=false;
    }else{
    	this.brand_add=true;
    }
    if(this.local.get('permission').indexOf('brand_delete')==-1){
    	this.brand_delete=false;
    }else{
    	this.brand_delete=true;
    }
    if(this.local.get('permission').indexOf('brand_detail')==-1){
    	this.brand_detail=false;
    }else{
    	this.brand_detail=true;
    }
    this.searchData();
    this.getnodes();
  }
  
}
