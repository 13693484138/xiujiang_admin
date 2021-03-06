import { Component, OnInit } from '@angular/core';
import {HttpService,imgUrl} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import { LocalStorageService} from 'angular-web-storage';
import { NzModalService } from 'ng-zorro-antd';
import 'ztree';
import 'jquery'
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  pid:string='0';
  imgUrl:string=imgUrl;
  nodes:any;
  rolenodes:any;
//account:string;
  name:string;
  phone:string;
  sUser:string;
  sUsername:string;
  roleids:string;
	isVisibleMiddle=false;
	systemPermissions=[];
	pcUser_delete:boolean;
	pcUser_freeze:boolean;
	pcUser_unfreeze:boolean;
	to_assign_role:boolean;
	pcUser_detail:boolean;
	pcUser_add:boolean;
  constructor(
		public http:HttpService,
		public router:Router,
		public message:NzMessageService,
		public local: LocalStorageService,
		public modal: NzModalService) { }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("usermanagemnet/userlist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"deptid":this.pid,"name":this.name,"phone":this.phone})
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
		  this.pageIndex = 1;
		  this.searchData();
		}
	  }
  };
  settingrole = {
  	check: {
				enable: true,
				chkStyle: "checkbox",
				chkboxType: { "Y": "", "N": ""}
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
    },
    callback: {
			onClick:(event:any,treeId:any,treeNode:any)=>{
		  this.roleids=treeNode.id;
		}
	  }
  };

  getnodes(){
  	  this.http.httpmenderget("deptmanagemnet/depttreelist")
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

 
 add(){//新增用户
  	this.router.navigate(["home/edituser"],{queryParams:{'deptid':this.pid}});
  }
 
   unfreeze():void{
   	if(!this.sUser){
   		this.message.info('请选择一位用户!');
   	}else{
			this.modal.confirm({
				nzTitle  : '<i>提示信息</i>',
				nzContent: '<b>您确定解除冻结该用户吗？</b>',
				nzOnOk   : () => {
					this.http.httpmenderput("usermanagemnet/unfreezeuser/"+this.sUser,{})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.message.success('解冻用户成功!');
					this.searchData();
      	}else{
      		this.message.error(data.msg);
      	}
      });
				}
			});
   	}
  }
	 
	
   freeze():void{
   	if(!this.sUser){
			 this.message.info('请选择一位用户!');
   	}else{
			this.modal.confirm({
				nzTitle  : '<i>提示信息</i>',
				nzContent: '<b>您确定冻结该用户吗？</b>',
				nzOnOk   : () => {
					this.http.httpmenderput("usermanagemnet/freezeuser/"+this.sUser,{})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.message.success('冻结用户成功!');
					this.searchData();
      	}else{
      		this.message.error(data.msg);
      	}
      });
				}
			});
   	}
  }
   
// role():void{
// 	if(!this.sUser){
// 		this.message.info('请选择一位用户!');
// 	}else{
// 		 this.isVisibleMiddle = true;
// 		this.http.httpmenderget("usermanagemnet/roleassign/"+this.sUser)
//    .subscribe(data=>{
//    	console.log(data);
//    	if(data.result == "0000"){
//					this.sUsername=data.data.username;
//    	}else{
//    		this.message.error(data.msg);
//    	}
//    });
// 		 this.http.httpmenderget("rolemanagemnet/rolelistbyuserid/"+this.sUser)
//    .subscribe(data=>{
//    	console.log(data);
//    	if(data.result == "0000"){
//					this.rolenodes=data.data;
//					$.fn.zTree.init($("#ztreerole"), this.settingrole, this.rolenodes);
//    	}else{
//    		this.message.error(data.msg);
//    	}
//    });
// 	}
// }
// 
   
   
  EditRow(item:any):void{//用户详情
	  this.router.navigate(["home/edituser"],{queryParams:{'id':item,'deptid':'e'}});
  }
  deleteRow(item:string):void{//删除用户
  	 this.http.httpmenderdel("usermanagemnet/deleteuser/"+item)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.message.success('删除成功!');
					this.searchData();
					this.getnodes();
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }

//handleOkMiddle(): void {
//	var treeObj = $.fn.zTree.getZTreeObj("ztreerole");
//	  var nodes = treeObj.getCheckedNodes(true);
//	  var ids='';
//	  for(let i=0;i<nodes.length;i++){
//	  		ids+=nodes[i].id+',';
//	  }
//  this.http.httpmenderput("usermanagemnet/setRole",{"userid":this.sUser,"roleids":ids})
//    .subscribe(data=>{
//    	console.log(data);
//    	if(data.result == "0000"){
//    		this.message.success('角色分配成功!');
//				this.isVisibleMiddle = false;
//				this.searchData();
//    	}else{
//    	  this.message.error(data.msg);
//    	}
//    });
//}
//
//handleCancelMiddle(): void {
//  this.isVisibleMiddle = false;
//}

  search(){
  	 this.pageIndex = 1;
  	 this.searchData();
	}
	
  ngOnInit(): void {
		if(this.local.get('permission').indexOf('pcUser_detail')==-1){
			this.pcUser_detail=false;
    }else{
			this.pcUser_detail=true;
		};
		if(this.local.get('permission').indexOf('pcUser_delete')==-1){
			this.pcUser_delete=false;
    }else{
			this.pcUser_delete=true;
		};
		if(this.local.get('permission').indexOf('pcUser_freeze')==-1){
			this.pcUser_freeze=false;
    }else{
			this.pcUser_freeze=true;
		};
		if(this.local.get('permission').indexOf('pcUser_unfreeze')==-1){
			this.pcUser_unfreeze=false;
    }else{
			this.pcUser_unfreeze=true;
    };
		if(this.local.get('permission').indexOf('to_assign_role')==-1){
			this.to_assign_role=false;
    }else{
			this.to_assign_role=true;
    };
		if(this.local.get('permission').indexOf('pcUser_add')==-1){
			this.pcUser_add=false;
    }else{
			this.pcUser_add=true;
		};
    this.searchData();
    this.getnodes();
  }

}
