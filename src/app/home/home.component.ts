import { Component,ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { GroupModalContext, GroupModal } from '../components/modal/group-modal';
import { ServiceService } from '../service/service.service';
import { EventService } from '../service/event.service';
import { ArticleService } from '../service/article.service';
import { GroupService } from '../service/group.service';
import { Service } from '../model/service';
import { Article } from '../model/article';
import { Event } from '../model/event';
import { Group } from '../model/group';
import { Category, SubCategory } from '../model/category';
import { KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';
import { Auth } from '../service/auth.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public slides:Array<any>;
  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  webSwipeOptions: any;

  hottestServices:Service[];
  serviceCategories:Category[];

  events: any [];
  eventsSchedule: any [];
  selectedActivity:Event;
  articles: any [];
  groups: any [];
  selectedGroup:Group;
  resources: any[];
  dialogVisible: boolean = false;
  event: MyEvent;


  _auth;

  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, public modal: Modal,
    private router: Router,
    private serviceService:ServiceService,
    private eventService:EventService,
    private articleService:ArticleService,
    private groupService:GroupService,
    @Inject(Auth) _auth) {
      this._auth = _auth;

    this.addSlide();

    this.webSwipeOptions = {
      slidesPerView: 1,
      loop: false,
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 5,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    };
  }

  public addSlide():void {
    let newWidth = 1170;
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
    this.eventsSchedule = [
    ];
    this.eventService.getHottestEvents().then(response => {
      this.events = this.eventService.mapJSONToEvents(response.json().response);
      this.eventsSchedule = [];
      for (var index = 0; index < this.events.length; index++) {
        let event:Event = this.events[index];
        if (event.is_end){
          this.eventsSchedule.push(
            {"title":event.title, 
            "start":this.eventService.convertZHDate(event.start), 
            "end":this.eventService.convertZHDate(event.end), 
            "color":"#a9a9a9",
            "address":event.address,
            "enroll":event.enroll,
            "introduction":event.introduction,
            "date_str":event.date_long_str,
            "icon":event.icon,
            "contact":event.contact
          })
        }else{
          this.eventsSchedule.push(
            {"title":event.title, 
            "start":this.eventService.convertZHDate(event.start), 
            "end":this.eventService.convertZHDate(event.end), 
            "color":"#089E00",
            "address":event.address,
            "enroll":event.enroll,
            "introduction":event.introduction,
            "date_str":event.date_long_str,
            "icon":event.icon,
            "contact":event.contact
          })
        }
        
      }
    })
    this.articleService.getHomeSlides().then(response => {
      this.slides = this.articleService.mapJSONToHomeSlides(response.json().response);
    })
    this.articleService.getHottestArticles().then(response => {
      this.articles = this.articleService.mapJSONToArticles(response.json().response);
    })

    // this.serviceService.getServiceCategories().then(categories => {
    //   this.serviceCategories = categories;
    // })

    // this.serviceService.getHottestServices().then(services => {
    //   this.hottestServices = services;
    // })

    this.groupService.getHottestGroups().then(response => {
      this.groups = this.groupService.mapJSONToGroups(response.json().response);
    })
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  handleEventClick(e) {
      this.openActivityDetailModal(e.calEvent);
  }

  openGroupDetailModal(group){
    if (this._auth.isAuthenticated()){
      this.selectedGroup = group;
      var modal = document.getElementById('groupDetailModal');
      modal.style.display = "block";
    }else{
      this.router.navigate(['/login'],{queryParams:{}});
    }
  }

  closeGroupDetailModal(){
    var modal = document.getElementById('groupDetailModal');
    modal.style.display = "none";
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

  gotoArticleDetail(article:Article){
    this.router.navigate(["/news/"+article.id]);
  }

  onClick() {
      return this.modal.open(GroupModal,  overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
  }
}


export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}
