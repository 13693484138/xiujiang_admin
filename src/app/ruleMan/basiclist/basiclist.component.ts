import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {Router} from '@angular/router';
import { NzMessageService} from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-basiclist',
  templateUrl: './basiclist.component.html',
  styleUrls: ['./basiclist.component.less']
})
export class BasiclistComponent implements OnInit {
	validateForm: FormGroup;
	isedit=false;
	pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  name:string;
  type:string;
  parm:string;
  code:string;
  id:string;
  showtitle:string;
  constructor(public http:HttpService,public router:Router,public message:NzMessageService,private fb: FormBuilder) { }

  ngOnInit() {
  	this.searchData();
  	this.validateForm = this.fb.group({
      parm: [ this.parm, [ Validators.required,Validators.pattern(/^(?:0|[1-9][0-9]?|100)$/)] ]
    });
  }
  searchData(): void {
    this.loading = true;
     this.http.httpmender("rulesmanagemnet/basiclist",{"currentPage":this.pageIndex,"pageSize":this.pageSize,"name":this.name,"type":this.type})
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
  
  edit():void{
  	for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
  	this.http.httpmenderput("rulesmanagemnet/updatebasic",{"parm":this.parm,"id":this.id,"code":this.code})
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.message.success('修改成功!');
					this.searchData();
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
  
  showedit(item:any):void{
  	this.id=item.id;
  	this.isedit=true;
  	this.showtitle=item.name;
  	this.parm=item.parm;  
	  this.code=item.code;
  }
  
  hideedit():void{
  	this.isedit=false;
  }

  deleteRow(item:string):void{
  	this.http.httpmenderdel("rulesmanagemnet/deletebasic/"+item)
      .subscribe(data=>{
      	console.log(data);
      	if(data.result == "0000"){
					this.message.success('删除成功!');
					this.searchData();
      	}else{
      	  this.message.error(data.msg);
      	}
      });
  }
}
