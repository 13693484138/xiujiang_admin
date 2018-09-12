import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import 'ztree';
import 'jquery';
import { LocalStorageService} from 'angular-web-storage';

declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {
	pageIndex=1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  pid:string='0';
  showadd:boolean=true;
  nodes:any;
  rolenodes:any;
  name:string;
  sUser:string;
  sUsername:string;
  roleids:string;
	isVisibleMiddle=false;
	role_add:boolean;
	role_delete:boolean;
	role_list:boolean;
	role_detail:boolean;
	to_authority_role:boolean;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,public local: LocalStorageService) { }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("rolemanagemnet/rolelist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"name":this.name})
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

settingrole = {
	  check: {
				enable: true,
				chkStyle: "checkbox",
				chkboxType: { "Y": "p", "N": "s" }
			},
    data: {
    	key: {
			checked: "checked"
		  },
      simpleData: {
        enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: 0
      }
    }
};
 add(){//新增用户
  	this.router.navigateByUrl("home/editrole");
 } 
  role():void{
   	if(!this.sUser){
   		this.message.info('请选择一位用户!');
   	}else{
   		this.isVisibleMiddle = true;
   		this.http.httpmenderget("rolemanagemnet/rightsprofile/"+this.sUser)
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.sUsername=data.data.rolename;
      	}else{
      		this.message.error(data.msg);
      	}
      });
   		
   		this.http.httpmenderget("menumanagemnet/menuTreeListByRoleId/"+this.sUser)
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.rolenodes=data.data;
					$.fn.zTree.init($("#ztreerole"), this.settingrole, this.rolenodes);
      	}else{
      		this.message.error(data.msg);
      	}
      });
   	}
   }
   
   
   
  EditRow(item:any):void{//角色详情
	  this.router.navigate(["home/editrole"],{queryParams:{'id':item}});
  }
  deleteRow(item:string):void{//删除角色
  	 this.http.httpmenderdel("rolemanagemnet/deleterole/"+item)
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.message.success('删除成功!');
					this.searchData();
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }

  handleOkMiddle(): void {
  	var treeObj = $.fn.zTree.getZTreeObj("ztreerole");
	  var nodes = treeObj.getCheckedNodes(true);
	  var ids='';
	  for(let i=0;i<nodes.length;i++){
	  		ids+=nodes[i].id+',';
	  }
    this.http.httpmenderput("rolemanagemnet/setauthority",{'roleid':this.sUser,"ids":ids.substring(0,ids.length-1)})
      .subscribe(data=>{
      	if(data.result == "0000"){
      		this.message.success('权限设置成功!');
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

  search(){
  	 this.pageIndex = 1;
  	 this.searchData();
  }
  ngOnInit(): void {
		if(this.local.get('permission').indexOf('role_add')==-1){
			this.role_add=false;
    }else{
			this.role_add=true;
		};
		if(this.local.get('permission').indexOf('role_detail')==-1){
			this.role_detail=false;
    }else{
			this.role_detail=true;
		};
		if(this.local.get('permission').indexOf('role_delete')==-1){
			this.role_delete=false;
    }else{
			this.role_delete=true;
		};
		if(this.local.get('permission').indexOf('to_authority_role')==-1){
			this.to_authority_role=false;
    }else{
			this.to_authority_role=true;
		};
    this.searchData();
  }

}
