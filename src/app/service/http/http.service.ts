import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from "@angular/http";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class HttpService {
public url="http://192.168.1.250:8080/pc/";
//public url="http://192.168.1.4:8888/pc/";
  constructor(public http:Http,public cookieservice:CookieService) {
  }
  //登录接口不传令牌post
  httpmenderlogin(funName:string,data:any){
//  const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});//form data
    const headers = new Headers({'Content-Type': 'text/plain;charset=UTF-8'});//request payload
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url+funName,data,options).pipe(map(res => res.json()));
  }

  //接口必须传令牌post
  httpmender(funName:string,data:any){
    let headers1 = new Headers();
    headers1.append('Content-Type','text/plain;charset=UTF-8');
    headers1.append('Authorization',this.cookieservice.get('token'));    
    const options1 = new RequestOptions({ headers: headers1 });
    return this.http.post(this.url+funName,data,options1).pipe(map(res => res.json()));
  }
  
  //get请求
  httpmenderget(funName:string){
    let headers2 = new Headers();
    headers2.append('Content-Type','text/plain;charset=UTF-8');
    headers2.append('Authorization',this.cookieservice.get('token'));    
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.get(this.url+funName,options2).pipe(map(res => res.json()));
  }
  
   //put请求
  httpmenderput(funName:string,data:any){
    let headers2 = new Headers();
    headers2.append('Content-Type','text/plain;charset=UTF-8');
    headers2.append('Authorization',this.cookieservice.get('token')); 
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.put(this.url+funName,data,options2).pipe(map(res => res.json()));
  }
  
  //delete请求
  httpmenderdel(funName:string){
    let headers2 = new Headers();
    headers2.append('Content-Type','text/plain;charset=UTF-8');
    headers2.append('Authorization',this.cookieservice.get('token'));
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.delete(this.url+funName,options2).pipe(map(res => res.json()));
  }
}

export const uploadurl="http://192.168.1.250:8080/";//图片上传
export const imgUrl="http://192.168.1.250:8080/attachment/download/";//图片显示
