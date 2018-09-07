import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';

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
  constructor(public http:HttpService,public router:Router,public message:NzMessageService) {
  }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("shopmanagemnet/shopinfolist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"shopname":this.shopname,"phone":this.phone,"repair":this.repair,"status":this.status})
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
  search():void{
  	this.pageIndex=1;
  	this.searchData();
  }
  add(){//新增门店
  	this.router.navigateByUrl("home/shopadd");
  }
  EditRow(item:any):void{//编辑门店
  	console.log(item);
	  this.router.navigate(["home/shopadd"],{queryParams:{'shopid':item}});
  }
  deleteRow(item:string):void{//删除门店
  	 this.http.httpmenderdel("shopmanagemnet/deleteshopinfo/"+item)
      .subscribe(data=>{
      	console.log(data);
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
  }
  
}
