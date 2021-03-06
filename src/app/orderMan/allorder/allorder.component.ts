import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import { LocalStorageService} from 'angular-web-storage';
@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.less']
})
export class AllorderComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  orderno:string;  
  phone:string;
  servertype:string;
  status:string;
  workername:string;
  order_detail:boolean;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,public local: LocalStorageService) {
  }

  searchData(): void {
    this.loading = true;
     this.http.httpmender("ordermanagement/orderlist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"orderno":this.orderno,"phone":this.phone,"servertype":this.servertype,"workername":this.workername,"status":this.status})
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

  EditRow(item:any):void{//订单详情
	  this.router.navigate(["home/orderdetail"],{queryParams:{'orderno':item.orderno,'status':item.status}});
  }

  ngOnInit(): void {
  	if(this.local.get('permission').indexOf('order_detail')==-1){
    	this.order_detail=false;
    }else{
    	this.order_detail=true;
    }
    this.searchData();
  }
  
}
