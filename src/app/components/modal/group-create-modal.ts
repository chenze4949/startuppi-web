import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { GroupService } from '../../service/group.service';
import { UploadService } from '../../service/upload.service';
import { Group } from '../../model/group';
import { GroupCategory } from '../../model/category';

export class GroupCreateModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
  public categories: GroupCategory[];
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'modal-content',
  styles: [`
        .custom-modal-container {
            padding: 15px;
        }

        .custom-modal-footer{
            float: left;
            width:100%;
            padding: 30px 15px;
        }

        .custom-modal-footer .btn-primary{
            float:right;
            margin-right:10px;
            background-color: #ea5514;
            border-color: #ea5514;
            color: white;
            font-family: PingFang SC Bold;
        }

        .custom-modal-header {
            background-color: #313131;
            color: #fff;
            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            margin-top: -15px;
            margin-bottom: 40px;
        }

        .activity-item{
            float: left;
            display: inline-block;
            width:100%;
            background-color: white;
            margin-bottom:50px;
        }

        .item-activity-image img{
            float: left;
            height: 100px;
            width: 100px;
            object-fit: cover;
            object-position: center;
            border-radius: 50px;
        }

        .item-activity-details{
            float: left;
            margin-left:20px;
            width: 300px;
        }

        .item-activity-details-name{
            margin-top:10px;
            font-family: PingFang SC Bold;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0.1px;
            text-align: left;
            color: #000000;
            padding-left:5px;
        }

        .item-activity-details-form{
            margin-top:5px;
        }

        .item-activity-details-textfield{
            width: 100%;
            height: 40px;
            border-radius: 2px;
            background: white;
            border: 1px solid #F1F2F2;
            padding: 0 10px 0 10px;
            font-size: 12px;
            font-family: PingFang SC Regular;
        }

        .item-activity-details-note{
            margin-top:20px;
            font-family: PingFang SC Regular;
            font-size: 10px;
            letter-spacing: 0.1px;
            text-align: left;
            color: blue;
            padding-left:5px;
        }

        .fileUpload {
            margin:10px auto;
            display:block;;
            position: relative;
            overflow: hidden;
        }
        .fileUpload input.upload {
            position: absolute;
            top: 0;
            right: 0;
            margin: 0;
            padding: 0;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            filter: alpha(opacity=0);
        }

        .close-button{
            position: absolute;
            right: 10px;
            top: 20px;
        }

        .image-upload{
            margin-top:10px;
            float: right;
            width: 200px;
        }

        .image-upload img{
            cursor: pointer;
            margin-left: 55px;
            object-fit: cover;
            width: 90px;
            height: 90px;
            border-width: 1px;
            border-color: #e8e8e8;
            border-style: solid;
        }

        .image-upload > input
        {
            display: none;
        }

        .W_select{
            width: 160px;
            height: 22px;
            border: 1px solid #ddd;
            font-family: PingFang SC Regular;
            font-size: 10px;
        }

        .image-upload-note{
            margin-top:5px;
            margin-bottom:20px;
            float: right;
            width: 200px;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC Bold;
        }
    `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
        <div class="container-fluid custom-modal-container">
            <div class="row custom-modal-header">
                <div class="col-sm-12">
                    <h1>登記社群</h1>
                    <img class="close-button" src="/assets/images/close-material-icons-regular.png" (click)="onKeyUp(5)">
                </div>
            </div>
            <div class="activity-item">
                <div class="item-activity-details">
                    <div class="activity">
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="title" class="item-activity-details-textfield" placeholder="請輸入登記的社群名字"/>
                        </div>
                        <div class="item-activity-details-name">
                            社群類型：
                        </div>
                        <div class="item-activity-details-form">
                            <select [ngModel]="selectedCategory" class="W_select" (ngModelChange)="onChangeCategory($event)">
                                <option [ngValue]="i"  *ngFor="let i of context.categories">{{i.name}}</option>
                            </select>
                        </div>
                        <div class="item-activity-details-name">
                            社群介紹：
                        </div>
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="description" class="item-activity-details-textfield" placeholder="社群特色"/>
                        </div>
                        <div class="item-activity-details-name">
                            社群加入規章：
                        </div>
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="regulation" class="item-activity-details-textfield" placeholder="社群規章"/>
                        </div>
                        <div class="item-activity-details-name">
                            社群聯繫方式：
                        </div>
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="contact" class="item-activity-details-textfield" placeholder="聯繫方式"/>
                        </div>
                        <div class="item-activity-details-note">
                            社群經官方審核后即可發佈在創業社群板塊，請耐心等候。
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="image-upload">
                    <label for="file-input1">
                        <img *ngIf="!file" src="/assets/images/profile-default.png"/>
                        <img *ngIf="file" [src]="file_src"/>
                    </label>

                    <input id="file-input1" type="file" class="upload" (change)="fileChange(input)" #input/>
                </div>
                <div class="image-upload-note">
                    群主題圖片或Logo上傳
                </div>
                <div class="image-upload">
                    <label for="file-input2">
                        <img *ngIf="!file2" src="/assets/images/profile-default.png"/>
                        <img *ngIf="file2" [src]="file_src2"/>
                    </label>
                    <input id="file-input2" type="file" class="upload" (change)="fileChange2(input2)" #input2/>
                </div>
                <div class="image-upload-note">
                    上傳聯繫方式二維碼(可選)
                </div>
            </div>
            <div class="custom-modal-footer">
                <button type="submit" class="btn btn-primary btn-h-large" (click)="createGroup()">發佈</button>
                <button type="submit" class="btn btn-primary btn-h-large" (click)="onKeyUp(5)">取消</button>
            </div>
        </div>
        <kendo-dialog [title]="alertTitle" *ngIf="opened" (close)="closeDialog()">
            <p>{{ alertDetail }}</p>

            <kendo-dialog-actions>
                <button kendoButton (click)="closeDialog()" [primary]="true">好</button>
            </kendo-dialog-actions>
        </kendo-dialog>`
})
export class GroupCreateModal implements CloseGuard, ModalComponent<GroupCreateModalContext> {
  context: GroupCreateModalContext;

  public wrongAnswer: boolean;

  title:string;
  selectedCategory:GroupCategory;
  description:string;
  regulation:string;
  contact:string;

  constructor(public dialog: DialogRef<GroupCreateModalContext>,
  private groupService:GroupService,
  private uploadService:UploadService) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
    this.uploadService.progress$.subscribe(
     data => {
      console.log('progress = '+data);
    });
    
  }

  

  onChangeCategory(value){
      this.selectedCategory = value;
  }

  file_src: string;
  file:File;
  // This is called when the user selects new files from the upload button
  fileChange(input){

      // Loop through each picture file
      for (var i = 0; i < input.files.length; i++) {

          this.file = input.files[i];

          // Create an img element and add the image file data to it
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(input.files[i]);

          // Create a FileReader
          var reader: any, target: EventTarget;
          reader = new FileReader();

          // Add an event listener to deal with the file when the reader is complete
          reader.addEventListener("load", (event) => {
              // Get the event.target.result from the reader (base64 of the image)
              img.src = event.target.result;

              // Push the img src (base64 string) into our array that we display in our html template
              this.file_src = img.src;
          }, false);

          reader.readAsDataURL(input.files[i]);
      }
  }

  file_src2: string;
  file2:File;
  // This is called when the user selects new files from the upload button
  fileChange2(input){

      // Loop through each picture file
      for (var i = 0; i < input.files.length; i++) {

          this.file2 = input.files[i];

          // Create an img element and add the image file data to it
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(input.files[i]);

          // Create a FileReader
          var reader: any, target: EventTarget;
          reader = new FileReader();

          // Add an event listener to deal with the file when the reader is complete
          reader.addEventListener("load", (event) => {
              // Get the event.target.result from the reader (base64 of the image)
              img.src = event.target.result;

              // Push the img src (base64 string) into our array that we display in our html template
              this.file_src2 = img.src;
          }, false);

          reader.readAsDataURL(input.files[i]);
      }
  }
  apiEndPoint = 'https://startuppi.herokuapp.com/api/v1/groups/';
  createGroup(){
    if (this.title && this.title.length > 0 &&
        this.description && this.description.length > 0 &&
        this.regulation && this.regulation.length > 0 &&
        this.selectedCategory && this.file && this.file2){
        this.groupService.createGroup(this.title,'',this.description,this.regulation,this.contact,this.selectedCategory.id).then(group => { 
            this.uploadService.makeFileRequest(this.apiEndPoint+group.id,"icon",this.file).subscribe(() => {
                console.log('sent');
                this.uploadService.makeFileRequest(this.apiEndPoint+group.id,"qr_code",this.file2).subscribe(() => {
                    console.log('sent');
                    this.wrongAnswer = 5 != 5;
                    this.dialog.close();
                });
            });
        })

    }else{
        this.open()
    }
    
  }

  onKeyUp(value) {
    this.wrongAnswer = value != 5;
    this.dialog.close();
  }

  close(){
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }

  alertTitle = "信息不完整！";
  alertDetail = "請填寫完整活動信息。";

  public opened: boolean = false;


  public closeDialog() {
    this.opened = false;
  }

  public open() {
    
    this.opened = true;

  }
}
