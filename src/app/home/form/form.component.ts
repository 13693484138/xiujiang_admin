import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

  validateForm: FormGroup;
  error = '';
  loading = false;
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  constructor(private fb: FormBuilder,public msg: NzMessageService,private modalSrv: NzModalService,) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      date						 : [null, [Validators.required]],
      standard				 : [null, [Validators.required]],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      nickname         : [ null, [ Validators.required ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
      website          : [ null, [ Validators.required ] ],
      captcha          : [ null, [ Validators.required ] ],
      agree            : [ false ]
    });
  }
  
  // region: fields

  get mail() {
    return this.validateForm.controls.mail;
  }
  get password() {
    return this.validateForm.controls.password;
  }
  get confirm() {
    return this.validateForm.controls.checkPassword;
  }
  get mobile() {
    return this.validateForm.controls.phoneNumber;
  }
  get website() {
    return this.validateForm.controls.website;
  }
  get captcha() {
    return this.validateForm.controls.captcha;
  }
  
  // region: get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }
  
  submitForm() {
    this.error = '';
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid) return;
    // mock http
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      alert('注册成功!');
      console.log(this.validateForm.controls.date.value);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
  
   onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
  }

}
