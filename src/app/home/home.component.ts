import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { GroupModalContext, GroupModal } from '../components/modal/group-modal';

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

  events: any [];
  resources: any[];
  dialogVisible: boolean = false;
  event: MyEvent;
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, public modal: Modal) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
    this.events = [
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
