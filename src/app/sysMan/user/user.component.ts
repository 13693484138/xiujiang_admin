import { Component, OnInit } from '@angular/core';
import {HttpService,imgUrl} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
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
  showadd:boolean=true;
  nodes:any;
<<<<<<< HEAD
  account:string;
  name:string;
  phone:string;
=======
  rolenodes:any;
  account:string;
  name:string;
  phone:string;
  sUser:string;
  sUsername:string;
  roleids:string;
  isVisibleMiddle=false;
>>>>>>> e4c9ed16e0a476c09fca54d2b3044981fadc7787
  constructor(public http:HttpService,public router:Router,public message:NzMessageService) { }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("usermanagemnet/userlist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"deptid":this.pid,"account":this.account,"name":this.name,"phone":this.phone})
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
<<<<<<< HEAD
=======
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
    },
    callback: {
			onClick:(event:any,treeId:any,treeNode:any)=>{
		  this.roleids=treeNode.id;
		}
	  }
  };
>>>>>>> e4c9ed16e0a476c09fca54d2b3044981fadc7787

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
<<<<<<< HEAD
=======
 
   unfreeze():void{
   	if(!this.sUser){
   		this.message.info('请选择一位用户!');
   	}else{
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

  }
   
   freeze():void{
   	if(!this.sUser){
   		this.message.info('请选择一位用户!');
   	}else{
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
  }
   
   role():void{
   	if(!this.sUser){
   		this.message.info('请选择一位用户!');
   	}else{
   		 this.isVisibleMiddle = true;
   		this.http.httpmenderget("usermanagemnet/roleassign/"+this.sUser)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.sUsername=data.data.username;
      	}else{
      		this.message.error(data.msg);
      	}
      });
   		 this.http.httpmenderget("rolemanagemnet/rolelistbyuserid/"+this.sUser)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.rolenodes=data.data;
					$.fn.zTree.init($("#ztreerole"), this.settingrole, this.rolenodes);
      	}else{
      		this.message.error(data.msg);
      	}
      });
   	}
   }
   
   
   
>>>>>>> e4c9ed16e0a476c09fca54d2b3044981fadc7787
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
<<<<<<< HEAD
=======

  handleOkMiddle(): void {
  	var treeObj = $.fn.zTree.getZTreeObj("ztreerole");
	  var nodes = treeObj.getCheckedNodes(true);
	  var ids='';
	  for(let i=0;i<nodes.length;i++){
	  		ids+=nodes[i].id+',';
	  }
    this.http.httpmenderput("usermanagemnet/setRole",{"userid":this.sUser,"roleids":ids})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
      		this.message.success('角色分配成功!');
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

  
  
  
  
  
>>>>>>> e4c9ed16e0a476c09fca54d2b3044981fadc7787
  search(){
  	 this.pageIndex = 1;
  	 this.searchData();
  }
  ngOnInit(): void {
    this.searchData();
    this.getnodes();
  }

}
