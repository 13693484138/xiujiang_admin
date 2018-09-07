import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService,imgUrl} from "../../service/http/http.service";

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.less']
})
export class OrderdetailComponent implements OnInit {
	imgUrl:string=imgUrl;
  status:string;
  orderno:string;
  brand:string;
  version:string;
  color:string;
  img:string;
  bookingtime:string;
  address:string;
  nickname:string;
  workername:string;
  workerphone:string;
  paytime:string;
  paytype:string;
  payment:string;
  memberphone:string;
  orderFaultList:any;
  orderTransferList:any;
	wpuorderno:string;
	wpuworkername:string;
	wpudesc:string;
	wpuaddtime:string;
	mcorderno:string;
	mcaddtime:string;
	mcreason:string;
  mcdealtime:string;
  mcresult:string;
  mcmembername:string;
  mcworkername:string;
  constructor(
  	public router:ActivatedRoute,
  	private msg: NzMessageService,
  	private httpl:HttpService) {
	  this.router.queryParams.subscribe(Params=>{
        this.orderno=Params['orderno'];
        this.status=Params['status'];
        });
  	}
  ngOnInit() {
  	 /*获取订单详情*/
     this.httpl.httpmender("ordermanagement/orderdetail",{"orderno":this.orderno,"status":this.status})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){
          this.brand=data.data.orderDetail.brand;
          this.version=data.data.orderDetail.version;
          this.color=data.data.orderDetail.color;
          this.img=this.imgUrl+data.data.orderDetail.img;
          this.bookingtime=data.data.orderDetail.bookingtime;
          this.address=data.data.orderDetail.address;
          this.nickname=data.data.orderDetail.nickname;
          this.workername=data.data.orderDetail.workername;
          this.workerphone=data.data.orderDetail.workerphone;
          this.paytime=data.data.orderDetail.paytime;
          this.payment=data.data.orderDetail.payment;
          if(data.data.orderDetail.paytype=='1'){
          	this.paytype='在线支付';
          }else{
          	this.paytype='线下支付';
          }
          
          this.memberphone=data.data.orderDetail.memberphone;
          this.orderFaultList=data.data.orderFaultList;
          this.orderTransferList=data.data.orderTransferList;
          if(data.data.workerPartsUse){
          this.wpuorderno=data.data.workerPartsUse.orderno;
					this.wpuworkername=data.data.workerPartsUse.workername;
					this.wpudesc=data.data.workerPartsUse.desc;
					this.wpuaddtime=data.data.workerPartsUse.addtime;
					}
					if(data.data.memberComplaint){
						this.mcorderno=data.data.memberComplaint.orderno;
						this.mcaddtime=data.data.memberComplaint.addtime;
						this.mcreason=data.data.memberComplaint.reason;
					  this.mcdealtime=data.data.memberComplaint.dealtime;
					  this.mcresult=data.data.memberComplaint.result;
					  this.mcmembername=data.data.memberComplaint.membername;
					  this.mcworkername=data.data.memberComplaint.workername;
					}
					
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }

}
