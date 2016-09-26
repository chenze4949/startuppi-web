import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class GroupModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
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
            font-family: OpenSans-Bold;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 0.1px;
            text-align: left;
            color: #000000;
        }

        .item-activity-details-detail{
            font-family: OpenSans;
            font-size: 10px;
            letter-spacing: 0.1px;
            color:gray;
            margin-bottom:10px;
        }

        .item-activity-details-type{
            margin-top: 20px;
            font-family: OpenSans;
            font-size: 12px;
            letter-spacing: 0.1px;
        }

        .item-activity-details-quantity{
            font-family: OpenSans;
            font-size: 12px;
            letter-spacing: 0.1px;
        }

        .close-button{
            position: absolute;
            right: 10px;
            top: 20px;
        }
    `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
        <div class="container-fluid custom-modal-container">
            <div class="row custom-modal-header">
                <div class="col-sm-12">
                    <h1>加入社群</h1>
                    <img class="close-button" src="/images/close-material-icons-regular.png" (click)="onKeyUp(5)">
                </div>
            </div>
            <div class="activity-item">
                <!--<a class="cbp-vm-image" [routerLink]="['/products/1']" routerLinkActive="active">-->
                <div class="item-activity-image">
                    <img src="images/activity_sample.png" style="max-width: 100%; max-height: 100%;" alt=""/>
                </div>
                <div class="item-activity-details">
                    <div class="activity">
                        <div class="item-activity-details-name">
                            社群介紹：
                        </div>
                        <div class="item-activity-details-detail">90後CEO群是一個集合全香港最聰明最有才華的CEO群，歡迎大家來加入。我們歡迎您的到來</div>
                        <div class="item-activity-details-name">
                            社群加入規章：
                        </div>
                        <div class="item-activity-details-detail">90後CEO群是一個集合全香港最聰明最有才華的CEO群，歡迎大家來加入。我們歡迎您的到來</div>
                        <div class="item-activity-details-name">
                            社群聯繫方式：
                        </div>
                        <div class="item-activity-details-detail">請加創始人微信vincentno222</div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>`
})
export class GroupModal implements CloseGuard, ModalComponent<GroupModalContext> {
  context: GroupModalContext;

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<GroupModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
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
