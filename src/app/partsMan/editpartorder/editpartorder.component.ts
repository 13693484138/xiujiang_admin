import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { NzMessageService} from 'ng-zorro-antd';
import {HttpService,imgUrl} from "../../service/http/http.service";

@Component({
  selector: 'app-editpartorder',
  templateUrl: './editpartorder.component.html',
  styleUrls: ['./editpartorder.component.less']
})
export class EditpartorderComponent implements OnInit {
  imgUrl:string=imgUrl;
  orderno:string;
  partsOrderDetail:any;
  constructor(
  	public router:ActivatedRoute,
  	private msg: NzMessageService,
  	private httpl:HttpService) {
	  this.router.queryParams.subscribe(Params=>{
        this.orderno=Params['orderno'];
        });
  	}
  ngOnInit() {
  	 /*获取订单详情*/
     this.httpl.httpmenderget("partsmanagemnet/partsorderdetail/"+this.orderno)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == '0000'){
 					this.partsOrderDetail=data.data.partsOrderDetail;
      	}else{
      		this.msg.error(data.msg);
      	}
      });
  }

}
