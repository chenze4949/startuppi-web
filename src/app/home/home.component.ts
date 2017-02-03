import { Component,ViewChild } from '@angular/core';
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
import { Category, SubCategory } from '../model/category';
import { KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';

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
  public slides:Array<any> = [];
  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  webSwipeOptions: any;

  hottestServices:Service[];
  serviceCategories:Category[];

  events: any [];
  eventsSchedule: any [];
  articles: any [];
  groups: any [];
  resources: any[];
  dialogVisible: boolean = false;
  event: MyEvent;
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, public modal: Modal,
    private router: Router,
    private serviceService:ServiceService,
    private eventService:EventService,
    private articleService:ArticleService,
    private groupService:GroupService) {

    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }

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
    this.slides.push({
      image: `//placekitten.com/${newWidth}/960`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
    this.eventsSchedule = [
        {
            "title": "All Day Event",
            "start": "2016-09-01"
        },
        {
            "title": "Long Event",
            "start": "2016-09-07",
            "end": "2016-09-10"
        },
        {
            "title": "Repeating Event",
            "start": "2016-09-09T16:00:00"
        },
        {
            "title": "Repeating Event",
            "start": "2016-09-16T16:00:00"
        },
        {
            "title": "Conference",
            "start": "2016-09-11",
            "end": "2016-09-13"
        }
    ];
    this.eventService.getEvents().then(events => {
      this.events = events;
    })
    this.articleService.getArticles().then(articles => {
      this.articles = articles;
    })

    // this.serviceService.getServiceCategories().then(categories => {
    //   this.serviceCategories = categories;
    // })

    // this.serviceService.getHottestServices().then(services => {
    //   this.hottestServices = services;
    // })

    this.groupService.getGroups().then(groups => {
      this.groups = groups;
    })
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  handleEventClick(e) {
      this.event = new MyEvent();
      this.event.title = e.calEvent.title;
      
      let start = e.calEvent.start;
      let end = e.calEvent.end;
      if(e.view.name === 'month') {
          start.stripTime();
      }
      
      if(end) {
          end.stripTime();
          this.event.end = end.format();
      }

      this.event.id = e.calEvent.id;
      this.event.start = start.format();
      this.event.allDay = e.calEvent.allDay;
      this.dialogVisible = true;
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
