import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService} from "../../../service/http/http.service";
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { LocalStorageService} from 'angular-web-storage';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import 'ztree';
import 'jquery'
declare var $: any;
@Component({
  selector: 'app-editrole',
  templateUrl: './editrole.component.html',
  styleUrls: ['./editrole.component.less']
})
export class EditroleComponent implements OnInit {
  validateForm: FormGroup;
  id:string;
  pagename:string;
  parmlen:number;
  name:string;
  tips:string;
//num:number;
  pid:string;
//deptid:string;
  pidname:string;
  deptidname:string;
  departnodes:any;
  rolenodes:any;
  node1:any;
  node2:any;
  edit:boolean;
  add:boolean;
  role_edit:boolean;
  isVisibleMiddle=false;
  sUsername:string;
  to_authority_role:boolean;
  borderred:boolean=false;
  constructor(
  	private fb: FormBuilder,
  	public router:ActivatedRoute,
  	public rou:Router, 
  	private msg: NzMessageService,
  	private http:HttpService,
    private sanitizer: DomSanitizer,
    public local: LocalStorageService
  ) {
  	  	this.router.queryParams.subscribe(Params=>{
  	  	this.parmlen=Object.keys(Params).length;
  	    this.id=Params['id'];
        });
  }

  ngOnInit() {
  	
  	if(this.local.get('permission').indexOf('to_authority_role')==-1){
			this.to_authority_role=false;
    }else{
			this.to_authority_role=true;
		};
//	//部门树   
//  this.getdepart();
//  //角色树
//  this.getrole();
    if(this.local.get('permission').indexOf('role_edit')==-1){
			this.role_edit=false;
    }else{
			this.role_edit=true;
    };
  	if(this.parmlen==1){
      this.pagename='详情';
      this.edit = true;
  		this.http.httpmenderget("rolemanagemnet/getroleinfodetail/"+this.id)
      .subscribe(data=>{
      	if(data.result == '0000'){
      		this.name=data.data.name;
      		this.tips=data.data.tips;
//        this.num=data.data.num;
//        this.deptid=data.data.deptid;
          this.pid=data.data.superiorid;
          this.deptidname=data.data.simplename;
          this.pidname=data.data.superiorname;
//        let treeObjdepart = $.fn.zTree.getZTreeObj("depart");
//				this.node1= treeObjdepart.getNodeByParam("id", this.deptid, null);
//					treeObjdepart.selectNode(this.node1);
//					
//					let treeObjrole = $.fn.zTree.getZTreeObj("role");
//					this.node2 = treeObjrole.getNodeByParam("id", this.pid, null);
//					treeObjrole.selectNode(this.node2);
      	}else{
      		this.msg.error(data.msg);
      	}
      })
  	}else{
      this.pagename='新增';
      this.add = true;
  	}
  	  	/*表单验证设置*/
    this.validateForm = this.fb.group({
      name:[ this.name,[ Validators.required]],
      tips:[this.tips],
//    num:[ this.num, [ Validators.required,Validators.pattern(/^[0-9]*$/) ]],
//    deptid:[this.deptid],
//    pid:[this.pid,[ Validators.required ]]
    });

  }
//depart = {
//  data: {
//    simpleData: {
//      enable: true,
//				idKey: "id",
//				pIdKey: "pid",
//				rootPId: 0
//    }
//  },
//  callback: {
//			onClick:(event:any,treeId:any,treeNode:any)=>{
//		  this.deptid=treeNode.id;
//		  this.deptidname=treeNode.name;
//		}
//	  }
//};
//role = {
//  data: {
//    simpleData: {
//      enable: true,
//				idKey: "id",
//				pIdKey: "pid",
//				rootPId: 0
//    }
//  },
//  callback: {
//			onClick:(event:any,treeId:any,treeNode:any)=>{
//		  this.pid=treeNode.id;
//		  this.pidname=treeNode.name;
//		}
//	  }
//};

//getdepart(){
//	  this.http.httpmenderget("deptmanagemnet/depttreelist")
//    .subscribe(data=>{
//    	if(data.result == '0000'){      	
//					this.departnodes=data.data;
//					$.fn.zTree.init($("#depart"), this.depart, this.departnodes);
//    	}else{
//    		this.msg.error(data.msg);
//    	}
//    });
//}
//
//getrole(){
//	this.http.httpmenderget("rolemanagemnet/roletreelist")
//    .subscribe(data=>{
//    	if(data.result == "0000"){
//					this.rolenodes=data.data;
//					$.fn.zTree.init($("#role"), this.role, this.rolenodes);
//    	}else{
//    		this.msg.error(data.msg);
//    	}
//    });
//}
// 
  /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    var treeObj = $.fn.zTree.getZTreeObj("ztreerole");
    var ids='';
    if(treeObj.getCheckedNodes().length==0){
    	this.msg.error('请配置权限!');
    	this.borderred=true;
	  	return ;
    }else{
    	this.borderred=false;
    var nodes = treeObj.getCheckedNodes(true);
	  for(let i=0;i<nodes.length;i++){
	  		ids+=nodes[i].id+',';
	  }
    }
    if(this.parmlen==1){
    /*编辑用户*/
	  this.http.httpmenderput("rolemanagemnet/updaterole",{"id":this.id,"name":this.name,"tips":this.tips,"ids":ids.substring(0,ids.length-1)})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('修改成功!');
					this.rou.navigateByUrl("home/role");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }else{   	
    /*新增用户*/
	  this.http.httpmender("rolemanagemnet/addrole",{"name":this.name,"tips":this.tips,"ids":ids.substring(0,ids.length-1)})
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.msg.success('新增成功!');
					this.rou.navigateByUrl("home/role");
      	}else{
      		this.msg.error(data.msg);
      	}
      });
    }
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

