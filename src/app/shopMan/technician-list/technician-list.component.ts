import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router,ActivatedRoute} from '@angular/router';
import { LocalStorageService} from 'angular-web-storage';
import { NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.less']
})
export class TechnicianListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  shopid:string;
  workname:string;
  worknum:string;
  phone:string;
  addbtn:boolean=false;
  workerlist_detail:boolean;
  workerlist_add:boolean;
  workerlist_delete:boolean;
  constructor(public http:HttpService,public router:Router,public local: LocalStorageService,public rou:ActivatedRoute,public msg:NzMessageService) {
  	this.rou.queryParams.subscribe(Params=>{
        this.shopid=Params['shopid'];
    });
  }

  searchData(): void {
    this.loading = true;
    if(!this.shopid){
    	this.shopid=this.local.get("sysUser").shopid;
    }else{
//  	this.addbtn=false;
    }
     this.http.httpmender("shopmanagemnet/workerinfolist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"shopid":this.shopid,"worknum":this.worknum,"workname":this.workname,"phone":this.phone})
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == '0000'){
        this.dataSet=data.data.list;
        this.loading = false;
        this.total = data.data.totalResult;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }
  search(){
  	this.pageIndex=1;
  	this.searchData();
  }
  add():void{
  	this.router.navigate(["home/techniciandetail"],{queryParams:{'shopid':this.shopid}});
  }
  detail(item:string):void{
  	this.router.navigate(["home/techniciandetail"],{queryParams:{'id':item,'shopid':this.shopid}});
  }
  deleteRow(item:string):void{
  	 this.http.httpmenderdel("shopmanagemnet/deleteworker/"+item)
      .subscribe(data=>{
      	if(data.result == '0000'){
          this.msg.success('删除技师成功!');
          this.searchData();
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }
  
  changestatus(workid:string,status:string){
  	if(status=='1'){
  		status='2';
  	}else{
  		status='1';
  	}
  	this.http.httpmenderput("shopmanagemnet/updateworkerstatus",{"workid":workid,"status":status})
      .subscribe(data=>{
      	if(data.result == '0000'){
          this.msg.success("状态修改成功!");
          this.searchData();
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }
  
  ngOnInit(): void {
    this.searchData();
    if(this.local.get('permission').indexOf('workerlist_detail')==-1){
    	this.workerlist_detail=false;
    }else{
    	this.workerlist_detail=true;
    }
    if(this.local.get('permission').indexOf('workerlist_add')==-1){
    	this.workerlist_add=false;
    }else{
    	this.workerlist_add=true;
    }
    if(this.local.get('permission').indexOf('workerlist_delete')==-1){
    	this.workerlist_delete=false;
    }else{
    	this.workerlist_delete=true;
    }
  }
  
}
