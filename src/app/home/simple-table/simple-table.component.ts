import { Component, Injectable, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import { NzTreeNode } from 'ng-zorro-antd';
@Component({
  selector : 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.less']

})

export class SimpleTableComponent implements OnInit {
	isVisibleMiddle=false;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  constructor(public http:HttpService) {
  }

  searchData(): void {
    this.loading = true;
//   this.http.httpmender({"funName": "goodsAppList", "regionId": '', "parms": '{"pageIndex":"'+this.pageIndex+'","pageSize":"'+this.pageSize+'"}'})
//    .subscribe(data=>{
//    	console.log(data);
//      this.dataSet=data.data.list;
//      this.loading = false;
//      this.total = data.data.totalSize;
//    });

  }

  EditRow(item:string):void{
  	console.log('编辑'+item);
  }
  deleteRow(item:string):void{
  	console.log('删除'+item);
  }
  
   //模态框
  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
  	console.log('click Cancel');
    this.isVisibleMiddle = false;
  }
  
  
  
  ngOnInit(): void {
    this.searchData();
  }
  
  
  //树
  expandKeys = [];
  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
      children: [
            {
              title   : 'child1.2',
              key     : '100012',
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  isLeaf  : true
                },
                {
                  title : 'grandchild1.2.2',
                  key   : '1000122',
                  isLeaf: true
                }
              ]
        },
        {
          title   : 'child2',
          key     : '10002',
          children: [
            {
              title : 'grandchild2.1',
              key   : '1000122',
              isLeaf: true
            },
            {
              title : 'grandchild2.2',
              key   : '1000123',
              isLeaf: true
            }
          ]
        }
      ]
    })
  ];

  mouseAction(name: string, e: any): void {
    console.log(name, e);
  }
}