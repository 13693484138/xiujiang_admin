import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from "../../../service/http/http.service";
import { LocalStorageService} from 'angular-web-storage';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import setHours from 'date-fns/set_hours';
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
  notice_edit:boolean;
  edit:boolean;
  add:boolean;
  endtime:string;
  constructor(
    private fb: FormBuilder,
    public router: ActivatedRoute,
    public rou: Router,
    private msg: NzMessageService,
    private httpl: HttpService,
    public local: LocalStorageService
  ) {
    this.router.queryParams.subscribe(Params => {
      this.parmlen = Object.keys(Params).length;  
        this.id = Params['id'];
    });
  }

  ngOnInit() {
    /*权限设置*/
    if(this.local.get('permission').indexOf('notice_edit')==-1){
      this.notice_edit=false;
    }else{
      this.notice_edit=true;
    };
     /*表单验证设置*/
     this.validateForm = this.fb.group({
      title: [this.title, [Validators.required]],
      type: [this.type, [Validators.required]],
      content: [this.content, [Validators.required]],
      endtime: [this.endtime, [Validators.required]],
    });
    if (this.parmlen == 1) {
      this.pagename = '详情';
      this.edit = true;
      this.httpl.httpmenderget("noticemanagement/getnoticeinfo/" + this.id)
        .subscribe(data => {
          console.log(data);
          if (data.result == '0000') {
            this.title = data.data.title;
            this.type = data.data.type.toString();
            this.content = data.data.content;
            this.creater = data.data.creater;
            this.endtime=data.data.endtime;
          } else {
            this.msg.error(data.msg);
          }
        })    
    } else {
      this.pagename = '新增';  
      this.add = true;
    }
  }
  //设置可选时间范围
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);
  
   range(start: number, end: number): number[] {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
   
	disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };
  
  
   
  disabledDateTime = (): object => {
  	let d = new Date();
    return {
      nzDisabledHours  : () => this.range(0,d.getHours()),
      nzDisabledMinutes: () => this.range(0,d.getMinutes()),
      nzDisabledSeconds: () => [0,d.getSeconds()]
    };
  };


  /*提交表单*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
//  console.log(this.endtime);
//  let d = new Date(this.endtime);  
//  this.endtime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+' '+ d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(); 
//  console.log(this.endtime);
    if (this.parmlen == 1) {
      /*编辑用户*/
      this.httpl.httpmenderput("noticemanagement/updatenotice", { "id": this.id, "title": this.title, "content": this.content, "type": this.type,"endtime":this.endtime})
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
      this.httpl.httpmender("noticemanagement/addnotice", { "title": this.title, "content": this.content, "type": this.type,"endtime":this.endtime })
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
