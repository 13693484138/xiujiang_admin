import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from "../../../service/http/http.service";

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-editnotice',
  templateUrl: './editnotice.component.html',
  styleUrls: ['./editnotice.component.less']
})
export class EditnoticeComponent implements OnInit {

  validateForm: FormGroup;
  dateFormat = 'yyyy-MM-dd';
  id: string;
  pagename: string;
  parmlen: number;
  title: string;
  content: string;
  shoplist: any;
  creater: string;
  type: string;
  constructor(
    private fb: FormBuilder,
    public router: ActivatedRoute,
    public rou: Router,
    private msg: NzMessageService,
    private httpl: HttpService
  ) {
    this.router.queryParams.subscribe(Params => {
      this.parmlen = Object.keys(Params).length;  
        this.id = Params['id'];
    });
  }

  ngOnInit() {
     /*表单验证设置*/
     this.validateForm = this.fb.group({
      title: [this.title, [Validators.required]],
      type: [this.type, [Validators.required]],
      content: [this.content, [Validators.required]],
      // creater: [this.creater, [Validators.required]],
    });
    if (this.parmlen == 1) {
      this.pagename = '编辑';
      this.httpl.httpmenderget("noticemanagement/getnoticeinfo/" + this.id)
        .subscribe(data => {
          console.log(data);
          if (data.result == '0000') {
            this.title = data.data.title;
            this.type = data.data.type.toString();
            this.content = data.data.content;
            this.creater = data.data.creater;
          } else {
            this.msg.error(data.msg);
          }
        })    
    } else {
      this.pagename = '新增';  
    }
  }


  /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    if (this.parmlen == 1) {
      /*编辑用户*/
      this.httpl.httpmenderput("noticemanagement/updatenotice", { "id": this.id, "title": this.title, "content": this.content, "type": this.type})
        .subscribe(data => {
          // console.log(data);
          if (data.result == "0000") {
            this.msg.success('修改成功!');
            this.rou.navigateByUrl("home/notice");
          } else {
            this.msg.error(data.msg);
          }
        });
    } else {
      /*新增用户*/
      this.httpl.httpmender("noticemanagement/addnotice", { "title": this.title, "content": this.content, "type": this.type })
        .subscribe(data => {
          // console.log(data);
          if (data.result == "0000") {
            this.msg.success('新增成功!');
            this.rou.navigateByUrl("home/notice");
          } else {
            this.msg.error(data.msg);
          }
        });
    }
  }
}
