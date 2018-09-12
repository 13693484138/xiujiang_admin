import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import { LocalStorageService} from 'angular-web-storage';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less']
})
export class ShopComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  shopname:string;
  phone:string;
  repair:string;
  status:string;
  shoplist_detail:boolean;
  shoplist_add:boolean;
  shoplist_delete:boolean;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,public local: LocalStorageService) {
  }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("shopmanagemnet/shopinfolist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"shopname":this.shopname,"phone":this.phone,"repair":this.repair,"status":this.status})
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == "0000"){
        this.dataSet=data.data.list;
        this.loading = false;
        this.total = data.data.totalResult;
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
  search():void{
  	this.pageIndex=1;
  	this.searchData();
  }
  add(){//新增门店
  	this.router.navigateByUrl("home/shopadd");
  }
  EditRow(item:any):void{//编辑门店
	  this.router.navigate(["home/shopadd"],{queryParams:{'shopid':item}});
  }
  deleteRow(item:string):void{//删除门店
  	 this.http.httpmenderdel("shopmanagemnet/deleteshopinfo/"+item)
      .subscribe(data=>{
//    	console.log(data);
      	if(data.result == "0000"){
					this.message.success(data.msg);
					this.searchData();
      	}else{
      		this.message.error(data.msg);
      	}
      });
  }
  toTechnician(item:string):void{//查看技师
  	this.router.navigate(["home/technicianlist"],{queryParams:{'shopid':item}});
  }
  
  ngOnInit(): void {
    this.searchData();
    if(this.local.get('permission').indexOf('shoplist_detail')==-1){
    	this.shoplist_detail=false;
    }else{
    	this.shoplist_detail=true;
    }
    if(this.local.get('permission').indexOf('shoplist_add')==-1){
    	this.shoplist_add=false;
    }else{
    	this.shoplist_add=true;
    }
    if(this.local.get('permission').indexOf('shoplist_delete')==-1){
    	this.shoplist_delete=false;
    }else{
    	this.shoplist_delete=true;
    }
    
  }
  
}
