import { Component, OnInit } from '@angular/core';
import {HttpService,imgUrl} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import 'ztree';
import 'jquery'
declare var $: any;
@Component({
  selector: 'app-modellist',
  templateUrl: './modellist.component.html',
  styleUrls: ['./modellist.component.less']
})
export class ModellistComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  brandid:string='1';
  title:string;
  status:string;
  imgUrl:string=imgUrl;
  nodes:any;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService) {
  }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("repairmanagemnet/versionlist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"brandid":this.brandid,"title":this.title,"status":this.status})
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
   search(){
  	 this.pageIndex = 1;
  	 this.searchData();
  }
  add(){//新增门店
  	this.router.navigate(["home/editmodel"],{queryParams:{'brandid':this.brandid}});
  }
  EditRow(item:any):void{//编辑型号
	  this.router.navigate(["home/editmodel"],{queryParams:{'id':item,'brandid':this.brandid}});
  }
  deleteRow(item:string):void{//删除型号
  	 this.http.httpmenderdel("repairmanagemnet/deleteversion/"+item)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.message.success('删除成功!');
					this.searchData();
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
		  this.brandid=treeNode.id;
		  this.pageIndex = 1;
		  this.searchData();
		}
	  }
  };

   getnodes(){
  	  this.http.httpmenderget("repairmanagemnet/brandtreelist/")
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){      	
					this.nodes=data.data;
					$.fn.zTree.init($("#ztree"), this.setting, this.nodes);
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }
  ngOnInit(): void {
  	this.getnodes();
    this.searchData();
  }
  
}
