import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import 'ztree';
import 'jquery'
declare var $: any;
@Component({
  selector: 'app-faultlist',
  templateUrl: './faultlist.component.html',
  styleUrls: ['./faultlist.component.less']
})
export class FaultlistComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  pid:string='0';
  title:string;
  status:string;
  showadd:boolean=true;
  tree:any;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService) {
  }
  searchData(): void {
    this.loading = true;
     this.http.httpmender("repairmanagemnet/faultlist",{"currentPage":this.pageIndex,"id":this.pid,"pageSize":this.pageSize,"title":this.title,"status":this.status})
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
  search(){
  	 this.pageIndex = 1;
  	 this.searchData();
  }
  add(){//新增门店
  	this.router.navigate(["home/editfault"],{queryParams:{'pid':this.pid}});
  }
  EditRow(item:any,item2:any):void{//编辑门店
	  this.router.navigate(["home/editfault"],{queryParams:{'id':item,'pid':item2}});
  }
  deleteRow(item:string):void{//删除门店
  	 this.http.httpmenderdel("repairmanagemnet/deletefault/"+item)
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
  	  this.http.httpmenderget("repairmanagemnet/faulttreelist/")
      .subscribe(data=>{
      	if(data.result == "0000"){
          this.tree=data.data;
          $.fn.zTree.init($("#ztree"), this.setting, this.tree);
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }
  ngOnInit(): void {
    this.searchData();
    this.getnodes();
   
  }

}
