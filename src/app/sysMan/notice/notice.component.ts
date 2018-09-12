import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http/http.service";
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import 'jquery';
import { LocalStorageService} from 'angular-web-storage';
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.less']
})

export class NoticeComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  title: string;
  content: string;
  type: string;
  notice_delete:boolean;
  notice_detail:boolean;
  notice_add:boolean;
  constructor(public http: HttpService, public router: Router, public message: NzMessageService,public local: LocalStorageService) { }

  ngOnInit(): void {
    if(this.local.get('permission').indexOf('notice_detail')==-1){
      this.notice_detail=false;
    }else{
      this.notice_detail=true;
    };
    if(this.local.get('permission').indexOf('notice_delete')==-1){
      this.notice_delete=false;
    }else{
      this.notice_delete=true;
    };
    if(this.local.get('permission').indexOf('notice_add')==-1){
      this.notice_add=false;
    }else{
      this.notice_add=true;
    };
    this.searchData();
  }
  searchData(): void {
    this.loading = true;
    this.http.httpmender("noticemanagement/noticelist", { "currentPage": this.pageIndex, "pageSize": this.pageSize, "title": this.title })
      .subscribe(data => {
        if (data.result == "0000") {
          this.dataSet = data.data.list;
          this.loading = false;
          this.total = data.data.totalResult;
        } else {
          this.message.error(data.msg);
        }
      });
  }


  add() {//新增用户
    this.router.navigateByUrl("home/editnotice");
  }
  EditRow(item: any): void {//用户详情
    this.router.navigate(["home/editnotice"], { queryParams: { 'id': item } });
  }
  deleteRow(item: string): void {//删除用户
    this.http.httpmenderdel("noticemanagement/deletenotice/" + item)
      .subscribe(data => {
        if (data.result == "0000") {
          this.message.success('删除成功!');
          this.searchData();
        } else {
          this.message.error(data.msg);
        }
      });
  }
  search() {
    this.pageIndex = 1;
    this.searchData();
  }
}