role():void{
   		this.isVisibleMiddle = true;
// 		this.http.httpmenderget("rolemanagemnet/rightsprofile")
//    .subscribe(data=>{
//    	if(data.result == "0000"){
//					this.sUsername=data.data.rolename;
//    	}else{
//    		this.msg.error(data.msg);
//    	}
//    });

   		this.http.httpmenderget("menumanagemnet/menuTreeListByRoleId/"+this.id)
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.rolenodes=data.data;
					$.fn.zTree.init($("#ztreerole"), this.settingrole, this.rolenodes);
					var treeObj = $.fn.zTree.getZTreeObj("ztreerole");
			    if(treeObj.getCheckedNodes().length==0){
			    	this.borderred=true;
				  	return ;
			    }else{
			    	this.borderred=false;
			    }
      	}else{
      		this.msg.error(data.msg);
      	}
      });
   }

  handleOkMiddle(): void {
//	var treeObj = $.fn.zTree.getZTreeObj("ztreerole");
//	  var nodes = treeObj.getCheckedNodes(true);
//	  var ids='';
//	  for(let i=0;i<nodes.length;i++){
//	  		ids+=nodes[i].id+',';
//	  }
//  this.http.httpmenderput("rolemanagemnet/setauthority",{"ids":ids.substring(0,ids.length-1)})
//    .subscribe(data=>{
//    	if(data.result == "0000"){
//    		if(this.id && this.local.get('sysUser').roleid.split(',').indexOf(this.id.toString()) !=-1){
//    			this.msg.success('权限设置成功,请重新登录!');
//	        	this.isVisibleMiddle = false;
//	      		this.local.clear();
//	          this.rou.navigateByUrl("login");
//    		}else{
//	        	this.msg.success('权限设置成功!');
//    			  this.isVisibleMiddle = false;
//    		}
//    	}else{
//    	  this.msg.error(data.msg);
//    	}
//    });

    this.isVisibleMiddle = false;
    var treeObj = $.fn.zTree.getZTreeObj("ztreerole");
    if(treeObj.getCheckedNodes().length==0){
    	this.borderred=true;
	  	return ;
    }else{
    	this.borderred=false;
    }
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

}
