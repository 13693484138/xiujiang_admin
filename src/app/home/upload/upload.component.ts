import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  ngOnInit() {

  }
  photourl="https://jsonplaceholder.typicode.com/posts/";//图片上传地址
  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];
  previewImage = '';
  previewVisible = false;

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  
  
  
 //手动上传图片
  uploading2 = false;
  fileList2: UploadFile[] = [];

  

  beforeUpload2 = (file: UploadFile): boolean => {
    this.fileList2.push(file);
    return false;
  }

  handleUpload2(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList2.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading2 = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', this.photourl, formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (event: {}) => {
          this.uploading2 = false;
          this.msg.success('upload successfully.');
        },
        err => {
          this.uploading2 = false;
          this.msg.error('upload failed.');
        }
      );
  }
}
