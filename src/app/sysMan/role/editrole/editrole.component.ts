import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService} from "../../../service/http/http.service";
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
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
  num:number;
  pid:string;
  deptid:string;
  pidname:string;
  deptidname:string;
  departnodes:any;
  rolenodes:any;
  node1:any;
  node2:any;
  constructor(
  	private fb: FormBuilder,
  	public router:ActivatedRoute,
  	public rou:Router, 
  	private msg: NzMessageService,
  	private httpl:HttpService,
  	private sanitizer: DomSanitizer
  ) {
  	  	this.router.queryParams.subscribe(Params=>{
  	  	this.parmlen=Object.keys(Params).length;
  	    this.id=Params['id'];
        });
  }

  ngOnInit() {
  	//部门树   
    this.getdepart();
    //角色树
    this.getrole();
  	if(this.parmlen==1){
  		this.pagename='编辑';
  		this.httpl.httpmenderget("rolemanagemnet/getroleinfodetail/"+this.id)
      .subscribe(data=>{
      	if(data.result == '0000'){
      		this.name=data.data.name;
      		this.tips=data.data.tips;
          this.num=data.data.num;
          this.deptid=data.data.deptid;
          this.pid=data.data.superiorid;
          this.deptidname=data.data.simplename;
          this.pidname=data.data.superiorname;
          let treeObjdepart = $.fn.zTree.getZTreeObj("depart");
					this.node1= treeObjdepart.getNodeByParam("id", this.deptid, null);
					treeObjdepart.selectNode(this.node1);
					
					let treeObjrole = $.fn.zTree.getZTreeObj("role");
					this.node2 = treeObjrole.getNodeByParam("id", this.pid, null);
					treeObjrole.selectNode(this.node2);
      	}else{
      		this.msg.error(data.msg);
      	}
      })
  	}else{
  		this.pagename='新增';
  	}
  	  	/*表单验证设置*/
    this.validateForm = this.fb.group({
      name:[ this.name,[ Validators.required]],
      tips:[this.tips,[ Validators.required]],
      num:[ this.num, [ Validators.required ]],
      deptid:[this.deptid],
      pid:[this.pid,[ Validators.required ]]
    });

  }
  depart = {
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
		  this.deptid=treeNode.id;
		  this.deptidname=treeNode.name;
		}
	  }
  };
  role = {
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
		  this.pidname=treeNode.name;
		}
	  }
  };

  getdepart(){
  	  this.httpl.httpmenderget("deptmanagemnet/depttreelist")
      .subscribe(data=>{
      	if(data.result == '0000'){      	
					this.departnodes=data.data;
					$.fn.zTree.init($("#depart"), this.depart, this.departnodes);
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }
  
  getrole(){
  	this.httpl.httpmenderget("rolemanagemnet/roletreelist")
      .subscribe(data=>{
      	if(data.result == "0000"){
					this.rolenodes=data.data;
					$.fn.zTree.init($("#role"), this.role, this.rolenodes);
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }
 
  /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return; 
    if(this.parmlen==1){
    /*编辑用户*/
	  this.httpl.httpmenderput("rolemanagemnet/updaterole",{"id":this.id,"name":this.name,"tips":this.tips,"pid":this.pid,"num":this.num,"deptid":this.deptid})
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
	  this.httpl.httpmender("rolemanagemnet/addrole",{"name":this.name,"tips":this.tips,"pid":this.pid,"num":this.num,"deptid":this.deptid})
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


}
