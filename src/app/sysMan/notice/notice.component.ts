import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http/http.service";
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import 'jquery'
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
  constructor(public http: HttpService, public router: Router, public message: NzMessageService) { }

  ngOnInit(): void {
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
