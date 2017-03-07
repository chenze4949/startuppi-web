import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { EventCreateModalContext, EventCreateModal } from '../components/modal/event-create-modal';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import { EventCategory } from '../model/category';
import { Auth } from '../service/auth.service';

@Component({
  selector: 'sp-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent implements OnInit {
  categories:EventCategory[];
  events:Event[];
  selectedActivity:Event;

  private sub: any;
  category_id:number;

  current_page:number = 1;
  pages:number = 1;

  _auth;

  constructor(
    private router: Router, public modal: Modal,
    private eventService:EventService,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;

    }

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

      this.eventService.getEventCategories().then(categories =>{
        this.categories = categories;
        this.eventService.getEvents(this.category_id, this.current_page).then(response => {
          this.current_page = response.json().pagination.current_page;
          this.pages = response.json().pagination.total_pages;
          this.events = this.eventService.mapJSONToEvents(response.json().response);
        })
      })

    });
  }

  createEvent(){

    if (this._auth.isAuthenticated()){
      return this.modal.open(EventCreateModal,  overlayConfigFactory({ num1: 2, num2: 3, categories:this.categories }, BSModalContext));
  
    }else{
      this.router.navigate(['/login'],{queryParams:{}});
    }
    }


  openActivityDetailModal(activity){
    this.selectedActivity = activity;
    var modal = document.getElementById('activityDetailModal');
    modal.style.display = "block";
  }

  closeActivityDetailModal(){
    var modal = document.getElementById('activityDetailModal');
    modal.style.display = "none";
  }

  onPreviousPage(){
    if (this.current_page != 1){
      this.current_page = this.current_page - 1;

      if (this.category_id){
        this.router.navigate(['/activity'], {queryParams: {category_id:this.category_id, current_page:this.current_page}});
      }else{
        this.router.navigate(['/activity'], {queryParams: {current_page:this.current_page}});
      }
    }
  }

  onNextPage(){
    if (this.current_page < this.pages){
      this.current_page = this.current_page + 1;
      if (this.category_id){
        this.router.navigate(['/activity'], {queryParams: {category_id:this.category_id, current_page:this.current_page}});
      }else{
        this.router.navigate(['/activity'], {queryParams: {current_page:this.current_page}});
      }
    }
  }

  onCategory(category:EventCategory){
    this.events = null;
    this.current_page = 1;
    this.pages = 1;
    this.router.navigate(['/activity'], {queryParams: {category_id:category.id}});
  }

  onAll(){
    this.events = null;
    this.category_id = null;
    this.current_page = 1;
    this.pages = 1;
    this.router.navigate(["/activity"]);
  }

}
