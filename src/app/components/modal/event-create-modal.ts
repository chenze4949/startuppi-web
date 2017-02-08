import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { EventService } from '../../service/event.service';
import { UploadService } from '../../service/upload.service';
import { Event } from '../../model/event';
import { EventCategory } from '../../model/category';

export class EventCreateModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
  public categories: EventCategory[];
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
                    <h1>登記活動</h1>
                    <img class="close-button" src="/assets/images/close-material-icons-regular.png" (click)="onKeyUp(5)">
                </div>
            </div>
            <div class="activity-item">
                <div class="item-activity-details">
                    <div class="activity">
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="title" class="item-activity-details-textfield" placeholder="請輸入登記的活動主題"/>
                        </div>
                        <div class="item-activity-details-name">
                            活動類型：
                        </div>
                        <div class="item-activity-details-form">
                            <select [ngModel]="selectedCategory" class="W_select" (ngModelChange)="onChangeCategory($event)">
                                <option [ngValue]="i"  *ngFor="let i of context.categories">{{i.name}}</option>
                            </select>
                        </div>
                        <div class="item-activity-details-name">
                            活動介紹：
                        </div>
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="introduction" class="item-activity-details-textfield" placeholder="活動介紹"/>
                        </div>
                        <div class="item-activity-details-name">
                            開始時間：
                        </div>
                        <div class="item-activity-details-form">
                            <p-calendar [(ngModel)]="start_time" [minDate]="minDate" [maxDate]="maxDate" [readonlyInput]="true" [locale]="es"></p-calendar>
                        </div>
                        <div class="item-activity-details-name">
                            結束時間：
                        </div>
                        <div class="item-activity-details-form">
                            <p-calendar [(ngModel)]="end_time" [minDate]="minDate" [maxDate]="maxDate" [readonlyInput]="true" [locale]="es"></p-calendar>
                        </div>
                        <div class="item-activity-details-name">
                            活動地址：
                        </div>
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="address" class="item-activity-details-textfield" placeholder="活動地址"/>
                        </div>
                        <div class="item-activity-details-name">
                            活動詳情：
                        </div>
                        <div class="item-activity-details-form">
                            <input [(ngModel)]="detail" class="item-activity-details-textfield" placeholder="活動詳情"/>
                        </div>
                        <div class="item-activity-details-note">
                            活動經官方審核后即可發佈在創業活動板塊，請耐心等候。
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
                    活動主題圖片或Logo上傳
                </div>
            </div>
            <div class="custom-modal-footer">
                <button type="submit" class="btn btn-primary btn-h-large" (click)="createGroup()">發佈</button>
                <button type="submit" class="btn btn-primary btn-h-large" (click)="onKeyUp(5)">取消</button>
            </div>
        </div>`
})
export class EventCreateModal implements CloseGuard, ModalComponent<EventCreateModalContext> {
  context: EventCreateModalContext;

  public wrongAnswer: boolean;

  title:string;
  selectedCategory:EventCategory;
  introduction:string;
  start_time:Date;
  end_time:Date;
  address:string;
  detail:string;
    
  minDate: Date;
    
  maxDate: Date;
  es: any;
  constructor(public dialog: DialogRef<EventCreateModalContext>,
  private evenntService:EventService,
  private uploadService:UploadService) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);

    
    this.es = {
        firstDayOfWeek: 1,
        dayNames: [ "日","一","二","三","四","五","六" ],
        dayNamesShort: [ "日","一","二","三","四","五","六" ],
        dayNamesMin: [ "日","一","二","三","四","五","六" ],
        monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
        monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

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

  apiEndPoint = 'https://startuppi.herokuapp.com/api/v1/events/';
  createGroup(){
    this.evenntService.createEvent(this.title,this.introduction,this.start_time,this.end_time,this.address,this.detail,this.selectedCategory.id).then(event => { 
        this.uploadService.makeFileRequest(this.apiEndPoint+event.id,"icon",this.file).subscribe(() => {
            console.log('sent');
            this.wrongAnswer = 5 != 5;
            this.dialog.close();
        });
    })
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
}
