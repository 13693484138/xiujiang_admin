import { Component, OnInit } from '@angular/core';
import {HttpService,imgUrl} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import 'ztree';
import 'jquery';
import { LocalStorageService} from 'angular-web-storage';
declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  code:string='0';
  levels:string;
  showadd:boolean=true;
  nodes:any;
  name:string;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,public local: LocalStorageService) { }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("menumanagemnet/menulist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"code":this.code,"levels":this.levels,"name":this.name})
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
    	key: {
			open:'open',
			isHidden: "hidden"
		  },
      simpleData: {
        enable: true,
				idKey: "code",
				pIdKey: "pcode",
				rootPId: 0
      }
    },
    callback: {
			onClick:(event:any,treeId:any,treeNode:any)=>{
		  this.code=treeNode.code;
		  if(treeNode.pcode == 0){
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
  	  this.http.httpmenderget("menumanagemnet/menutreelist")
      .subscribe(data=>{
      	if(data.result == '0000'){      	
					this.nodes=data.data;
					$.fn.zTree.init($("#ztree"), this.setting, this.nodes);
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
    this.searchData();
    this.getnodes();
  }

}
