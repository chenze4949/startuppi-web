import { Component, OnInit, ViewContainerRef, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { GroupCreateModalContext, GroupCreateModal } from '../components/modal/group-create-modal';
import { GroupService } from '../service/group.service';
import { Group } from '../model/group';
import { GroupCategory } from '../model/category';

@Component({
  selector: 'sp-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css']
})
export class GroupComponent implements OnInit {
  categories:GroupCategory[];
  groups:Group[];
  selectedGroup:Group;

  private sub: any;
  category_id:number;

  current_page:number = 1;
  pages:number = 1;

  constructor(
    private router: Router, public modal: Modal,
    private groupService:GroupService
    ) {}

  ngOnInit() {
    this.sub = this.router
    .routerState
    .root
    .queryParams
    .subscribe(params => {
      if (params['category_id'] && params['category_id'].length > 0) {
        this.category_id = params['category_id'];
      }

      if (params['current_page'] && params['current_page'].length > 0) {
        this.current_page = params['current_page'];
      }

      this.groupService.getGroupCategories().then(categories =>{
        this.categories = categories;
        this.groupService.getGroups(this.category_id, this.current_page).then(response => {
          this.current_page = response.json().pagination.current_page;
          this.pages = response.json().pagination.total_pages;
          this.groups = this.groupService.mapJSONToGroups(response.json().response);
        })
      })

    });

    
  }

  createGroup(){
    
    return this.modal.open(GroupCreateModal,  overlayConfigFactory({ num1: 2, num2: 3, categories:this.categories }, BSModalContext));
  }

  openGroupDetailModal(group){
    this.selectedGroup = group;
    var modal = document.getElementById('groupDetailModal');
    modal.style.display = "block";
  }

  closeGroupDetailModal(){
    var modal = document.getElementById('groupDetailModal');
    modal.style.display = "none";
  }

  onPreviousPage(){
    if (this.current_page != 1){
      this.current_page = this.current_page - 1;

      if (this.category_id){
        this.router.navigate(['/group'], {queryParams: {category_id:this.category_id, current_page:this.current_page}});
      }else{
        this.router.navigate(['/group'], {queryParams: {current_page:this.current_page}});
      }
    }
  }

  onNextPage(){
    if (this.current_page < this.pages){
      this.current_page = this.current_page + 1;
      if (this.category_id){
        this.router.navigate(['/group'], {queryParams: {category_id:this.category_id, current_page:this.current_page}});
      }else{
        this.router.navigate(['/group'], {queryParams: {current_page:this.current_page}});
      }
    }
  }

  onCategory(category:GroupCategory){
    this.groups = null;
    this.current_page = 1;
    this.pages = 1;
    this.router.navigate(['/group'], {queryParams: {category_id:category.id}});
  }

  onAll(){
    this.groups = null;
    this.category_id = null;
    this.current_page = 1;
    this.pages = 1;
    this.router.navigate(["/group"]);
  }
}
