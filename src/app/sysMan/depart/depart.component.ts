import { Component, OnInit } from '@angular/core';
import {HttpService,imgUrl} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import 'ztree';
import 'jquery';
import { LocalStorageService} from 'angular-web-storage';
declare var $: any;
@Component({
  selector: 'app-depart',
  templateUrl: './depart.component.html',
  styleUrls: ['./depart.component.less']
})
export class DepartComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  pid:string='0';
  imgUrl:string=imgUrl;
  showadd:boolean=true;
  nodes:any;
  simplename:string;
  dept_delete:boolean;
  dept_detail:boolean;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,public local: LocalStorageService) { }
  searchData(): void {
    this.loading = true;
     this.http.httpmender("deptmanagemnet/deptlist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"deptid":this.pid,"simplename":this.simplename})
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
  	  this.http.httpmenderget("deptmanagemnet/depttreelist")
      .subscribe(data=>{
      	if(data.result == '0000'){      	
					this.nodes=data.data;
					$.fn.zTree.init($("#ztree"), this.setting, this.nodes);
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }

 
  add(){//新增门店
  	 this.router.navigate(["home/editdepart"],{queryParams:{'pid':this.pid}});
  	
  }
  EditRow(item:any):void{//部门详情
	  this.router.navigate(["home/editdepart"],{queryParams:{'id':item,'pid':'e'}});
  }
  deleteRow(item:string):void{//删除部门
  	 this.http.httpmenderdel("deptmanagemnet/deletedept/"+item)
      .subscribe(data=>{
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
    if(this.local.get('permission').indexOf('dept_detail')==-1 || 
		this.local.get('permission').indexOf('dept_delete')==-1){
			this.dept_detail=false;
			this.dept_delete=false;
    }else{
			this.dept_detail=true;
			this.dept_delete=true;
    };
    this.searchData();
    this.getnodes();
  }

}
