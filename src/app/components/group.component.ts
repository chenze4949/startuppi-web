import { Component, OnInit, ViewContainerRef, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { GroupCreateModalContext, GroupCreateModal } from '../components/modal/group-create-modal';

@Component({
  moduleId: module.id,
  selector: 'sp-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(
    private router: Router, public modal: Modal
    ) {}

  ngOnInit() {
  }

  createGroup(){
    return this.modal.open(GroupCreateModal,  overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
  }

}
