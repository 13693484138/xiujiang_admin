import {Component, OnInit } from '@angular/core';
import {HttpService,imgUrl} from "../../service/http/http.service";
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import { LocalStorageService} from 'angular-web-storage';
@Component({
  selector: 'app-partlist',
  templateUrl: './partlist.component.html',
  styleUrls: ['./partlist.component.less']
})

export class PartlistComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  classifyid:string;
  status:string;
  title:string;
  classlist:any;
  imgUrl:string=imgUrl;
  partslist_detail:boolean;
  partslist_delete:boolean;
  partslist_add:boolean;
  constructor(public http:HttpService,public router:Router,public msg:NzMessageService,public local: LocalStorageService) {
  }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("partsmanagemnet/partsinfolist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"status":this.status,"classifyid":this.classifyid,"title":this.title})
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == "0000"){
        this.dataSet=data.data.list;
        this.loading = false;
        this.total = data.data.totalResult;
      	}else{
      	  this.msg.error(data.msg);
      	}
      });
  }
  add(){//新增配件
  	this.router.navigateByUrl("home/addpart");
  }
  EditRow(item:any):void{//编辑配件
	  this.router.navigate(["home/addpart"],{queryParams:{'partid':item}});
  }
  deleteRow(item:string):void{//删除配件
  	 this.http.httpmenderdel("partsmanagemnet/deletepartsinfo/"+item)
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == "0000"){
					this.msg.success('删除成功!');
					this.searchData();
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }
  
  ngOnInit(): void {
  	
  	if(this.local.get('permission').indexOf('partslist_detail')==-1){
    	this.partslist_detail=false;
    }else{
    	this.partslist_detail=true;
    }
    if(this.local.get('permission').indexOf('partslist_delete')==-1){
    	this.partslist_delete=false;
    }else{
    	this.partslist_delete=true;
    }
    if(this.local.get('permission').indexOf('partslist_add')==-1){
    	this.partslist_add=false;
    }else{
    	this.partslist_add=true;
    }
  	
  	
    this.searchData();
      	this.http.httpmenderget("partsmanagemnet/partsclassify")
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == '0000'){
         this.classlist=data.data;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }
  search(){
  	 this.pageIndex = 1;
  	 this.searchData();
  }
}

