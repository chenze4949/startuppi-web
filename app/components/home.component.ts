import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  events: any [];
  resources: any[];
  dialogVisible: boolean = false;
  event: MyEvent;
  constructor(
    private router: Router
    ) {}
  
  getEvents() {
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

  ngOnInit() {
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

}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}
